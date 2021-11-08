import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout } from "@/layouts";
import { Home, Result, Stations, Station, Map, Info } from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout.Default />}>
          <Route path="result" element={<Result />} />
          <Route path="stations" element={<Stations />} />

          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
