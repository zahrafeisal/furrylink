#!/usr/bin/env python3

from flask import request, make_response, jsonify, session
from flask_restful import Resource
from models import User, Pet, Review
from config import app, db, api


class Login(Resource):
    def post(self):
        user = User.query.filter(
            User.email == request.get_json()['email']
        ).first()
        session['user_id'] = user.id
        return user.to_dict()
    # remember sessions & cookies management


class CheckSession(Resource):
    # checks if user is logged in on page refresh
    def get(self):
        user = User.query.filter(
            User.id == session.get('user_id')
        ).first()
        if user:
            return user.to_dict()
        else:
            return {
                'message': '401: Not Authorized'
            }, 401


class Logout(Resource):
    # delete cookie
    def delete(self):
        session['user_id'] = None      # reset user id to none
        
        response_body = {'message': '204: No Content'}
        response = make_response(
            response_body,
            204
        )
        return response


class Users(Resource):
    def post(self):
        # allow users to sign up
        email = request.form.get('email')
        existing_user = User.query.filter(User.email == email).first()
        if existing_user:
            # make them log in, raise an error
            pass
        else:
            new_user = User(
                first_name=request.form.get('firstName'),
                last_name=request.form.get('lastName'),
                email=email,
                telephone=request.form.get('telephone'),
                animal_shelter=request.form.get('animalShelter'),
                organization_name=request.form.get('organizationName'),
                _password_hash=request.form.get('password')
            )
            
            db.session.add(new_user)
            db.session.commit()
            
            new_user_id = new_user.id
            session['user_id'] = new_user_id    # log the user in automatically

            response = make_response(
                new_user.to_dict(),
                201
            )
            return response


class UserByID(Resource):
    def get(self):
        # allow users to view their profile
        user_id = session.get('user_id')
        user = User.query.filter(
            User.id == user_id
        ).first()

        user_dict = user.to_dict()
        response = make_response(
            user_dict,
            200
        )
        return response

    def put(self):
        # edit email and/or name
        pass


class Pets(Resource):
    def get(self):
        # view all pets
        pets = []
        for pet in Pet.query.all():
            pet_dict = pet.to_dict()
            pets.append(pet_dict)

        response = make_response(
            pets,
            200
        )
        return response

    def post(self):
        # add a pet for adoption
        new_pet = Pet(
            type=request.form.get(),
            breed=request.form.get(),
            age=request.form.get(),
            image_filename=request.form.get(),
            adopted=request.form.get(),
            user_id=session.get('user_id')
        )
        
        db.session.add(new_pet)
        db.session.commit()

        response = make_response(
            new_pet.to_dict(),
            201
        )
        return response


class PetByID(Resource):
    def get(self, id):
        # allow users to view preferred pet
        pass


class Reviews(Resource):
    def get(self):
        # allow users to view all reviews
        reviews = []

        for review in Review.query.all():
            review_dict = review.to_dict()
            reviews.append(review_dict)
        
        response = make_response(
            reviews,
            200
        )
        return response

    def post(self):
        # allow users to post a review
        new_review = Review(
            comment=''
        )

        db.session.add(new_review)
        db.session.commit()

        response = make_response(
            new_review.to_dict(),
            201
        )
        return response


api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/user_profile')
api.add_resource(Pets, '/pets')
api.add_resource(PetByID, '/pet/<int:id>')
api.add_resource(Reviews, '/reviews')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
