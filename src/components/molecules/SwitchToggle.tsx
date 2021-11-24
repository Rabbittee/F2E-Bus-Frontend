import { HasValue } from "@/models";
import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";
import { Icon } from "..";

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
  onChange?: (option: T["value"]) => void;
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

  const next = (index + 1) % options.length;

  return (
    <div
      className={clsx(
        "flex items-center",
        "rounded-full bg-gray-300 p-0.5",
        "relative",
        "pointer-events-auto cursor-pointer",
        classes?.wrapper
      )}
      onClick={() => onChange?.(options[next].value)}
    >
      {options.map((option) => (
        <label
          key={String(option.value)}
          className={clsx(
            classes?.thumb || "w-6 h-6 opacity-0 pointer-events-none"
          )}
        >
          <span className="sr-only">{option.value}</span>

          <input
            type="radio"
            name={name}
            onChange={() => onChange?.(option.value)}
            className="w-full h-full"
            value={String(option.value)}
          />
        </label>
      ))}

      <div
        className={clsx(
          classes?.thumb || "w-6 h-6",
          "rounded-full bg-white p-1",
          "absolute transform pointer-events-none",
          "transition-transform ease-out-cubic"
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
