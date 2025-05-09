# Furrylink - A Pet Adoption Platform

## Overview
This platform aims to provide a streamlined alternative to the traditional in-person adoption process, allowing users to apply for adoption of their dream pet and receive prompt feedback. Animal shelters and rescues as well as ordinary users have an opportunity to expose pets to their compatible owners conveniently.

## Table of Contents
1. [Deployment](#🔗-deployment)
2. [Key Features](#🗝️-key-features)
3. [Folder Structure](#📂-folder-structure)
4. [Technologies Used](#⚙️-technologies-used)
5. [Installation & Setup](#🛠️-installation--setup)


## 🔗 Deployment
This application is live at [Furrylink](https://furrylink-frontend.vercel.app/).

### Frontend
The frontend is deployed using Vercel.<br />
[Frontend GitHub Repository](https://github.com/zahrafeisal/furrylink-frontend)

### Backend
The backend is deployed using Render and PostgreSQL.<br />
[Backend GitHub Repository](https://github.com/zahrafeisal/furrylink-backend)


## 🗝️ Key Features
<ul>
<li><strong>User Authentication - </strong>ensures secure log in and sign up as well as password protection through hashing using the Flask-Bcrypt library.</li>
<li><strong>Session-based User Management - </strong>the unique user id is stored in the session cookies to keep users logged into the application until they choose to log out. Prevents unauthorized users from accessing certain routes unless logged in.</li>
<li><strong>Tailored User Profile - </strong>each user accesses their personal profile with details provided when signing up. Users can edit this information.</li>
<li><strong>Exploring Posts by Other Users - </strong>the home page provides all the pets available for adoption and allows users to view the relevant information such as the breed, type, age, price, and the current custodian. Interested users can then apply for adoption. </li>
<li><strong>Adding Pets to the Platform</strong> - all users are at liberty to post pets they wish to give up for adoption on the platform. Other users can then see this pets and apply for adoption. </li>
<li><strong>Role-based Adoption Application Features - </strong>users can either be animal shelters or ordinary users.<br />

1. Ordinary users can apply to adopt pets, and therefore can access sent applications from the inbox page.
2. Animal shelters cannot apply for adoption of any pets and therefore do not have a 'Sent Applications' page. They can only access received applications
</li>
<li><strong>User Feedback - </strong>the platform enables users to leave a review of their experience which can be viewed by other users.</li>
</ul>


## 📂 Folder Structure
From the root directory
```code
.
├── Pipfile
├── Pipfile.lock
├── Procfile.dev
├── README.md
├── client
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components
│       │   ├── About.js
│       │   ├── AddPet.js
│       │   ├── AppRcvdDetails.js
│       │   ├── AppSentDetails.js
│       │   ├── ApplicationForm.js
│       │   ├── ApplicationsReceived.js
│       │   ├── ApplicationsSent.js
│       │   ├── Home.js
│       │   ├── LandingNavbar.js
│       │   ├── LandingPage.js
│       │   ├── Login.js
│       │   ├── LoginForm.js
│       │   ├── Navbar.js
│       │   ├── ReviewForm.js
│       │   ├── Reviews.js
│       │   ├── SignUp.js
│       │   ├── Unauthorized.js
│       │   └── UserProfile.js
│       ├── index.css
│       ├── index.js
│       ├── reportWebVitals.js
│       └── setupTests.js
└── server
    ├── app.py
    ├── config.py
    ├── migrations/
    ├── models.py
    ├── requirements.txt
    ├── seed.py
    └── uploads/
```

## ⚙️ Technologies Used

### Frontend
React.js
CSS

### Backend
Flask
PostgreSQL
SQLAlchemy


## 🛠️ Installation & Setup
For local installation and setup:

### Prerequisites

### Frontend
<ul>
<li>Node.js 16 or higher</li>
<li>npm or yarn</li>
</ul>

### Backend
<ul>
<li>Python 3.8</li>
<li>PostgresSQL</li>
</ul>

### Installation
Clone the repository
```code
$ git clone git@github.com:zahrafeisal/furrylink.git
```

### Frontend Setup
Navigate to the client directory
```code
$ cd client
```
Run this command to install dependencies
```code
$ npm install
```
Create a <strong>.env</strong> file in the client directory to set up environment variables. Copy and paste the following:
```code
REACT_APP_API_URL='https://furrylink-backend.onrender.com'
```
This connects the client to the deployed API on Render for fetch requests.<br />
<br />
Run the application on the browser using the command:
```code
$ npm start
```

### Backend Setup
Create a PostgreSQL account with Render.<br />

Navigate to the server directory
```code
$ cd server
```
Run to install dependencies
```code
$ pipenv install
```
Activate your virtual environment
```code
$ pipenv shell
```
Create a <strong>.env</strong> file in the server directory to set up environment variables. Copy and paste the following:
```code
SECRET_KEY="a0c95b0e194847ea836d07d76304a2bb9c004f1eedfa007f"
DATABASE_URI="postgresql://<USERNAME>:<PASSWORD>@dpg-d0e9mu95pdvs73atde7g-a.oregon-postgres.render.com/furrylink_db"
```
The secret key is used for session management. The database URI connects to the remote PostgreSQL database.<br />
Replace USERNAME and PASSWORD with your actualvariables obtained from Render.

In your terminal, run:
```code
$ flask db init
$ flask db migrate
$ flask db upgrade
```
to set up the database schema with the tables defined in <strong>models.py</strong>.

To seed the database, run:
```code
python seed.py
```
Ensure you are in the server directory and run the following to configure your flask environment:
```code
$ export FLASK_APP=app.py
$ export FLASK_RUN_PORT=5555
```
Then run the following command to start your server:
```code
$ flask run
```