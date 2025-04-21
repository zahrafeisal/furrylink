from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime

from config import db


class User(db.Model):    # one to many w pet
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)      # concatenate first & last name from sign up form
    email = db.Column(db.String, unique=True)     # one user, one email
    # _password_hash = db.Column(db.String, nullable=False)


class Pet(db.Model): 
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)
    image_filename = db.Column(db.String)    # allow users to upload pet photo
    # foreign keys for user and shelter
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) 
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelters.id'))  


class Shelter(db.Model):    # one to many with pet
    __tablename__ = 'shelters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    telephone = db.Column(db.String, unique=True)


class Review(db.Model):    # one to many rlship w user
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.now)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))    # foreign key for user
   