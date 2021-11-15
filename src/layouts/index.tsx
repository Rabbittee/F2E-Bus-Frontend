import { Background } from "@/components";
import { Outlet } from "react-router";

import Header from "./Header";

export default function Layout() {
  return (
    <main className="flex flex-col gap-2 min-h-screen pb-8">
      <Background.Map />

      <Header />

      <Outlet />
    </main>
  );
}
