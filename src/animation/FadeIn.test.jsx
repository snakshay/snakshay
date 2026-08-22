import fs from 'fs';
import path from 'path';

import { render, screen, act } from '@testing-library/react';

import FadeIn, { STAGGER_STEP, STAGGER_TIERS, STAGGER_TOTAL } from './FadeIn';
import { motion } from '../theme/tokens';

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

let observers;
let originalIntersectionObserver;
let originalMatchMedia;

function installIntersectionObserver() {
  observers = [];

  class MockIntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.observed = [];
      this.unobserved = [];
      this.disconnected = false;
      observers.push(this);
    }

    observe(node) {
      this.observed.push(node);
    }

    unobserve(node) {
      this.unobserved.push(node);
    }

    disconnect() {
      this.disconnected = true;
    }

    // Test helper: report an intersection for a node the way the browser would.
    trigger(node, isIntersecting) {
      act(() => {
        this.callback([{ target: node, isIntersecting }], this);
      });
    }
  }

  global.IntersectionObserver = MockIntersectionObserver;
}

function setReducedMotion(matches) {
  window.matchMedia = (query) => ({
    matches: query === REDUCE_QUERY ? matches : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

beforeEach(() => {
  originalIntersectionObserver = global.IntersectionObserver;
  originalMatchMedia = window.matchMedia;
  installIntersectionObserver();
  setReducedMotion(false);
});

afterEach(() => {
  global.IntersectionObserver = originalIntersectionObserver;
  window.matchMedia = originalMatchMedia;
});

// The FadeIn wrapper is a plain div with no role and no accessible name by
// design, so the only route to it is up from the child. The one node access
// this needs lives here instead of being repeated in each test.
// eslint-disable-next-line testing-library/no-node-access
const fadeWrapper = () => screen.getByText('Section body').parentElement;

// A stand in for the shape every section renders: a content wrapper holding a
// heading and then the block under it. The stagger is keyed off this structure.
const Section = () => (
  <div className="home">
    <div className="content-wrapper">
      <h3 className="section-header">
        <span>Heading</span>
        <span className="section-header-rule" aria-hidden="true" />
      </h3>
      <p>Section body</p>
      <div>Cards</div>
    </div>
  </div>
);

describe('FadeIn', () => {
  it('starts hidden and reveals the children on the first intersection', () => {
    render(
      <FadeIn>
        <p>Section body</p>
      </FadeIn>
    );

    const wrapper = fadeWrapper();
    expect(wrapper).toHaveClass('fade-in');
    expect(wrapper).not.toHaveClass('visible');

    observers[0].trigger(wrapper, true);

    expect(wrapper).toHaveClass('visible');
  });

  it('unobserves the node after the first intersection so the transition plays once', () => {
    render(
      <FadeIn>
        <p>Section body</p>
      </FadeIn>
    );

    const wrapper = fadeWrapper();
    const observer = observers[0];

    observer.trigger(wrapper, true);
    expect(observer.unobserved).toEqual([wrapper]);

    // Leaving and re-entering cannot hide the section again.
    observer.trigger(wrapper, false);
    observer.trigger(wrapper, true);
    expect(wrapper).toHaveClass('visible');
  });

  it('publishes the timing the stylesheet reads, all of it from the tokens', () => {
    render(
      <FadeIn>
        <p>Section body</p>
      </FadeIn>
    );

    const wrapper = fadeWrapper();

    expect(wrapper.style.getPropertyValue('--motion-duration')).toBe(`${motion.duration}ms`);
    expect(wrapper.style.getPropertyValue('--motion-delay')).toBe(`${motion.delay}ms`);
    expect(wrapper.style.getPropertyValue('--motion-step')).toBe(`${STAGGER_STEP}ms`);
    expect(motion.duration + motion.delay).toBeLessThanOrEqual(motion.budget);
  });

  it('passes the threshold through to the observer', () => {
    render(
      <FadeIn threshold={0.75}>
        <p>Section body</p>
      </FadeIn>
    );

    expect(observers[0].options.threshold).toBe(0.75);
  });

  it('renders the final state with no observer while reduced motion is active', () => {
    setReducedMotion(true);

    render(
      <FadeIn>
        <p>Section body</p>
      </FadeIn>
    );

    const wrapper = fadeWrapper();
    expect(wrapper).not.toHaveClass('fade-in');
    expect(wrapper.style.opacity).toBe('');
    expect(wrapper.style.transform).toBe('');
    expect(wrapper.style.getPropertyValue('--motion-step')).toBe('');
    expect(observers).toHaveLength(0);
  });

  // The section ids are react-scroll targets, so a branch that drops the id
  // breaks the whole nav.
  it.each([
    ['animated', { reduceMotion: false, props: {} }],
    ['reduced motion', { reduceMotion: true, props: {} }],
    ['immediate', { reduceMotion: false, props: { immediate: true } }],
  ])('keeps the id on the wrapper in the %s branch', (_label, { reduceMotion, props }) => {
    setReducedMotion(reduceMotion);

    render(
      <FadeIn id="Contact" {...props}>
        <p>Section body</p>
      </FadeIn>
    );

    expect(fadeWrapper()).toHaveAttribute('id', 'Contact');
  });

  it('renders no id attribute when none is given', () => {
    render(
      <FadeIn>
        <p>Section body</p>
      </FadeIn>
    );

    expect(fadeWrapper()).not.toHaveAttribute('id');
  });

  it('reveals immediately with no observer when asked, so the hero never waits', () => {
    render(
      <FadeIn immediate>
        <Section />
      </FadeIn>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const wrapper = screen.getByText('Heading').closest('.home').parentElement;
    expect(wrapper).not.toHaveClass('fade-in');
    expect(observers).toHaveLength(0);
  });

  it('marks a nested wrapper as a leaf, so it reveals itself instead of staggering', () => {
    render(
      <FadeIn>
        <Section />
        <FadeIn>
          <p>Card</p>
        </FadeIn>
      </FadeIn>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const outer = screen.getByText('Section body').closest('.fade-in');
    // eslint-disable-next-line testing-library/no-node-access
    const inner = screen.getByText('Card').parentElement;

    expect(outer).toHaveClass('fade-in');
    expect(outer).not.toHaveClass('fade-in-leaf');
    expect(inner).toHaveClass('fade-in', 'fade-in-leaf');
  });
});

// The stagger itself lives in the stylesheet, because the wrapper cannot reach
// inside a section it did not render. These read the rules the component's
// custom properties feed.
describe('the stagger in index.css', () => {
  const stylesheet = fs.readFileSync(
    path.join(__dirname, '..', 'index.css'),
    'utf8'
  );

  const reducedMotionBlock = stylesheet.slice(
    stylesheet.indexOf('@media (prefers-reduced-motion: reduce)')
  );

  it('staggers the content children off the step the component publishes', () => {
    expect(stylesheet).toContain('.fade-in .content-wrapper > *');
    expect(stylesheet).toContain(
      'transition-delay: calc(var(--motion-step) * var(--motion-index, 0));'
    );
  });

  it('declares tier rules no deeper than the budget allows', () => {
    const declared = [...stylesheet.matchAll(/--motion-index:\s*(\d+)/g)].map(
      (match) => Number(match[1])
    );

    expect(declared.length).toBeGreaterThan(0);
    expect(Math.max(...declared)).toBe(STAGGER_TIERS);

    declared.forEach((tier) => {
      expect(motion.duration + tier * STAGGER_STEP).toBeLessThanOrEqual(motion.budget);
    });
  });

  it('keeps the slowest arrival in a section inside the motion budget', () => {
    expect(STAGGER_STEP).toBeGreaterThan(0);
    expect(STAGGER_TOTAL).toBe(motion.duration + STAGGER_TIERS * STAGGER_STEP);
    expect(STAGGER_TOTAL).toBeLessThanOrEqual(motion.budget);
  });

  it('writes no interval of its own, so timing cannot drift from the tokens', () => {
    // Any bare time value, as opposed to a calc over a published property.
    expect(stylesheet.match(/\b\d*\.?\d+m?s\b/g)).toBeNull();
  });

  it('removes the reveal, the stagger, and the heading rule under reduced motion', () => {
    ['.fade-in.visible .content-wrapper > *', '.fade-in .section-header-rule', '.fade-in-leaf'].forEach(
      (selector) => {
        expect(reducedMotionBlock).toContain(selector);
      }
    );

    expect(reducedMotionBlock).toContain('transition: none !important;');
    expect(reducedMotionBlock).toContain('animation: none !important;');
  });
});
