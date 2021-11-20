import clsx from "clsx";
import { ReactNode } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import { cond, T } from "ramda";

import { Background, HasBack } from "@/components";
import { SearchParams } from "@/logic";
import { Home } from "./Home";

const match =
  (...patterns: string[]) =>
  (pathname: string) =>
    patterns.some((pattern) => matchPath(pattern, pathname));

export default function Layout() {
  const location = useLocation();
  const query = SearchParams.useQuery();

  return (
    <main
      className={clsx(
        "flex flex-col gap-2 container mx-auto",
        location.pathname === "/" || location.pathname === "notfound"
          ? "items-center"
          : ""
      )}
    >
      <Background.Map />

      <header
        className={clsx(
          "flex flex-col justify-center items-center md:flex-1",
          "gap-6 pt-8",
          "flex-[8]"
        )}
      >
        {cond<string, ReactNode>([
          [match("/"), () => <Home />],
          [
            match("locations"),
            () => <HasBack className="text-dark-green" title={query} />,
          ],
          [
            match("stations/:id"),
            () => <HasBack className="text-orange" title={query} />,
          ],
          [
            match("routes/:id"),
            () => <HasBack className="text-orange" title={query} />,
          ],
          [T, () => <></>],
        ])(location.pathname)}
      </header>

      <Outlet />
    </main>
  );
}
