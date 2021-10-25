import { Icon } from "@/components";
import { ReactNode } from "react";
import clsx from "clsx";

type InputProps = {
  className: string;
  icon: ReactNode;
};

export function Input() {
  return (
    <label
      className={clsx(
        "flex items-center",
        "border border-gray-200",
        "rounded-md overflow-hidden"
      )}
    >
      <span className="w-6 ml-3 text-gray-500">
        <Icon.Search />
      </span>

      <input
        className="text-lg outline-none mx-3 py-1.5 w-full"
        type="text"
        name="search"
        id="search"
      />
    </label>
  );
}
