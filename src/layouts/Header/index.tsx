import { ReactNode } from "react";
import clsx from "clsx";
import { useLocation, matchPath, useSearchParams } from "react-router-dom";
import { cond, T } from "ramda";

import { useSelector, Query } from "@/logic";
import { Home } from "./Home";
import { HasBack } from "./HasBack";

const match =
  (...patterns: string[]) =>
  (pathname: string) =>
    patterns.some((pattern) => matchPath(pattern, pathname));

export default function Header() {
  const location = useLocation();

  const [param] = useSearchParams({
    query: useSelector(Query.selectQuery),
  });
  const query = param.get("query");

  return (
    <header
      className={clsx(
        "flex flex-col justify-center items-center md:flex-1",
        "gap-6 pt-8"
      )}
    >
      {cond<string, ReactNode>([
        [match("/"), () => <Home />],
        [
          match("locations", "stations/:id"),
          () => <HasBack className="text-dark-green" title={query} />,
        ],
        [
          match("routes/:id"),
          () => <HasBack className="text-orange" title={query} />,
        ],
        [T, () => <></>],
      ])(location.pathname)}
    </header>
  );
}
