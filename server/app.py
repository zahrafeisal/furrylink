#!/usr/bin/env python3

from flask import request, make_response, jsonify, session
from flask_restful import Resource
from models import User, Pet, Shelter, Review
from config import app, db, api


class Login(Resource):
    def get(self):
        pass
    # remember sessions & cookies management


class Logout(Resource):
    def delete():
        pass


class Users(Resource):
    def post():
        pass
# allow users to sign up


class UserByID(Resource):
    def get(self, id):
        pass
    def put():    # edit email and/or name
        pass
# allow users to view their profile


class Pets(Resource):
    def get(self):
        pass
# view all pets


class PetByID(Resource):
    def get(self, id):
        pass
# allow users to view preferred pet


class Reviews(Resource):
    def get(self):
        pass
    def post():
        pass
# allow users to view all reviews
# allow users to post a review


api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/user/<int:id>')
api.add_resource(Pets, '/pets')
api.add_resource(PetByID, '/pet/<int:id>')
api.add_resource(Reviews, '/reviews')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
