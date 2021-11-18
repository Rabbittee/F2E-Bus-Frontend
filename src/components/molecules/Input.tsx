import { InputHTMLAttributes } from "react";
import { Icon } from "@/components";
import clsx from "clsx";

type InputProps = {
  placeholder?: string;
  name: string;
  value?: string;
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export function Input({ ...props }: InputProps) {
  return (
    <div
      className={clsx(
        "flex items-center",
        "border border-gray-200",
        "rounded-full overflow-hidden",
        "text-dark-green"
      )}
    >
      <label className="flex items-center w-full">
        <span
          className={clsx(
            "w-6 ml-3 mr-2",
            "transition-colors ease-out-circ",
            props.value ? "text-current" : "text-blue"
          )}
        >
          <Icon.Search />
        </span>

        <input
          type="search"
          className="outline-none py-2.5 w-full placeholder-blue"
          {...props}
        />
      </label>

      <button
        className={clsx(
          "w-6 mr-3",
          "transition-opacity ease-out-circ",
          props.value
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        type="reset"
      >
        <Icon.Close />
      </button>
    </div>
  );
}
