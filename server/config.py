from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from sqlalchemy import MetaData

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'   # configure a database connection to the local file app.db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False    # disable modification tracking to use less memory
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
db.init_app(app)     # initialize the Flask application to use the database

migrate = Migrate(app, db)

api = Api(app)
