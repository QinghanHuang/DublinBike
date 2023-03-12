# JCDECAUX KEY
JCKEY = "4120cea72fb53ef56210be3d7231a47de7d29aef"
NAME = "dublin"
STATIONS_URI = "https://api.jcdecaux.com/vls/v1/stations"

#WEATHER KEY
WEAKEY = "d7919dca0d3076d87855ecce2bd11059"
CITY = "dublin"
WEA_LON_URI = "https://api.openweathermap.org/data/2.5/weather?lat=53.350000&lon=-6.260000&appid=d7919dca0d3076d87855ecce2bd11059&units=metric"


# DATABASE KEY
DB_HOST = 'dublinbikes.ctcql708v4he.us-east-1.rds.amazonaws.com'
DB_PORT = '3306'
DB_NAME = 'dublinbikes'
DB_USER = 'admin'
DB_PASSWORD = 'dublinbikes23kmq'
DB_URL = "mysql://{}:{}@{}:{}/{}".format(DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME)

