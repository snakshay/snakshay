import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import NavBar from './components/Navbar';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-265988812-1');

if (!localStorage.getItem('user_id')) {
  localStorage.setItem('user_id', Math.random().toString(36).substring(7));
}

const userId = localStorage.getItem('user_id');
let userLocation,userDevice;
navigator.geolocation.getCurrentPosition((position) =>{
  userLocation  = position.coords.latitude + ',' + position.coords.longitude;
});

const userAgent = navigator.userAgent;

if (userAgent.match(/Android/i)) {
   userDevice = 'Android';
} else if (userAgent.match(/iPhone|iPad|iPod/i)) {
   userDevice = 'iOS';
} else if (userAgent.match(/Windows Phone/i)) {
   userDevice = 'Windows Phone';
} else if (userAgent.match(/Windows NT/i)) {
   userDevice = 'Windows PC';
} else if (userAgent.match(/Mac OS/i)) {
   userDevice = 'Mac OS';
} else if (userAgent.match(/Linux/i)) {
   userDevice = 'Linux';
} else {
   userDevice = 'Unknown';
}

ReactGA.set({
  userId: userId,
  dimension1: userLocation,
  dimension2: userDevice,
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> 
    <NavBar/>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>

    </Router>
  </React.StrictMode>
);
