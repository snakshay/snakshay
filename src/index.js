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
import ResumeDownload from './components/ResumeDownload';
import { ColourModeProvider } from './theme/ColourModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColourModeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <App />
              </>
            }
          />
          <Route path="/resume" element={<ResumeDownload standalone />} />
        </Routes>
      </Router>
    </ColourModeProvider>
  </React.StrictMode>
);
