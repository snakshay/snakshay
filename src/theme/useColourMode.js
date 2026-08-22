// Hook exposing the active colour mode and the two ways to change it.
// Returns `{ mode, toggle, setMode }` and throws outside the provider, so a
// component rendered without ColourModeProvider fails loudly rather than
// falling back to an untracked mode.
import { useContext } from 'react';
import { ColourModeContext } from './ColourModeContext';

export function useColourMode() {
  const context = useContext(ColourModeContext);
  if (!context) throw new Error('useColourMode must be used inside ColourModeProvider');
  return context;
}

export default useColourMode;
