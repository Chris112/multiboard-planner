import { CssVarsThemeOptions } from "@mui/joy";

export const defaultThemeConfig: CssVarsThemeOptions = {
  typography: {
    subtitle: {
      fontSize: "var(--joy-fontSize-xs)",
      fontWeight: 100,
      // CSS selectors are also supported!
      // "& + p": {
      //   marginTop: "4px",
      // },
    },
    label: {
      fontSize: "var(--joy-fontSize-sm)",
      fontWeight: "var(--joy-fontWeight-lg)",
      lineHeight: "var(--joy-lineHeight-lg)",
      marginBottom: "3px",
    },
  },
  colorSchemes: {
    dark: {
      // palette: {
      // primary: {
      // main: "#90caf9",
      // },
      // Add any other color customization here
      // },
    },
  },
};

// Have to manually declare the overrides for the TypographySystem
declare module "@mui/joy/styles" {
  interface TypographySystemOverrides {
    subtitle: true;
    label: true;
  }
}
