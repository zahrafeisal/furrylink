import './App.css';
import Home from './components/Home';
import LoginForm from './components/Login';
import SignupForm from './components/SignUp';
import LandingPage from './components/LandingPage';
import { useEffect, useState } from 'react';

function App() {
  // check if user is logged in when page loads
  const [user, setUser] = useState(null);   

  useEffect(() => {
    fetch('/check_session')
    .then((response) => {
      if (response.ok) {
        response.json();
      }
    })
    .then((user) => {
      setUser(user);
    })
  }, []);

  if (user) {
    return <Home />
  } else {
    return <LoginForm onLogin={setUser} />
  }
}

export default App;
