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
import ResumeDownload from './components/ResumeDowload';

ReactGA.initialize('UA-265988812-1');

if (!localStorage.getItem('user_id')) {
  localStorage.setItem('user_id', Math.random().toString(36).substring(7));
}
let userCity
const userId = localStorage.getItem('user_id');
let userLocation,userDevice;
navigator.geolocation.getCurrentPosition((position) =>{
  userLocation  = position.coords.latitude + ',' + position.coords.longitude;
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
    .then(response => response.json())
    .then(data => {
       userCity = data.results[0].address_components.filter(component => component.types.includes('locality'))[0].long_name;

      ReactGA.set({
        'dimension1': userCity,
      });
    });
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
  dimension3:userCity
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> 
    
    <Routes>
        <Route path="/" element={ 
            <>
              <NavBar/><App />
            </>
        } />
      <Route path="/resume" element={<ResumeDownload />} />
    </Routes>

    </Router>
  </React.StrictMode>
);
