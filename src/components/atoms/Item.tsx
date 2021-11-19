import clsx from "clsx";
import {
  PropsWithChildren,
  cloneElement,
  isValidElement,
  ReactNode,
} from "react";

type WithIconProps = PropsWithChildren<{
  icon?: ReactNode;
}>;
function WithIcon({ icon, children }: WithIconProps) {
  return (
    <div className="border-b border-blue p-2 flex gap-2 items-center">
      {isValidElement(icon) && cloneElement(icon, { className: "flex-[1]" })}

      {isValidElement(children) &&
        cloneElement(children, {
          className: clsx("flex-[11]", children.props.className),
        })}
    </div>
  );
}

type WithTitleProps = PropsWithChildren<{
  title?: ReactNode;
}>;
function WithTitle({ title, children }: WithTitleProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow">
      <header className="bg-orange text-white p-3">{title}</header>

      <div className="p-3">{children}</div>
    </div>
  );
}

export const Item = {
  WithIcon,
  WithTitle,
};
