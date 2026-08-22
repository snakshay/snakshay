// Builds the MUI theme for a colour mode from the design tokens.
//
// The custom `nav` breakpoint keeps the 750 pixel threshold in one place and
// lets components write `theme.breakpoints.down('nav')`. Sitting between `sm`
// and `md` it preserves the MUI defaults, so existing `xs`, `md`, `lg`, and
// `xl` grid props keep their meaning.
//
// One typography scale and one spacing scale come from here, so components use
// `sx` with `theme.spacing` multiples rather than pixel margins. The `clamp`
// sizes give the responsive step without a per breakpoint override.
//
// The `components` block is where the surface hierarchy lands. A card takes its
// background, its outline, and its shadow from the tokens, so it sits above the
// page in both modes instead of reading as a flat outline.
import { createTheme } from '@mui/material/styles';
import { fonts, palettes, NAV_COLLAPSE_WIDTH } from './tokens';

export function createAppTheme(mode) {
  const t = palettes[mode];
  return createTheme({
    palette: {
      mode,
      background: { default: t.background, paper: t.surface },
      text: { primary: t.textPrimary, secondary: t.textSecondary },
      primary: { main: t.accent, dark: t.accentStrong, contrastText: t.accentContrast },
      divider: t.border,
      // The raw token set, so components can reach tokens MUI has no slot for.
      tokens: t,
    },
    breakpoints: {
      values: { xs: 0, sm: 600, nav: NAV_COLLAPSE_WIDTH, md: 900, lg: 1200, xl: 1536 },
    },
    typography: {
      // Body copy and controls read in the text face. Headings override the
      // family below, so the two faces never compete inside one block.
      fontFamily: fonts.body,
      htmlFontSize: 16,
      // Display sizes get negative tracking, which is what stops a large
      // heading from looking loose and unset.
      h1: {
        fontFamily: fonts.heading,
        fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-0.015em',
      },
      h3: {
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontFamily: fonts.heading,
        fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: '-0.005em',
      },
      h5: { fontFamily: fonts.heading, fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.3 },
      h6: { fontFamily: fonts.heading, fontSize: '1rem', fontWeight: 700, lineHeight: 1.3 },
      subtitle1: { fontSize: '1.0625rem', fontWeight: 600, lineHeight: 1.45 },
      subtitle2: { fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.45, letterSpacing: '0.01em' },
      // 400 rather than 300. At 18 pixels a 300 weight is the single biggest
      // reason body copy reads as washed out, and secondary text stays at 400
      // too rather than getting thinner on top of being lighter in colour.
      body1: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.65 },
      body2: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
      button: { fontSize: '1rem', fontWeight: 600, letterSpacing: '0.01em', textTransform: 'none' },
      caption: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.45 },
      overline: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' },
    },
    shape: { borderRadius: 12 },
    spacing: 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: t.background,
            color: t.textPrimary,
            fontFamily: fonts.body,
            fontWeight: 400,
          },
          '::selection': { backgroundColor: t.accentSoft, color: t.textPrimary },
          strong: { fontWeight: 600 },
          b: { fontWeight: 600 },
        },
      },

      // Paper keeps the flat gradient off in dark mode, and the elevation
      // classes spend the shadow tokens. Only the elevated variants carry a
      // shadow, so a deliberately flat surface such as the fixed nav bar
      // (`elevation={0}`) stays flat.
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
          elevation1: { boxShadow: t.shadow },
          elevation2: { boxShadow: t.shadow },
          elevation3: { boxShadow: t.shadowRaised },
          elevation4: { boxShadow: t.shadowRaised },
          elevation8: { boxShadow: t.shadowRaised },
          elevation16: { boxShadow: t.shadowRaised },
          elevation24: { boxShadow: t.shadowRaised },
        },
      },

      // A card is the surface token, a visible outline, and a resting shadow.
      // Hover lifts it. This is what replaces the flat 1 pixel outline the
      // stylesheet used to draw.
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundColor: t.surface,
            color: t.textPrimary,
            border: `1px solid ${t.border}`,
            borderRadius: 16,
            boxShadow: t.shadow,
            transition: 'box-shadow 200ms ease, border-color 200ms ease',
            '&:hover': { boxShadow: t.shadowRaised, borderColor: t.borderStrong },
          },
        },
      },

      // Readable size, a tinted accent fill, and real padding, so a chip reads
      // as a label rather than a placeholder.
      MuiChip: {
        styleOverrides: {
          root: {
            height: 'auto',
            minHeight: 32,
            borderRadius: 8,
            fontSize: '0.9375rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
            backgroundColor: t.accentSoft,
            color: t.textPrimary,
          },
          label: { paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5 },
          filled: { backgroundColor: t.accentSoft, color: t.textPrimary },
          outlined: {
            backgroundColor: t.accentSoft,
            borderWidth: 1,
            borderColor: t.borderStrong,
            color: t.textPrimary,
          },
        },
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 20px',
            minHeight: 44,
            transition:
              'background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease',
          },
          contained: {
            backgroundColor: t.accent,
            color: t.accentContrast,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: t.accentStrong,
              color: t.accentContrast,
              boxShadow: t.shadow,
            },
          },
          outlined: {
            padding: '9px 19px',
            borderWidth: 2,
            borderColor: t.border,
            color: t.accent,
            '&:hover': {
              borderWidth: 2,
              borderColor: t.accent,
              backgroundColor: t.accentSoft,
            },
          },
          text: {
            color: t.accent,
            '&:hover': { backgroundColor: t.accentSoft },
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '&:hover': { backgroundColor: t.accentSoft, color: t.accent },
          },
        },
      },

      MuiLink: {
        defaultProps: { underline: 'hover' },
        styleOverrides: {
          root: { color: t.accent, fontWeight: 500, textUnderlineOffset: '0.2em' },
        },
      },

      MuiDivider: { styleOverrides: { root: { borderColor: t.border } } },

      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: t.accentSoft,
            color: t.accent,
            fontWeight: 700,
            border: `1px solid ${t.border}`,
          },
        },
      },

      // The muted surface separates a disclosure panel from the card it sits
      // in, and the default hairline pseudo element goes away in favour of a
      // token border.
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { borderColor: t.borderStrong },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            '&:hover': { backgroundColor: t.surfaceMuted },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: t.textPrimary,
            color: t.background,
            fontSize: '0.8125rem',
            fontWeight: 500,
            padding: '6px 10px',
          },
          arrow: { color: t.textPrimary },
        },
      },
    },
  });
}

export default createAppTheme;
