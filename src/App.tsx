import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { defaultThemeConfig } from "./config/theme";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Example on how to customize the theme
const theme = extendTheme(defaultThemeConfig);

function App() {
  return (
    <CssVarsProvider defaultMode="dark" theme={theme}>
      <RouterProvider router={router} />
    </CssVarsProvider>
  );
}

export default App;
