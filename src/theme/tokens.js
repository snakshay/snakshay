// Design tokens for the portfolio theme layer.
//
// TOKEN_KEYS names every token defined for both colour modes. The six colour
// roles required of the theme come first (background, surface, primary text,
// secondary text, accent, border), then the surface and accent shades that give
// each mode a hierarchy, then the focus ring and the two shadows.
//
// Both palettes carry identical key sets. `ColourModeContext` publishes every
// one of these as a CSS custom property, so `src/index.css` never needs a
// colour literal.
export const TOKEN_KEYS = [
  // Required roles.
  'background', 'surface', 'textPrimary', 'textSecondary', 'accent', 'border',
  // Surface hierarchy: a muted step between the page and a card.
  'surfaceMuted',
  // Accent shades: a tint to fill on, a legible colour to sit on the accent,
  // and a darker or lighter step for hover.
  'accentSoft', 'accentContrast', 'accentStrong',
  // A heavier line for control outlines and hover states.
  'borderStrong',
  'focusRing',
  // Resting elevation and raised elevation.
  'shadow', 'shadowRaised',
];

export const palettes = {
  light: {
    // The page is a cool grey rather than near white, so a white card reads as
    // a card without needing a heavy outline.
    background: '#EDF0F7',
    surface: '#FFFFFF',
    surfaceMuted: '#E3E8F3',
    textPrimary: '#12141A',
    textSecondary: '#4A5162',
    accent: '#2B41C9',
    accentSoft: '#DCE3FA',
    accentContrast: '#FFFFFF',
    accentStrong: '#1E2FA0',
    border: '#A9B3CA',
    borderStrong: '#7E8AA6',
    focusRing: '#2B41C9',
    shadow: '0 1px 2px rgba(16, 20, 32, 0.06), 0 6px 16px rgba(16, 20, 32, 0.09)',
    shadowRaised: '0 2px 4px rgba(16, 20, 32, 0.08), 0 16px 40px rgba(16, 20, 32, 0.16)',
  },
  dark: {
    background: '#0A0B10',
    surface: '#15171F',
    surfaceMuted: '#1E212C',
    textPrimary: '#F3F4F8',
    textSecondary: '#AEB4C4',
    accent: '#8FA8FF',
    accentSoft: '#232B45',
    accentContrast: '#0A0B10',
    accentStrong: '#B3C4FF',
    border: '#3A4157',
    borderStrong: '#565F7A',
    focusRing: '#8FA8FF',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.6), 0 6px 16px rgba(0, 0, 0, 0.45)',
    shadowRaised: '0 2px 6px rgba(0, 0, 0, 0.7), 0 20px 44px rgba(0, 0, 0, 0.55)',
  },
};

// Measured contrast, every text token against every surface it renders on.
// The floor is 4.5 to 1 and `tokens.test.js` fails the build below it.
//
//                                    light      dark
//   textPrimary   on background      16.14      17.89
//   textPrimary   on surface         18.41      16.27
//   textPrimary   on surfaceMuted    14.99      14.60
//   textPrimary   on accentSoft      14.39      12.71
//   textSecondary on background       6.96       9.48
//   textSecondary on surface          7.94       8.62
//   textSecondary on surfaceMuted     6.47       7.73
//   textSecondary on accentSoft       6.21       6.74
//   accent        on background       6.81       8.62
//   accent        on surface          7.77       7.85
//   accent        on surfaceMuted     6.33       7.04
//   accent        on accentSoft       6.07       6.13
//   accentStrong  on background       9.35      11.47
//   accentStrong  on surface         10.66      10.44
//   accentStrong  on surfaceMuted     8.68       9.36
//   accentContrast on accent          7.77       8.62
//   accentContrast on accentStrong   10.66      11.47
//   background    on textPrimary     16.14      17.89   (tooltip, inverted)

// Two families, one job each. Sofia Sans is a narrow display grotesque, so it
// carries the headings where its tight fit and character help. Inter has the
// taller x-height and wider letterforms that keep 18 pixel body copy readable,
// so it carries prose and controls. The pairing is also what gives the page its
// weight contrast: headings at 700 and 800 in a condensed face against body
// copy at 400 in a text face.
export const fonts = {
  body: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
  heading: "'Sofia Sans', 'Inter', 'Segoe UI', system-ui, sans-serif",
};

// Entrance transition timing in milliseconds. `budget` is the ceiling the
// duration and delay together must stay under.
export const motion = { duration: 450, delay: 120, budget: 600 };

// Viewport width in CSS pixels at which the nav item list collapses.
export const NAV_COLLAPSE_WIDTH = 750;
