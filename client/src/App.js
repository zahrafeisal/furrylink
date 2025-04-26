import './App.css';
import Home from './components/Home';
import LoginForm from './components/Login';
import SignupForm from './components/SignUp';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import Pet from './components/Pet';
import ReviewForm from './components/Review';
import AdoptionApplication from './components/AdoptionApplication';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [pets, setPets] = useState(null);

    useEffect(() => {     // check if user is logged in to determine whether Home or LandingPage is rendered
        fetch("/check_session")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((user) => {
            setCurrentUser(user);
        })
        .catch((error) => {
            console.log(error.message);
        })
    }, [])

    useEffect(() => {    // fetch pets on initial render in the case where the Home component is "/"
        fetch("/pets")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } 
        })
        .then((pets) => {
            setPets(pets)
        })
        .catch((error) => {
            alert(error.message)
        })
    }, []);


    return (
        <Router>
            {/* render navbar only when user is logged in */}
            {currentUser && <Navbar user={currentUser} />}
            <Routes>
                <Route path='/' element={currentUser ? <Home pets={pets} /> : <LandingPage />} /> {/* conditional for session */}
                <Route path='/home' element={<Home pets={pets} />} />   {/* explicit render for navbar */}
                <Route path='/login' element={<LoginForm onLogin={setCurrentUser} />} />
                <Route path='/users' element={<SignupForm onSignUp={setCurrentUser} />} />
                <Route path='/user/:id' element={<UserProfile user={currentUser} />} />
                <Route path='/pet/:id' element={<Pet />} />
                <Route path='/reviews' element={<ReviewForm />} />
                <Route path='/application' element={<AdoptionApplication />} />
                <Route path='/settings' element={<Settings user={currentUser}/>} />
            </Routes>
        </Router>
    )
}

export default App;
