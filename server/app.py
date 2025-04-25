#!/usr/bin/env python3

from flask import request, make_response, jsonify, session
from flask_restful import Resource
from models import User, Pet, Review, AdoptionApplication
from config import app, db, api


class Login(Resource):
    def post(self):  
        user_data = request.get_json()  
        email = user_data['email'] 
        password = user_data['password']

        # Query the user by email  
        user = User.query.filter(User.email == email).first()  
        
        if user:  
            # Check if the password matches 
            if user.authenticate(password):  
                session['user_id'] = user.id  
                response = make_response(  
                    user.to_dict(),  
                    200  
                )  
                return response  
            else:  
                # Password is incorrect  
                response_body = {'message': 'Incorrect password.'}  
                response = make_response(  
                    response_body,  
                    401
                )  
                return response  
        else:  
            # User does not exist  
            response_body = {'message': 'User does not exist.'}  
            response = make_response(  
                response_body,  
                404   
            )  
            return response  


class CheckSession(Resource):
    # checks if user is logged in on refresh
    def get(self):
        user = User.query.filter(
            User.id == session.get('user_id')
        ).first()
        if user:
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        else:
            response_body = {
                'message': 'Unauthorized'
            }
            response = make_response(
                response_body,
                401
            )
            return response


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
        user_data = request.get_json()
        email = user_data['email']
        existing_user = User.query.filter(User.email == email).first()   # checks if user already exists

        if existing_user:
            response_body = {
                'message': 'User already exists.'
            }
            response = make_response(
                response_body,
                400
            )
            return response
        else:
            new_user = User(
                first_name=user_data['firstName'],
                last_name=user_data['lastName'],
                email=email,
                telephone=user_data['telephone'],
                animal_shelter=user_data['animalShelter'],
                organization_name=user_data['organizationName'],
            )

            new_user.password_hash = user_data['password']  # set pass
            
            db.session.add(new_user)
            db.session.commit()
            
            session['user_id'] = new_user.id   # log the user in automatically

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

        response = make_response(
            user.to_dict(),
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
            price=request.form.get(),
            image_filename=request.form.get(),
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
    

class Adopt(Resource):
    def get(self):
        applications = []
        
        user_id = session.get('user_id')

    def post(self):
        new_application = AdoptionApplication()
        pass



api.add_resource(Login, '/login')   # done
api.add_resource(CheckSession, '/check_session')   # done
api.add_resource(Logout, '/logout')   # done
api.add_resource(Users, '/users')   # done
api.add_resource(UserByID, '/user_profile')
api.add_resource(Pets, '/pets')
api.add_resource(PetByID, '/pet/<int:id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(Adopt, '/application')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
