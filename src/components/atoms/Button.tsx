import clsx from "clsx";
import { cloneElement, isValidElement, ReactNode } from "react";
import invariant from "tiny-invariant";

Button.Variant = {
  "dark-green-contained":
    "border-dark-green bg-dark-green text-white active:bg-blue active:border-blue",
  "blue-outlined": "border-current text-blue active:text-light-blue",
  "blue-contained":
    "border-blue bg-blue text-white active:bg-light-blue active:border-light-blue",
};

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  variant: keyof typeof Button.Variant;
};
export function Button({ variant, children, disabled }: Props) {
  invariant(isValidElement(children), "should be valid react element");

  return cloneElement(children, {
    className: clsx(
      "py-2 rounded-full border-2",
      "text-center text-lg font-bold tracking-widest",
      "transition-all duration-300 ease-out-circ",
      "disabled:opacity-50",
      Button.Variant[variant],
      children.props.className
    ),
    disabled,
  });
}
