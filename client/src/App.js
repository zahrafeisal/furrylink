import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SignupForm from './components/SignUp';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import ReviewForm from './components/ReviewForm';
import ApplicationForm from './components/ApplicationForm';
import AddPet from './components/AddPet';
import ApplicationsReceived from './components/ApplicationsReceived';
import ApplicationsSent from './components/ApplicationsSent';
import AppRcvdDetails from './components/AppRcvdDetails';
import AppSentDetails from './components/AppSentDetails';
import Unauthorized from './components/Unauthorized';
import Login from './components/Login';
import About from './components/About';

// Protected route component, prevent unauthorized users from accessing
function PrivateRoute({ children, currentUser, isCheckingAuth }) {
    if (isCheckingAuth) {
        return <div style={{marginTop: '500px'}}><i className="fa-solid fa-spinner"></i></div>; // Or a spinner
    }
    return currentUser ? children : <Navigate to="/unauthorized" />;
}

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [pets, setPets] = useState([]);

    // Function to fetch the latest user data
    const fetchCurrentUser = () => {
        setIsCheckingAuth(true);
        fetch("/check_session")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("No user logged in");
            }
        })
        .then((user) => {
            setCurrentUser(user);
            setIsCheckingAuth(false);
        })
        .catch((error) => {
            console.log(error.message);
        });
    };

    // Call fetchCurrentUser on initial render
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    // Fetch pets data on initial load
    useEffect(() => {
        fetch("/pets")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to fetch pets");
        })
        .then((pets) => {
            setPets(pets);
        })
        .catch((error) => {
            alert(error.message);
        });
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path='/' element={<LandingPage onLogin={setCurrentUser} />} />
                <Route path='/about' element={<About />} />
                <Route path='/users' element={<SignupForm onSignUp={setCurrentUser} />} />
                <Route path='/login' element={<Login onLogin={setCurrentUser} />} />
                <Route path='/unauthorized' element={<Unauthorized />} />

                {/* Protected routes */}
                <Route
                    path='/home'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <Home pets={pets} user={currentUser} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/user/:id'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <UserProfile user={currentUser} setUpdatedUser={setCurrentUser} fetchUser={fetchCurrentUser} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/pets'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <AddPet user={currentUser} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/reviews'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <ReviewForm user={currentUser} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/application'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <ApplicationForm currentUser={currentUser} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/pet-applications'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <ApplicationsReceived user={currentUser} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/sent-applications'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <ApplicationsSent currentUser={currentUser} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/pet-application/:id'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <AppRcvdDetails />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/sent-application/:id'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <AppSentDetails />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;