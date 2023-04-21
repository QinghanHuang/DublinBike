#!/usr/bin/env python3
import config
from datetime import datetime
import requests
import json
import time
from sqlalchemy import Column,String,Integer,Float,create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import traceback

# Create a connection with database with the URL
engine = create_engine(config.DB_URL, echo=True)
#to get a base class
Base=declarative_base()

#all table class extends base
class Weather(Base):
    __tablename__="weather"
    time_scrape =Column(Integer(),primary_key=True)
    time_api_update =Column(Integer())
    weather_id=Column(Integer)
    weather_info=Column(String(50))
    wind_speed=Column(Float)
    temperature=Column(Float)

Base.metadata.create_all(engine)
DBSeesion=sessionmaker(bind=engine)
session=DBSeesion()

#ec2 path /home/ubuntu/dbbikes/
def write_to_file(text):
    with open("wea_data/weather_{}.json".format(datetime.now().strftime("%d-%m-%Y__%H_%M_%S")), "w") as file:
        file.write(text)

def update_weather_db(text):

    weather= json.loads(text)
    time_scrape_json=time.time()
    time_api_update_json=weather.get('dt')
    weather_id_json=weather.get('weather')[0].get('id')
    weather_info_json=weather.get('weather')[0].get('main')
    wind_speed_json=weather.get('wind').get('speed')
    temperature_json=weather.get('main').get('temp')
    item=Weather(time_scrape=time_scrape_json,time_api_update=time_api_update_json,weather_id=weather_id_json,weather_info=weather_info_json,wind_speed=wind_speed_json,temperature=temperature_json)
    session.add(item)
    session.commit()

def main():
    try: 
        # Get JSON string from API call
        response = requests.get(config.WEA_LON_URI)
        print(response, datetime.now().strftime("%d-%m-%Y_%H:%M:%S"))
        # Write JSON string to File
        write_to_file(response.text)
        # Write JSON string to Amazon RDS
        update_weather_db(response.text)
    except:
        print(traceback.format_exc())

main()
