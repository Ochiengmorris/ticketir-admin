// General constants styling for the whole app

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Spacing constants
export const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
};

// Padding constants
export const PADDING = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 40,
};

// Margin constants
export const MARGIN = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

// Font sizes
export const FONT_SIZE = {
  small: 12,
  medium: 14,
  large: 18,
  xlarge: 22,
  heading: 28,
};

// Border radius
export const BORDER_RADIUS = {
  small: 8,
  medium: 12,
  large: 16,
};

// Layout constants
export const LAYOUT = {
  screenWidth: width,
  screenHeight: height,
  headerHeight: 60,
  footerHeight: 50,
  buttonHeight: 50,
  cardHeight: 200,
};

// Colors
export const COLORS = {
  primary: "#3c8ff8", // Example primary color
  secondary: "#FF6F61", // Example secondary color
  background: "#F4F4F4", // Example background color
  white: "#FFFFFF",
  black: "#000000",
  lightGreen: "#cff3d5",
  lightBlue: "#e4f0ff",
  grey: "#BEBEBE",
};

// Icons sizes
export const ICON_SIZE = {
  small: 20,
  medium: 30,
  large: 40,
};

// Other useful constants
export const OPACITY = {
  low: 0.5,
  medium: 0.7,
  high: 1,
};

export const SHADOW = {
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  heavy: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
};
