import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PokeContextProvider } from "./context/PokeContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PokeContextProvider>
      <App />
    </PokeContextProvider>
  </StrictMode>
);
