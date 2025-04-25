import './App.css';
import Home from './components/Home';
import LoginForm from './components/Login';
import SignupForm from './components/SignUp';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import Pet from './components/Pet';
import ReviewForm from './components/Review';
import AdoptionApplication from './components/AdoptionApplication';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetch("/check_session")
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((user) => {
            setCurrentUser(user)
        })
    }, [])

    return (
        <Router>
            <Routes>
                <Route path='/' element={currentUser ? <Home /> : <LandingPage />} />
                <Route path='/login' element={<LoginForm onLogin={setCurrentUser} />} />
                <Route path='/users' element={<SignupForm onSignUp={setCurrentUser}/>} />
                <Route path='/user/:id' element={<UserProfile />} />
                <Route path='/pet/:id' element={<Pet />} />
                <Route path='/reviews' element={<ReviewForm />} />
                <Route path='/application' element={<AdoptionApplication />} />
            </Routes>
        </Router>
    )
}

export default App;
