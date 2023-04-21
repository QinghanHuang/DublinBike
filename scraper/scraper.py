#!/usr/bin/env python3
import config
from datetime import datetime
import requests
import json
import time
import sqlalchemy as sqla
from sqlalchemy import create_engine
import traceback

# Creates a connection with database
engine = create_engine(config.DB_URL, echo=True)

# Creates an interface for running the sql query and update database
connection = engine.connect()

# Writes JSON file to string
# ec2 path /home/ubuntu/dbbikes/
def write_to_file(text):
    with open("data/stations_{}.json".format(datetime.now().strftime("%d-%m-%Y_%H_%M_%S")), "w") as file:
        file.write(text)

# Loads static data to database
def update_station_db(text):
    stations = json.loads(text)
    for station in stations:
        # Omitting test terminal
        if station['number'] == 507:
            continue
        vals = (
            station.get('number'),
            station.get('address'),
            int(station.get('banking')),
            station.get('bike_stands'),
            station.get('name'),
            station.get('position').get('lat'),
            station.get('position').get('lng')
        )

        # Executes our query
        connection.execute(sqla.text(
            f"""
        INSERT INTO Station (number, address, banking, bike_stands, name, position_lat, position_lng) 
        VALUES ({vals[0]}, "{vals[1]}", {vals[2]}, {vals[3]}, "{vals[4]}", {vals[5]}, {vals[6]})
        """
        )
        )
    # Commits the query results to database
    connection.commit()

# Load dynamic data to database
def update_availability_db(text):
    scraping_date = time.time()
    availibility = json.loads(text)
    for station in availibility:
        # Omitting test terminal
        if station['number'] == 507:
            continue
        vals = (
            station.get('number'),
            station.get('last_update'),
            station.get('available_bikes'),
            station.get('available_bike_stands'),
            station.get('status'),
        )
        connection.execute(sqla.text(
            f"""
        insert into Availability (number, last_update, available_bikes, available_bike_stands, status, scraping_date) 
        values({vals[0]}, {vals[1]}, {vals[2]}, {vals[3]}, "{vals[4]}", {scraping_date})
        """
        )
        )
    connection.commit()

def main():
    try:
        # Gets JSON string from API call
        response = requests.get(config.STATIONS_URI, params={"apiKey": config.JCKEY, "contract": config.NAME})
        print(response, datetime.now().strftime("%d-%m-%Y_%H:%M:%S"))
        write_to_file(response.text)
        # To prevent static table from being overwritten every 5 minutes
        result = connection.execute(sqla.text("SELECT COUNT(*) FROM Station")).fetchone()[0]
        if result == 0:
            update_station_db(response.text)
        update_availability_db(response.text)
    except:
        print(traceback.format_exc())

main()
