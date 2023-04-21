#!/usr/bin/env python3

from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
import sqlalchemy as sqla
from exts import db
from models import Station
from flask_cors import CORS
import pickle
from flask import request
from scraper import config
import requests
import datetime
import numpy as np
from scraper.config import JCKEY

# de-serialize model.pkl file

with open('./modeling/model.pkl', 'rb') as handle:
    stations_model = pickle.load(handle)

app = Flask(__name__)
CORS(app)
# Load config
app.config.from_pyfile('./scraper/config.py')

# Combine app and database
db.init_app(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/plan')
def plan():
    return render_template("plan.html")

@app.route('/about')
def about():
    return render_template("about.html")

# to query Stations table in database and pass to frontend
@app.route('/stations')
def get_stations():
    stations = Station.query.all()
    station_dict = [station.__dict__ for station in stations]
    for station in station_dict:
        del station['_sa_instance_state']
    return jsonify(station_dict)

@app.route('/get_api_JC')
def get_api_JC():
    return jsonify({'jc_api' : JCKEY})

# to get hourly availability charts (bikes & stands)
@app.route('/hourlyAvailability/<station_number>')
def get_hourly_availability(station_number):

    # Get current date and time
    now = datetime.datetime.now()

    # Get current day as a string (e.g. "Monday")
    day = now.strftime("%A")
    days = ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')
    index = days.index(day)+1

    engine = create_engine(config.DB_URL, echo=True)
    connection = engine.connect()
    result = connection.execute(sqla.text(
        f"""
        SELECT 
            number as "Station ID", 
            DAYOFWEEK(from_unixtime(last_update / 1000)) as Day, 
            HOUR(from_unixtime(last_update / 1000)) as Hour,
            avg(available_bikes) as "Average Available Bikes",
            avg(available_bike_stands) as "Average Available Stands"
        FROM Availability
        WHERE 
            number = {station_number}
            AND
            DAYOFWEEK(from_unixtime(last_update / 1000)) = {index}
        GROUP BY 
            number,
            day,
            hour
        ORDER BY
            number,
            day,
            hour
        """
        )
    ).fetchall()
    result_dict = [dict(row) for row in result]
    return jsonify(result_dict)

# to get daily availability charts (bikes & stands)
@app.route('/dailyAvailability/<station_number>')
def get_daily_availability(station_number):
    engine = create_engine(config.DB_URL, echo=True)
    connection = engine.connect()
    result = connection.execute(sqla.text(
        f"""
        SELECT 
            number as "Station ID", 
            DAYOFWEEK(from_unixtime(last_update / 1000)) as Day, 
            avg(available_bikes) as "Average Available Bikes",
            avg(available_bike_stands) as "Average Available Stands"
        FROM Availability
        WHERE 
            number = {station_number}
        GROUP BY 
            number,
            day
        ORDER BY
            number,
            day
        """
        )
    ).fetchall()
    result_dict = [dict(row) for row in result]
    return jsonify(result_dict)

# to deploy machine-learning model into app
@app.route('/predict')
def predict():

    # weather code dictionary
    weather_dict = {
        'Rain': 5,
        'Clouds': 1,
        'Clear': 0,
        'Snow': 6,
        'Drizzle': 2,
        'Mist': 4,
        'Fog': 3
    }

    # get parameters from URL
    stations_id = request.args.get('stations_id').split(',')
    stations_id = [int(station_id) for station_id in stations_id]
    dest_station_id = int(request.args.get('dest_station_id'))
    timestamp = request.args.get('timestamp')

    # get json data from API
    weather_data_response = requests.get(config.WEA_HOURLY_URI)
    weather_data_json = weather_data_response.json()
    
    # find weather conditions from API response
    closest_time = [] 
    for i in range(len(weather_data_json['list'])):
        closest_time.append(abs(weather_data_json['list'][i]['dt'] - int(timestamp)))
    closest_timestamp_index = closest_time.index(min(closest_time))

    # get input features
    hour = datetime.datetime.fromtimestamp(int(timestamp)).hour
    weekday = datetime.datetime.fromtimestamp(int(timestamp)).weekday()
    temperature = weather_data_json['list'][closest_timestamp_index]['main']['temp']
    wind_speed = weather_data_json['list'][closest_timestamp_index]['wind']['speed']
    weather_info = weather_data_json['list'][closest_timestamp_index]['weather'][0]['main']
    weather_code = weather_dict[weather_info]


    prediction_dict = {}
    # get bike stands from database
    for station_id in stations_id: 
        station_model = stations_model[station_id]
        station = Station.query.get(station_id)
        X_test_src = [hour, weekday, wind_speed, temperature, weather_code, station.bike_stands]
        X_test_src = np.array(X_test_src).reshape(1, -1)
        if station_model.predict(X_test_src) > 5:
            prediction_dict.update({'station_id': station_id})
            prediction_dict.update({'availability_bike': station_model.predict(X_test_src).tolist()})
            break

    # prediction for destination bike stands (total stands - predicted bikes)
    station = Station.query.get(dest_station_id)
    X_test_dest = [hour, weekday, wind_speed, temperature, weather_code, station.bike_stands]
    X_test_dest = np.array(X_test_dest).reshape(1, -1)
    prediction_dict.update({'dest_station_id': dest_station_id})
    prediction_dict.update({'dest_availability_bikes': stations_model[dest_station_id].predict(X_test_dest).tolist()})
        
    return jsonify(prediction_dict)

if __name__ == '__main__':
    app.run(debug=True, port=5006)