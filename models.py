from exts import db

class Availability(db.Model):
    __tablename__ = 'Availability'

    number = db.Column(db.Integer, primary_key=True, nullable=False)
    last_update = db.Column(db.BigInteger, primary_key=True, nullable=False)
    available_bikes = db.Column(db.Integer)
    available_bike_stands = db.Column(db.Integer)
    status = db.Column(db.String(128))
    scraping_date = db.Column(db.Integer, primary_key=True, nullable=False)


class Station(db.Model):
    __tablename__ = 'Station'

    number = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(128))
    banking = db.Column(db.Integer)
    bike_stands = db.Column(db.Integer)
    name = db.Column(db.String(128))
    position_lat = db.Column(db.Float)
    position_lng = db.Column(db.Float)


class Weather(db.Model):
    __tablename__ = 'weather'

    time_scrape = db.Column(db.Integer, primary_key=True)
    time_api_update = db.Column(db.Integer)
    weather_id = db.Column(db.Integer)
    weather_info = db.Column(db.String(50))
    wind_speed = db.Column(db.Float)
    temperature = db.Column(db.Float)