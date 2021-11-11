import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import { Home, Result, Stations, Arive, Map, Info } from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route path="locations/:id" element={<Result />} />

          <Route path="stations/:id" element={<Stations />} />

          <Route path="routes/:id">
            <Route path="arive" element={<Arive />} />
            <Route path="map" element={<Map />} />
            <Route path="info" element={<Info />} />
          </Route>

          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
