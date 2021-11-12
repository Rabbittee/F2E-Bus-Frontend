import clsx from "clsx";
import { Routes, Route } from "react-router-dom";

import { Home } from "./Home";
import { Detail } from "./Detail";
import { RouteName } from "./RouteName";

export default function Header() {
  return (
    <header
      className={clsx(
        "flex flex-col justify-center items-center",
        "gap-6 pt-8"
      )}
    >
      <Routes>
        <Route path="/">
          <Route path="locations/*" element={<Detail />} />
          <Route path="stations/*" element={<Detail />} />
          <Route path="routes/*" element={<RouteName />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </header>
  );
}
