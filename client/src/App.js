import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserContext, UserProvider } from './components/UserContext';
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
    const API_BASE = process.env.REACT_APP_API_URL;

    const [currentUser, setCurrentUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [pets, setPets] = useState([]);

    // Function to fetch the latest user data
    const fetchCurrentUser = () => {
        setIsCheckingAuth(true);
        fetch(`${API_BASE}/check_session`, {
            credentials: 'include',
        })
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
            setIsCheckingAuth(false);
        });
    };

    // Call fetchCurrentUser on initial render
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchPets = () => {
        fetch(`${API_BASE}/pets`, {
            credentials: 'include',
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((pets) => {
            setPets(pets);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    // Fetch pets data on initial load
    useEffect(() => {
        fetchPets();
    }, []);

    const contextValue = {
        currentUser,
        setCurrentUser,
        isCheckingAuth,
        setIsCheckingAuth,
        pets,
        setPets
    }

    return (
        <UserProvider value={contextValue}>
            <Router>
            <Routes>
                {/* Public routes */}
                <Route path='/' element={<LandingPage />} />
                <Route path='/about' element={<About />} />
                <Route path='/users' element={<SignupForm />} />
                <Route path='/login' element={<Login />} />
                <Route path='/unauthorized' element={<Unauthorized />} />

                {/* Protected routes */}
                <Route
                    path='/home'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/user/:id'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <UserProfile fetchUser={fetchCurrentUser} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/pets'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <AddPet fetchPets={fetchPets} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/reviews'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <ReviewForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/application'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <ApplicationForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/pet-applications'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <ApplicationsReceived />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/sent-applications'
                    element={
                        <PrivateRoute currentUser={currentUser} isCheckingAuth={isCheckingAuth}>
                            <ApplicationsSent />
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
        </UserProvider>
    );
}

export default App;