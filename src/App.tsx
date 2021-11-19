import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import * as Pages from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Pages.Home />} />
          <Route path="locations" element={<Pages.Location />} />
          <Route path="stations/:id" element={<Pages.Stations />} />
          <Route path="routes/:id" element={<Pages.Routes />} />
          <Route path="*" element={<Pages.NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
