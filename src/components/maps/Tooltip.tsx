import clsx from "clsx";
import { ReactNode } from "react";
import { Tooltip as _Tooltip } from "react-leaflet";

export type Props = {
  children?: ReactNode;
  offset?: number;
  classes?: {
    wrapper?: string;
    content?: string;
    triangle?: string;
  };
};
function Base({ children, classes, offset = 0 }: Props) {
  return (
    <_Tooltip
      direction="top"
      offset={[0, offset]}
      permanent
      className={classes?.wrapper}
    >
      <div
        className={clsx(
          "relative flex justify-center font-bold",
          "px-2 py-1",
          "rounded-sm",
          classes?.content
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
    </_Tooltip>
  );
}

function DarkGreen({ classes, ...props }: Props) {
  return (
    <Base
      classes={{
        content: clsx("bg-dark-green text-white shadow-md", classes?.content),
        triangle: clsx("border-dark-green", classes?.triangle),
      }}
      {...props}
    />
  );
}

function Orange({ classes, ...props }: Props) {
  return (
    <Base
      classes={{
        content: clsx("bg-orange text-white shadow-md", classes?.content),
        triangle: clsx("border-orange", classes?.triangle),
      }}
      {...props}
    />
  );
}

export const Tooltip = { Orange, DarkGreen };
