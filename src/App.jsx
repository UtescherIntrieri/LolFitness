import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./Home";
import { Matches } from "./pages/Matches";
import { Match } from './pages/Match';

export function App() {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/:summId/" element={<Matches />} />
          <Route path="/:summId/:id" element={<Match />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}