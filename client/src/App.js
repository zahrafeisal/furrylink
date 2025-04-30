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


// Protected route component, prevent unauthorized users from accessing
function PrivateRoute({ children, currentUser }) {  
    return currentUser ? children : <Navigate to="/" />;  
}  


function App() {
    const [currentUser, setCurrentUser] = useState(null);  
    const [pets, setPets] = useState([]);  
    
    // Function to fetch the latest user data  
    const fetchCurrentUser = () => {  
        fetch("/check_session")  
        .then(res => {  
            if (res.ok) return res.json();  
            throw new Error('Failed to fetch user session');  
        })  
        .then(user => {  
            setCurrentUser(user);  
        })  
        .catch(err => {  
            console.log(err.message);  
        });  
    };  
    
    // Call fetchCurrentUser when needed, e.g., after user updates  
    useEffect(() => {  
        fetchCurrentUser();  
    }, []);  

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
            {currentUser && <Navbar user={currentUser} />}
            <Routes>

                {/* public routes */}
                <Route path='/' element={<LandingPage />}/>
                <Route path='/users' element={<SignupForm onSignUp={setCurrentUser}/>}/>
                <Route path='/login' element={<LoginForm onLogin={setCurrentUser}/>}/>
                <Route path='/home' element={<Home pets={pets}/>}/>
                
                {/* Protected routes */}
                <Route path='/user/:id' element={<UserProfile
                    user={currentUser}
                    setUpdatedUser={setCurrentUser}
                    fetchUser={fetchCurrentUser}
                    />}
                />
                <Route path='/pets' element={<AddPet user={currentUser}/>}/>
                <Route path='/reviews' element={<ReviewForm user={currentUser}/>}/>
                <Route path='/pet/:id' element={<Pet />}/>
                <Route path='/application' element={<ApplicationForm currentUser={currentUser}/>}/>
            </Routes>
        </Router>
    )
}

export default App;
