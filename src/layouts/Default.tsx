import { Background, Header, MapFigure } from "@/components";
import clsx from "clsx";
import { Outlet, Routes, Route } from "react-router";

export function Default() {
  return (
    <main className={clsx("h-screen", "flex flex-col justify-between gap-2")}>
      <Routes>
        <Route index element={<Background.Map />} />
      </Routes>

      <Header />

      <Routes>
        <Route path="/result" element={<MapFigure />} />
        <Route path="/stations" element={<MapFigure />} />
      </Routes>

      <Outlet />
    </main>
  );
}
