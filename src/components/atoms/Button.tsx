import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
};
export function Button(props: Props) {
  return (
    <button
      className={clsx(
        "bg-dark-green text-white rounded-full",
        "py-2 text-lg font-bold tracking-widest",
        "transition-all duration-300 ease-out-circ",
        "active:bg-blue",
        "disabled:opacity-50"
      )}
      {...props}
    />
  );
}
