import clsx from "clsx";
import { ReactNode } from "react";

type BadgeProps = {
  children?: ReactNode;
  className?: string;
  active?: boolean;
};
export function Badge({ children, active, className }: BadgeProps) {
  return (
    <div
      className={clsx(
        "rounded-full px-3 py-1",
        active ? "bg-blue" : "bg-gray-400",
        className
      )}
    >
      {children}
    </div>
  );
}
