/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const palette = {
  text: '#f8fafc',
  tint: '#14b8a6',
  background: '#0f172a',
  foreground: '#f8fafc',
  card: '#1e293b',
  cardForeground: '#f8fafc',
  primary: '#0d9488',
  primaryForeground: '#ffffff',
  secondary: '#334155',
  secondaryForeground: '#e2e8f0',
  muted: '#1e293b',
  mutedForeground: '#94a3b8',
  accent: '#334155',
  accentForeground: '#e2e8f0',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  border: '#334155',
  input: '#475569',
  ring: '#14b8a6',
  surfaceStrong: '#162238',
  surfaceElevated: '#24344d',
  success: '#34d399',
  successSoft: '#123d3a',
  warning: '#fbbf24',
  warningSoft: '#413515',
  info: '#60a5fa',
  infoSoft: '#172f52',
  dangerSoft: '#461d2b',
};

const colors = {
  light: {
    ...palette,
  },
  dark: {
    ...palette,
  },

  radius: 8,
};

export default colors;
