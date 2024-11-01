import { CssBaseline } from "@mui/joy";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ts complained, maybe a vite thing, installed font in .html file anyway from google
// import "@fontsource/inter";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <CssBaseline />
//     <App />
//   </StrictMode>
// );

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <CssBaseline />
      <App />
    </StrictMode>
  );
}
