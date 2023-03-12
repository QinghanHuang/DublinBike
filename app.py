from flask import Flask, render_template, url_for
import config
from models import Availability, Station, Weather
from exts import db

app = Flask(__name__)

# Load config
app.config.from_object(config)

# combine app and database
db.init_app(app)


# create tables if there is table will ignore just need to run once
# with app.app_context():
#     db.create_all()


@app.route('/')
def home():
    return 'This is home page!'


# test connection of db
@app.route('/stationinfo/<station_number>')
def test(station_number):
    # creat a station instance by pk==1
    station = Station.query.get(station_number)
    # return html and  put station instance to html
    return render_template("test_db.html", station=station)


@app.route('/map')
def map():
    return render_template("map.html")


@app.route('/station')
def station():
    return 'Station'


if __name__ == '__main__':
    app.run(debug=True)
