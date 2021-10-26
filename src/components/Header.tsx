import { Input } from "@/components";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation<string>();
  return (
    <header
      className={clsx(
        "flex flex-col justify-center flex-1 items-center",
        "gap-6 pt-12 px-7"
      )}
    >
      {location.pathname !== "/result" && (
        <h2 className="text-3xl font-bold">
          Where would you like to go today?
        </h2>
      )}

      <div className="flex flex-col w-full gap-4 bg-white">
        <Input />
      </div>
    </header>
  );
}
