import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children?: ReactNode;
};
export function Button({ children, className }: ButtonProps) {
  return (
    <button className={clsx("bg-cyan-dark text-white rounded-full", className)}>
      {children}
    </button>
  );
}
