import clsx from "clsx";
import {
  PropsWithChildren,
  cloneElement,
  isValidElement,
  ReactNode,
} from "react";

type WithIconProps = PropsWithChildren<{
  icon?: ReactNode;
  className?: string;
}>;
function WithIcon({ icon, children, className }: WithIconProps) {
  return (
    <div
      className={clsx(
        "border-b border-blue p-2 flex gap-2 items-center",
        className
      )}
    >
      {isValidElement(icon) && cloneElement(icon, { className: "flex-[1]" })}

      {isValidElement(children) &&
        cloneElement(children, {
          className: clsx("flex-[11]", children.props.className),
        })}
    </div>
  );
}

type WithTitleProps = PropsWithChildren<{
  id?: string;
  title?: ReactNode;
  classes?: {
    wrapper?: string;
    title?: string;
    content?: string;
  };
}>;
function WithTitle({ id, title, classes, children }: WithTitleProps) {
  return (
    <div
      className={clsx(
        "flex flex-col rounded-xl overflow-hidden shadow",
        classes?.wrapper
      )}
      id={id}
    >
      <header className={clsx("text-white p-3", classes?.title)}>
        {title}
      </header>

      <div className={clsx("p-3 bg-white", classes?.content)}>{children}</div>
    </div>
  );
}

type StopProps = PropsWithChildren<{
  type: "default" | "arrive" | "disable";
  id?: string;
  name: string;
}>;
function Stop({ id, name, type, children }: StopProps) {
  return (
    <div
      id={id}
      className={clsx(
        "rounded-full py-2 px-4",
        "flex justify-between items-center",

        type === "disable" && "bg-gray-400 text-gray-200",
        type === "arrive" && "bg-blue text-white",
        type === "default" && "bg-gray-200 text-dark-green"
      )}
    >
      <strong className="text-lg">{name}</strong>

      <span>{children}</span>
    </div>
  );
}

export const Item = {
  WithIcon,
  WithTitle,
  Stop,
};
