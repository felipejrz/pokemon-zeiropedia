import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { PokeContextProvider } from "./context/PokeContext.jsx";

import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import PokeNavegation from "./components/PokeNavegation";
import PokeHome from "./pages/PokeHome.jsx";
import PokeSearch from "./pages/PokeSearch.jsx";
import PokePages from "./pages/PokePages.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <PokeNavegation />,
    children: [
      {
        index: true,
        element: <PokeHome />,
      },
      {
        path: "/pokemon/:id",
        element: <PokePages />,
      },
      {
        path: "/search",
        element: <PokeSearch />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PokeContextProvider>
      <RouterProvider router={router} />
    </PokeContextProvider>
  </StrictMode>
);
