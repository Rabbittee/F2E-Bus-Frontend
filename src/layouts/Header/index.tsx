import clsx from "clsx";
import { Routes, Route } from "react-router-dom";

import { Home } from "./Home";
import { Location } from "./Location";
import { RouteName } from "./RouteName";

export default function Header() {
  return (
    <header
      className={clsx(
        "flex flex-col justify-center items-center md:flex-1",
        "gap-6 pt-8"
      )}
    >
      <Routes>
        <Route path="/">
          <Route path="locations" element={<Location />} />
          <Route path="stations/*" element={<Location />} />
          <Route path="routes/*" element={<RouteName />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </header>
  );
}
