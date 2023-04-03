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

const handleScroll = (event) => {
  var node = event.target;
  const down = node.scrollHeight - node.scrollTop === node.clientHeight;
  if (down) {
  }
}

const paneDidMount = (node) => {
  if (node) {
      node.addEventListener("scroll", handleScroll);
  }
};

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
