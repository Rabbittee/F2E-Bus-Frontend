import clsx from "clsx";
import { Routes, Route } from "react-router-dom";

import { Home } from "./Home";
import { Detail } from "./Detail";

export function Header() {
  return (
    <header
      className={clsx(
        "flex flex-col justify-center items-center",
        "gap-6 pt-12 px-7"
      )}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Detail />} />
        <Route path="/stations" element={<Detail />} />
      </Routes>
    </header>
  );
}
