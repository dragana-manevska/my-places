export const Colors = {
  // Primary Palette (Teal)
  primary50: '#daf3f6',
  primary100: '#a8daeb',
  primary200: '#5c96ad',
  primary400: '#0a94c7',
  primary500: '#0a7ea4',
  primary600: '#085b7f',
  primary800: '#064c63',

  // Gradient Colors (Derived from primary palette)
  gradient100: '#064c63',
  gradient150: '#1f88aa',
  gradient200: '#368d76',
  gradient250: '#98c9bc',
  gradient300: '#262258',
  gradient350: '#6862b5',

  // Secondary Palette (Coral/Orange - Complementary)
  secondary100: '#ffd4cc',
  secondary200: '#f28c8c',
  secondary400: '#ff8a50',
  secondary500: '#ff6b4a',
  secondary600: '#e63946',
  secondary800: '#ba324f',

  // Additional Colors
  success100: '#c8e6c9',
  success500: '#4caf50',
  success800: '#2e7d32',

  warning100: '#fff3cd',
  warning500: '#ffc107',
  warning800: '#ff8f00',

  error100: '#f2a1a1',
  error500: '#e65b5b',
  error800: '#c62828',

  // Neutral
  gray100: '#f5f5f5',
  gray300: '#e0e0e0',
  gray500: '#9e9e9e',
  gray700: '#616161',
  gray900: '#212121',
};

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const ThemeColors = {
  light: {
    text: '#212121',
    infoText: '#616161',
    background: '#fafafa',
    tint: tintColorLight,
    primary: '#0a7ea4',
    secondary: '#ff6b4a',
    icon: '#757575',
    tabIconDefault: '#9e9e9e',
    tabIconSelected: tintColorLight,
    success: '#4caf50',
    warning: '#ffc107',
    error: '#e65b5b',
    secondError: '#f2a1a1',
  },
  dark: {
    text: '#eceff1',
    infoText: '#b0bec5',
    background: '#0a1f2e',
    tint: tintColorDark,
    primary: '#4dd0e1',
    secondary: '#ff8a50',
    icon: '#80deea',
    tabIconDefault: '#4db6ac',
    tabIconSelected: tintColorDark,
    success: '#81c784',
    warning: '#ffb74d',
    error: '#ef9a9a',
    secondError: '#ffcccc',
  },
};
