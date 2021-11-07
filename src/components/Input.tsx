import { Icon } from "@/components";
import clsx from "clsx";

type InputProps = {
  placeholder?: string;
  name: string;
};

export function Input({ placeholder, name }: InputProps) {
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
        type="search"
        className="outline-none mx-3 py-1.5 w-full placeholder-cyan text-cyan-dark"
        placeholder={placeholder}
        name={name}
      />
    </label>
  );
}
