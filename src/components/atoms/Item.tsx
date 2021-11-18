import { cloneElement, isValidElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
  icon: ReactNode;
};
export function Item({ icon, children }: Props) {
  return (
    <div className="border-b border-blue p-2 flex gap-2">
      {isValidElement(icon) && cloneElement(icon, { className: "flex-[1]" })}

      {isValidElement(children) &&
        cloneElement(children, { className: "flex-[11]" })}
    </div>
  );
}
