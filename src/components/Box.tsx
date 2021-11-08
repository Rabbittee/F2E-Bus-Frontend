import { ReactNode } from "react";
import clsx from "clsx";

type BoxProps = {
  children?: ReactNode;
};
export function Box({ children }: BoxProps) {
  return (
    <div
      className={clsx(
        "absolute bottom-0 p-4 rounded-t-2xl w-full h-full",
        " text-cyan-dark",
        "flex flex-col gap-4",
        "animate-upper"
      )}
    >
      {children}
    </div>
  );
}
