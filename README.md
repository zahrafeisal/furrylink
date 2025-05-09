# Furrylink - A Pet Adoption Platform

## Overview
This platform aims to provide a streamlined alternative to the traditional in-person adoption process, allowing users to apply for adoption of their dream pet and receive prompt feedback. Animal shelters and rescues as well as ordinary users have an opportunity to expose pets to their compatible owners conveniently.

## Table of Contents
1. [Deployment](#deployment)
2. [Key Features](#key-features)
3. [Folder Structure](#folder-structure)
4. [Technologies Used](#technologies-used)
5. [Installation & Setup](#installation--setup)
6. 
7. 


## Deployment
This application is live at [Furrylink](https://furrylink-frontend.vercel.app/).

### Frontend
The frontend is deployed using Vercel.<br />
[Frontend GitHub Repository](https://github.com/zahrafeisal/furrylink-frontend)

### Backend
The backend is deployed using Render and PostgreSQL.<br />
[Backend GitHub Repository](https://github.com/zahrafeisal/furrylink-backend)


## Key Features
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
<li><strong></strong></li>
<li><strong></strong></li>
</ul>


## Folder Structure
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

## Technologies Used

### Frontend
React.js
CSS

### Backend
Flask


## Installation & Setup

### Requirements

### Frontend

### Backend