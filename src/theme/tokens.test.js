import fs from 'fs';
import path from 'path';

import fc from 'fast-check';

import { TOKEN_KEYS, palettes } from './tokens';

const MODES = ['light', 'dark'];

// Text roles and the surfaces they are rendered against anywhere in the theme.
// `accentContrast` is the colour that sits on an accent fill, so its surfaces
// are the accent shades rather than the neutral ones.
const TEXT_ON_SURFACE = {
  textPrimary: ['background', 'surface', 'surfaceMuted', 'accentSoft'],
  textSecondary: ['background', 'surface', 'surfaceMuted', 'accentSoft'],
  accent: ['background', 'surface', 'surfaceMuted', 'accentSoft'],
  accentStrong: ['background', 'surface', 'surfaceMuted'],
  accentContrast: ['accent', 'accentStrong'],
  // The tooltip inverts: the surface is the primary text colour and the label
  // is the page background colour.
  background: ['textPrimary'],
};

const PAIRS = MODES.flatMap((mode) =>
  Object.entries(TEXT_ON_SURFACE).flatMap(([text, surfaces]) =>
    surfaces.map((surface) => ({ mode, text, surface }))
  )
);

function channelLuminance(value) {
  const channel = value / 255;
  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex) {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) {
    throw new Error(`Not an opaque hex colour: ${hex}`);
  }
  const [red, green, blue] = [0, 2, 4].map((offset) =>
    parseInt(match[1].slice(offset, offset + 2), 16)
  );
  return (
    0.2126 * channelLuminance(red) +
    0.7152 * channelLuminance(green) +
    0.0722 * channelLuminance(blue)
  );
}

function contrastRatio(foreground, background) {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

// Feature: portfolio-refresh, Property 8: Token set parity
describe('token set parity', () => {
  it('defines every TOKEN_KEYS entry in both palettes and nothing else', () => {
    MODES.forEach((mode) => {
      expect(Object.keys(palettes[mode]).sort()).toEqual([...TOKEN_KEYS].sort());
    });
  });

  it('gives both palettes identical key sets', () => {
    expect(Object.keys(palettes.light).sort()).toEqual(
      Object.keys(palettes.dark).sort()
    );
  });

  it('holds a non empty value for any token name in either mode', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...MODES),
        fc.constantFrom(...TOKEN_KEYS),
        (mode, token) => {
          const value = palettes[mode][token];
          expect(typeof value).toBe('string');
          expect(value.trim().length).toBeGreaterThan(0);
        }
      )
    );
  });
});

// Feature: portfolio-refresh, Property 11: Contrast floor
describe('contrast floor', () => {
  it('holds 4.5 to 1 for any text token against any surface it renders on', () => {
    fc.assert(
      fc.property(fc.constantFrom(...PAIRS), ({ mode, text, surface }) => {
        const ratio = contrastRatio(
          palettes[mode][text],
          palettes[mode][surface]
        );
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      })
    );
  });

  it('covers both modes and every text role', () => {
    expect(PAIRS.filter((pair) => pair.mode === 'light')).toHaveLength(18);
    expect(PAIRS.filter((pair) => pair.mode === 'dark')).toHaveLength(18);
  });
});

// Feature: portfolio-refresh, Property 19: Colours come from tokens
describe('stylesheet colour literals', () => {
  const stylesheet = fs.readFileSync(
    path.join(__dirname, '..', 'index.css'),
    'utf8'
  );

  it('declares no colour literal in src/index.css', () => {
    const literals = [
      /#[0-9a-fA-F]{3,8}\b/g,
      /\brgba?\(/g,
      /\bhsla?\(/g,
      /\b(?:red|blue|green|white|black|grey|gray|orange|yellow|purple|pink)\b/g,
    ];

    literals.forEach((pattern) => {
      expect(stylesheet.match(pattern)).toBeNull();
    });
  });

  it('reads every colour through a custom property', () => {
    const colourDeclarations = stylesheet
      .split('\n')
      .filter((line) => /^\s*(?:background|background-color|color|border|border-color|outline|box-shadow)\s*:/.test(line));

    expect(colourDeclarations.length).toBeGreaterThan(0);
    colourDeclarations.forEach((line) => {
      expect(line).toMatch(/var\(--/);
    });
  });
});
