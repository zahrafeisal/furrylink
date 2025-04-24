from sqlalchemy.ext.hybrid import hybrid_property  
from datetime import datetime  

from config import db  


class User(db.Model):  # one to many with Pet  
    __tablename__ = 'users'  

    id = db.Column(db.Integer, primary_key=True)  
    first_name = db.Column(db.String, nullable=True)  # Nullable to accommodate shelters  
    last_name = db.Column(db.String, nullable=True)    # Nullable to accommodate shelters  
    email = db.Column(db.String, unique=True, nullable=False)  # one user, one email  
    telephone = db.Column(db.String, unique=True, nullable=False) # one user, one telephone
    animal_shelter = db.Column(db.Boolean, default=False)  # Determine if user is a shelter or just an individual  
    organization_name = db.Column(db.String, nullable=True)  # New field for animal shelters  
    _password_hash = db.Column(db.String, nullable=False)  

    pets_added = db.relationship('Pet') 
    applications = db.relationship('AdoptionApplication', back_populates='user')  

    @hybrid_property  
    def password_hash(self):  
        return self._password_hash  
    
    @password_hash.setter  
    def password_hash(self, password):  
        self._password_hash = self.simple_hash(password)  

    def __repr__(self):  
        return f"<User {self.first_name} {self.last_name} - {self.organization_name}>"  


class Pet(db.Model): 
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)
    image_filename = db.Column(db.String)    # allow users to upload pet photo
    adopted = db.Column(db.Boolean, default=False)

    # foreign keys for user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) 

    user = db.relationship('User', back_populates='pets')
    applications = db.relationship('AdoptionApplication', back_populates='pet') 


class Review(db.Model):    # one to many rlship w user
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.now)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))    # foreign key for user


class AdoptionApplication(db.Model):
    __tablename__ = 'adoption_applications'

    id = db.Column(db.Integer, primary_key=True)  
    status = db.Column(db.String, default='Pending')  # Status of the application (e.g., Pending, Approved, Rejected)  
    created_at = db.Column(db.DateTime, default=datetime.now)  # Timestamp of when the application was created  
    
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)  # Reference to the pet being applied for  
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Reference to the user applying  

    # Relationships  
    pet = db.relationship('Pet', back_populates='applications')  
    user = db.relationship('User', back_populates='applications')  