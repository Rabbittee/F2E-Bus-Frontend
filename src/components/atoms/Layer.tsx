import clsx from "clsx";
import { cloneElement, isValidElement, ReactNode, MouseEvent } from "react";

type LayerProps = {
  placement?: "center" | "top" | "bottom";
  children?: ReactNode;
  background?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  classes?: {
    wrapper?: string;
    content?: string;
  };
};
export function Layer({
  placement = "center",
  children,
  background,
  classes,
  onClick,
}: LayerProps) {
  return (
    <div
      className={clsx(
        "fixed left-0 top-0",
        "h-screen w-screen",
        "flex justify-center",
        placement === "center" && "items-center",
        placement === "top" && "items-start",
        placement === "bottom" && "items-end",
        classes?.wrapper
      )}
    >
      {isValidElement(background) &&
        cloneElement(background, {
          className: clsx(
            background.props.className,
            "w-full h-full absolute top-0 left-0"
          ),
        })}

      <div className="w-full h-full absolute top-0 left-0" onClick={onClick} />

      <div className={clsx("relative md:max-w-xl md:w-full", classes?.content)}>
        {children}
      </div>
    </div>
  );
}
