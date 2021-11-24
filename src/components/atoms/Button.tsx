import clsx from "clsx";
import { cloneElement, isValidElement, ReactNode } from "react";
import invariant from "tiny-invariant";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
};
export function Button({ children, disabled }: Props) {
  invariant(isValidElement(children), "should be valid react element");

  return cloneElement(children, {
    className: clsx(
      "bg-dark-green text-white text-center rounded-full",
      "py-2 text-lg font-bold tracking-widest",
      "transition-all duration-300 ease-out-circ",
      "active:bg-blue",
      "disabled:opacity-50"
    ),
    disabled,
  });
}
