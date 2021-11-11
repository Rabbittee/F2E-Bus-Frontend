import { Background } from "@/components";
import { Outlet } from "react-router";

import Header from "./Header";

export default function Layout() {
  return (
    <main className="flex flex-col justify-between gap-2">
      <Background.Map />

      <Header />

      <Outlet />
    </main>
  );
}
