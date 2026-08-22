// Colour mode provider: resolves the active mode, builds the theme, and
// publishes the active tokens as CSS custom properties.
//
// Resolution order: a valid stored value wins, otherwise `prefers-color-scheme`.
// Both storage calls sit inside `try` and `catch`, so a blocked or full store
// leaves the media query answer in charge and rendering continues. Storage
// holds the string `light` or `dark`; anything else is treated as absent, which
// covers a stale or hand edited value. Switching modes swaps the theme object
// and the custom properties in place, with no reload.
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import { fonts, motion, palettes } from './tokens';
import { createAppTheme } from './createAppTheme';

const STORAGE_KEY = 'snakshay:colour-mode';
const VALID = ['light', 'dark'];

export const ColourModeContext = createContext(null);

function readStoredMode() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return VALID.includes(stored) ? stored : null;
  } catch (error) {
    return null;
  }
}

function writeStoredMode(mode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch (error) {
    // Storage is blocked or full. The session keeps the chosen mode in state.
  }
}

// `index.css` reads colours through these variables, so the stylesheet holds no
// colour literal. Every key in TOKEN_KEYS is published, plus the motion timings
// and the two font stacks, so the stylesheet and the theme cannot drift apart.
export function cssVariablesFor(mode) {
  const t = palettes[mode];
  return {
    ':root': {
      '--bg': t.background,
      '--surface': t.surface,
      '--surface-muted': t.surfaceMuted,
      '--text-primary': t.textPrimary,
      '--text-secondary': t.textSecondary,
      '--accent': t.accent,
      '--accent-soft': t.accentSoft,
      '--accent-contrast': t.accentContrast,
      '--accent-strong': t.accentStrong,
      '--border': t.border,
      '--border-strong': t.borderStrong,
      '--focus-ring': t.focusRing,
      '--shadow': t.shadow,
      '--shadow-raised': t.shadowRaised,
      '--font-body': fonts.body,
      '--font-heading': fonts.heading,
      '--motion-duration': `${motion.duration}ms`,
      '--motion-delay': `${motion.delay}ms`,
    },
  };
}

export function ColourModeProvider({ children }) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setModeState] = useState(() => readStoredMode());
  const resolved = mode ?? (prefersDark ? 'dark' : 'light');

  // A plain CSS selector can react to the mode through this attribute.
  useEffect(() => {
    document.documentElement.setAttribute('data-colour-mode', resolved);
  }, [resolved]);

  const setMode = useCallback((next) => {
    setModeState(next);
    writeStoredMode(next);
  }, []);

  const value = useMemo(
    () => ({
      mode: resolved,
      setMode,
      toggle: () => setMode(resolved === 'dark' ? 'light' : 'dark'),
    }),
    [resolved, setMode]
  );

  const theme = useMemo(() => createAppTheme(resolved), [resolved]);

  return (
    <ColourModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={cssVariablesFor(resolved)} />
        {children}
      </ThemeProvider>
    </ColourModeContext.Provider>
  );
}

export default ColourModeProvider;
