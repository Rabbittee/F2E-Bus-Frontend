import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import { Home, Location, Stations, Arive, Map, Info } from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route path="locations" element={<Location />} />

          <Route path="stations/:id" element={<Stations />} />

          <Route path="routes/:id">
            <Route path="map" element={<Map />} />
            <Route path="info" element={<Info />} />
            <Route index element={<Arive />} />
          </Route>

          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
