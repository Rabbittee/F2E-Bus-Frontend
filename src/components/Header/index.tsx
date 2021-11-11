import clsx from "clsx";
import { Routes, Route } from "react-router-dom";

import { Home } from "./Home";
import { Detail } from "./Detail";
import { RouteName } from "./RouteName";

export function Header() {
  return (
    <header
      className={clsx(
        "flex flex-col justify-center items-center",
        "gap-6 pt-8 px-7"
      )}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Detail />} />
        <Route path="/stations" element={<Detail />} />
        <Route path="/route/*" element={<RouteName />} />
      </Routes>
    </header>
  );
}
