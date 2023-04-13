import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Projects from './components/Projects';
import XP from './components/XP';


function App() {
  return (
    <div className="navbar-margin">
    <div class="background">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

     <Home/>
     <About/>
     <XP/>
     <Projects/>
     <Contact/>
    </div>
  );
}

export default App;
