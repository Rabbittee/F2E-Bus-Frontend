import clsx from "clsx";
import { cloneElement, isValidElement, ReactNode, MouseEvent } from "react";

type LayerProps = {
  children?: ReactNode;
  className?: string;
  background?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};
export function Layer({
  children,
  background,
  className,
  onClick,
}: LayerProps) {
  return (
    <div
      className={clsx(
        "fixed left-0 top-0",
        "h-screen w-screen",
        "flex justify-center items-center",
        className
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

      <div className="relative max-w-xl md:w-full">{children}</div>
    </div>
  );
}
