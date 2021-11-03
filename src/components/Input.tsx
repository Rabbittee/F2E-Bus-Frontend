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
        "rounded-full overflow-hidden"
      )}
    >
      <span className="w-6 ml-3 text-cyan">
        <Icon.Search />
      </span>

      <input
        className="text-base outline-none mx-3 py-1.5 w-full placeholder-cyan text-cyan-dark"
        placeholder="搜尋相關的 公車、站牌或是地標..."
        type="text"
        name="search"
        id="search"
      />
    </label>
  );
}
