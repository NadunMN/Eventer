import { createTheme } from '@mui/material/styles';

const customPalette = {
  primary: {
    main: "#673ab7",
    light: "#9575cd",
    dark: "#311b92",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#9c27b0",
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#ffffff",
  },
  customColor: {
    main: "#ff4400",
    light: "#ff7744",
    dark: "#cc3300",
    contrastText: "#ffffff",
  },
};


const theme = createTheme({
  palette: customPalette,
});

export default theme;