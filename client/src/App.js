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
import AddPet from './components/AddPet';
import Navbar from './components/Navbar';
import ApplicationsReceived from './components/ApplicationsReceived';
import ApplicationsSent from './components/ApplicationsSent';
import AppRcvdDetails from './components/AppRcvdDetails';
import AppSentDetails from './components/AppSentDetails';


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
        .then((response) => {  
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("No user logged in")
            }
        })  
        .then((user) => {  
            console.log(user);
            setCurrentUser(user);  
        })  
        .catch((error) => {  
            console.log(error.message);  
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
                <Route path='/user/:id'
                  element={<PrivateRoute currentUser={currentUser}>
                    <UserProfile user={currentUser} setUpdatedUser={setCurrentUser} fetchUser={fetchCurrentUser}/>
                  </PrivateRoute>}
                />
                <Route path='/pets'
                  element={<PrivateRoute currentUser={currentUser}>
                    <AddPet user={currentUser}/>
                  </PrivateRoute>}
                />
                <Route path='/reviews' 
                  element={<PrivateRoute currentUser={currentUser}>
                    <ReviewForm user={currentUser}/>
                  </PrivateRoute>}
                />
                <Route path='/pet/:id'
                  element={<PrivateRoute currentUser={currentUser}>
                    <Pet />
                  </PrivateRoute>}
                />
                <Route path='/application'
                  element={<PrivateRoute currentUser={currentUser}>
                    <ApplicationForm currentUser={currentUser}/>
                  </PrivateRoute>}
                />
                <Route path='/pet-applications'
                  element={<PrivateRoute currentUser={currentUser}>
                    <ApplicationsReceived user={currentUser}/>
                  </PrivateRoute>}
                />
                <Route path='/sent-applications'
                  element={<PrivateRoute currentUser={currentUser}>
                    <ApplicationsSent currentUser={currentUser}/>
                  </PrivateRoute>}
                />
                <Route path='/pet-application/:id'
                  element={<PrivateRoute currentUser={currentUser}>
                    <AppRcvdDetails/>
                  </PrivateRoute>}
                />
                <Route path='/sent-application/:id'
                  element={<PrivateRoute currentUser={currentUser}>
                    <AppSentDetails/>
                  </PrivateRoute>}
                />
            </Routes>
        </Router>
    )
}

export default App;
