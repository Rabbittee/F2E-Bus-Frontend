import { Route, Routes, BrowserRouter } from "react-router-dom";
import * as Layout from "@/layouts";
import * as Pages from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout.Default />}>
          <Route index element={<Pages.Home />} />
          <Route path="locations" element={<Pages.Location />} />
          <Route path="stations/:id" element={<Pages.Stations />} />

          <Route path="routes/:id/*">
            <Route path="map" element={<Pages.Routes.Route />} />
            <Route path="info" element={<Pages.Routes.Info />} />
            <Route index element={<Pages.Routes.Route />} />
          </Route>

          <Route path="*" element={<Pages.NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
