import { Background } from "@/components";
import { Outlet } from "react-router";

import Header from "./Header";

export default function Layout() {
  return (
    <main className="flex flex-col gap-2 h-screen">
      <Background.Map />

      <Header />

      <Outlet />
    </main>
  );
}
