import { Icon, Back } from "@/components";
import { Link, matchPath } from "react-router-dom";
import clsx from "clsx";
import { Primitive } from "utility-types";

type DetailProps = {
  title?: Primitive;
  className?: string;
};

const match =
  (...patterns: string[]) =>
  (pathname: string) =>
    patterns.some((pattern) => matchPath(pattern, pathname));

export function HasBack({ title, className }: DetailProps) {
  const matchPath = (...pattern: string[]) =>
    match(...pattern)(location.pathname);

  return (
    <div
      className={clsx(
        "w-full px-7 gap-4",
        "flex justify-between items-center",
        matchPath("/stations/:id") ? "text-orange" : "text-dark-green",
        className
      )}
    >
      <Back>
        <Icon.Back className="w-10" />
      </Back>

      <h1 className="text-3xl font-bold w-full mb-1">{title}</h1>

      <Link to="/">
        <Icon.Close className="w-6" />
      </Link>
    </div>
  );
}
