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
