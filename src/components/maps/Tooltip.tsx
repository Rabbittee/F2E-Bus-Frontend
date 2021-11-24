import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  classes?: {
    wrapper?: string;
    triangle?: string;
  };
};
function Base({ children, classes }: Props) {
  return (
    <div
      className={clsx(
        "relative flex justify-center font-bold",
        "px-2 py-1",
        "rounded-sm",
        classes?.wrapper
      )}
    >
      <div className="space-x-1">{children}</div>

      <div
        className={clsx(
          "absolute bottom-0 translate-y-full",
          "border-l-transparent",
          "border-r-transparent",
          classes?.triangle
        )}
        style={{
          borderLeftWidth: `${4}px`,
          borderRightWidth: `${4}px`,
          borderTopWidth: `${6}px`,
        }}
      />
    </div>
  );
}

type DarkGreenProps = Pick<Props, "children">;
function DarkGreen({ children }: DarkGreenProps) {
  return (
    <Base
      classes={{
        wrapper: "bg-dark-green text-white shadow-md",
        triangle: "border-dark-green",
      }}
    >
      {children}
    </Base>
  );
}

type OrangeProps = Pick<Props, "children">;
function Orange({ children }: OrangeProps) {
  return (
    <Base
      classes={{
        wrapper: "bg-orange text-white shadow-md",
        triangle: "border-orange",
      }}
    >
      {children}
    </Base>
  );
}

export const Tooltip = { Orange, DarkGreen };
