import FadeIn from './animation/FadeIn';
import About from './components/About';
import Agents from './components/Agents';
import Contact from './components/Contact';
import Home from './components/Home';
import Personal from './components/Personal';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import XP from './components/XP';

// The eight sections in design order, and nothing else. `CssBaseline` paints
// the page background from the active palette, so the old `.background` div and
// its fixed gradient are gone.
//
// The section `id` lives on the `FadeIn` wrapper, in one place, and each value
// matches the `NAV_ITEMS` entry that scrolls to it. The section components carry
// no id of their own, so no id appears twice. Hero has no `NAV_ITEMS` entry, so
// it takes no id.
function App() {
  return (
    <div className="navbar-margin">
      {/* The hero is above the fold, so it renders in its final state on the
          first paint. Nothing about the first thing a visitor reads waits on
          an observer. Every section below it reveals on entry. */}
      <FadeIn immediate>
        <Home />
      </FadeIn>

      <FadeIn id="About">
        <About />
      </FadeIn>

      <FadeIn id="Experience">
        <XP />
      </FadeIn>

      <FadeIn id="Projects">
        <Projects />
      </FadeIn>

      <FadeIn id="Agents">
        <Agents />
      </FadeIn>

      <FadeIn id="Testimonials">
        <Testimonials />
      </FadeIn>

      <FadeIn id="Personal">
        <Personal />
      </FadeIn>

      <FadeIn id="Contact">
        <Contact />
      </FadeIn>
    </div>
  );
}

export default App;
