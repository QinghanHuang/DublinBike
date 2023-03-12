# Database Info
HOSTNAME="dublinbikes.ctcql708v4he.us-east-1.rds.amazonaws.com"
PORT="3306"
DATABASE="dublinbikes"
USERNAME="admin"
PASSWORD="dublinbikes23kmq"
DB_URI="mysql://{}:{}@{}:{}/{}".format(USERNAME,PASSWORD,HOSTNAME,PORT,DATABASE)

#This is must!
SQLALCHEMY_DATABASE_URI=DB_URI