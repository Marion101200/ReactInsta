
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import Parents from "./Props/Parents.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PanierProvider } from "./context/PanierContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PanierProvider>
          <App />
          <Parents />
        </PanierProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
