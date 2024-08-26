import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PokeNavegation from './components/PokeNavegation'
import  PokeHome from "./pages/PokeHome";
import PokeSearch from "./pages/PokeSearch";
import PokePages from "./pages/PokePages";



function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PokeNavegation />}>
        <Route index element={<PokeHome />} />
        <Route path="/pokemon/:id" element={<PokePages />} />
        <Route path="search" element={<PokeSearch />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
