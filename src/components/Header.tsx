import { Input } from "@/components";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import logo from "../images/logo.png";

export function Header() {
  const location = useLocation<string>();
  return (
    <header
      className={clsx(
        "flex flex-col justify-center items-center",
        "gap-6 pt-12 px-7"
      )}
    >
      {location.pathname !== "/result" && (
        <div className="flex flex-col gap-2 ">
          <img src={logo} alt="" />
          <h2 className="text-3xl font-bold text-cyan-dark">
            Where would you like to go today?
          </h2>
        </div>
      )}

      <div
        className={clsx(
          "flex flex-col w-full gap-4 rounded-full",
          "bg-white transition-all duration-300"
        )}
      >
        <Input />
      </div>
    </header>
  );
}
