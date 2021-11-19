import clsx from "clsx";

import { Icon, SwitchToggle } from "@/components";
import { Estimate, Has } from "@/models";

type Option = Has<"value", keyof Estimate> & Has<"label", string>;
type TitleProps = {
  className?: string;
  options: Option[];
  title?: string;
  value: Option["value"];
  onChange: (value: Option["value"]) => void;
};
export function Title({
  className,
  options,
  title,
  value,
  onChange,
}: TitleProps) {
  return (
    <div className={clsx("flex justify-between text-dark-green", className)}>
      <h3 className="text-2xl font-bold">{title}</h3>

      <div className="flex gap-1 items-center">
        <strong className="text-sm">
          {options.find((option) => option.value === value)?.label}
        </strong>

        <SwitchToggle
          name="arrival-time-display"
          options={options}
          value={value}
          onChange={onChange}
          thumb={<Icon.LastTime />}
        />
      </div>
    </div>
  );
}
