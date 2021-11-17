import { HasValue } from "@/models";
import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";

function CSS(config: any): CSSProperties {
  return config;
}

type SwitchToggleProps<T extends HasValue> = {
  name: string;
  options: T[];
  className?: string;
  classes?: {
    wrapper?: string;
    thumb?: string;
  };
  thumb?: ReactNode;
  onChange?: (option: T) => void;
  value: T["value"];
};
export function SwitchToggle<T extends HasValue>({
  name,
  options,
  classes,
  thumb,
  onChange,
  value,
}: SwitchToggleProps<T>) {
  const index = options.findIndex((option) => option.value === value);

  return (
    <div
      className={clsx(
        "flex items-center",
        "rounded-full bg-gray-300 p-0.5",
        "relative",
        classes?.wrapper
      )}
    >
      {options.map((option) => (
        <label key={option.value} className={clsx(classes?.thumb || "w-6 h-6")}>
          <span className="sr-only">{option.value}</span>

          <input
            type="radio"
            name={name}
            onChange={() => onChange?.(option)}
            className="w-full h-full opacity-0"
            {...option}
          />
        </label>
      ))}

      <div
        className={clsx(
          classes?.thumb || "w-6 h-6",
          "rounded-full bg-white p-0.5",
          "absolute transform pointer-events-none",
          "transition-transform"
        )}
        style={CSS({
          "--tw-translate-x": `${(index / (options.length - 1)) * 100}%`,
        })}
      >
        {thumb}
      </div>
    </div>
  );
}
