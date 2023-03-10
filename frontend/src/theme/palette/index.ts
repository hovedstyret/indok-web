import { Color, PaletteOptions } from "@mui/material";
import { colorChannel } from "@mui/system/colorManipulator";

const grey: Partial<Color> = {
  50: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

export const light: PaletteOptions = {
  primary: {
    main: "#2D6365",
    contrastText: "#fff",
  },
  secondary: {
    main: "#F37F31",
    contrastText: "#fff",
  },
  info: {
    main: "#00B1ED",
    contrastText: "#fff",
  },
  error: {
    main: "#FF3B30",
    contrastText: "#fff",
  },
  warning: {
    main: "#FF9500",
    contrastText: "#fff",
  },
  grey,
  success: {
    main: "#34C759",
    contrastText: "#fff",
  },
  contrast: {
    light: "#3A3A3C",
    dark: "#1C1C1E",
    main: "#2C2C2E",
    contrastText: "#fff",
  },
  background: {
    elevated: "#f0f0f0",
    default: "#fff",
    paper: "#fff",
  },
  shadowChannel: colorChannel("#C4CDD5"),
};

export const dark: PaletteOptions = {
  background: {
    elevated: grey[900],
    default: "#0f1217",
    paper: grey[800],
  },
  error: {
    main: "#FF4530",
    contrastText: "#fff",
  },
  warning: {
    main: "#FF9F0A",
    contrastText: "#fff",
  },
  grey,
  success: {
    main: "#30D158",
    contrastText: "#fff",
  },
  primary: {
    main: "#3E878A",
  },
  secondary: {
    main: "#F37F31",
  },
  contrast: {
    dark: "#E5E5EA",
    main: "#F2F2F7",
    light: "#fff",
    contrastText: "#000",
  },
  shadowChannel: colorChannel("#000"),
};
