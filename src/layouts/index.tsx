import { Background } from "@/components";
import { Outlet } from "react-router";
import clsx from "clsx";
import { useParams } from "react-router";

import Header from "./Header";

export default function Layout() {
  const { id } = useParams<"id">();
  return (
    <main
      className={clsx(
        "flex flex-col gap-2",
        location.pathname >= "/routes/${id}"
          ? "h-screen justify-between md:flex-row"
          : "min-h-full"
      )}
    >
      <Background.Map />

      <Header />

      <Outlet />
    </main>
  );
}
