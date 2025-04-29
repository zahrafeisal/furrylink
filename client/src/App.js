import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/Login';
import SignupForm from './components/SignUp';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import Pet from './components/Pet';
import ReviewForm from './components/ReviewForm';
import Reviews from './components/Reviews';
import ApplicationForm from './components/ApplicationForm';
import ApplicationDetails from './components/ApplicationDetails';
import AddPet from './components/AddPet';
import Navbar from './components/Navbar';


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [pets, setPets] = useState([]);

    useEffect(() => {     // check if user is logged in to determine whether Home or LandingPage is rendered
        fetch("/check_session")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to check session'); 
        })
        .then((user) => {
            setCurrentUser(user);
            console.log(user);
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

    if (!currentUser) {
        <Navigate to={"/"}/>
    }


    return (
        <Router>
            {currentUser && <Navbar user={currentUser} />}
            <Routes>
                <Route path='/' element={<LandingPage />}/>
                <Route path='/login' element={<LoginForm onLogin={setCurrentUser}/>}/>
                <Route path='/home' element={<Home pets={pets}/>}/>
                <Route path='/user/:id' element={<UserProfile user={currentUser} setUpdatedUser={setCurrentUser}/>}/>
                <Route path='/users' element={<SignupForm onSignUp={setCurrentUser}/>}/>
                <Route path='/pets' element={<AddPet user={currentUser}/>} />
                <Route path='/reviews' element={<ReviewForm user={currentUser}/>}/>
                <Route path='/pet/:id' element={<Pet />}/>
            </Routes>
        </Router>
    )
}

export default App;
