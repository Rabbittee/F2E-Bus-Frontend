import { Icon } from "@/components";
import clsx from "clsx";
import { Link } from "react-router-dom";

type DetailProps = {
  title?: string;
};
export function HasBack({ title }: DetailProps) {
  return (
    <div
      className={clsx(
        "w-full h-1/2 px-7",
        "flex justify-between items-center",
        "text-cyan-dark"
      )}
    >
      <Link to="/">
        <div className="p-1.5 w-6">
          <Icon.Back />
        </div>
      </Link>

      <h2 className="text-2xl font-bold">{title}</h2>

      <a href="/">
        <div className="w-6">
          <Icon.Close />
        </div>
      </a>
    </div>
  );
}