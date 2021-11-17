import { Icon, Back } from "@/components";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Primitive } from "utility-types";

type DetailProps = {
  title?: Primitive;
  className?: string;
};
export function HasBack({ title, className }: DetailProps) {
  return (
    <div
      className={clsx(
        "w-full h-1/2 px-7 gap-4",
        "flex justify-between items-center",
        className
      )}
    >
      <Back>
        <Icon.Back className="p-1.5 w-6" />
      </Back>

      <h2 className="text-2xl font-bold w-full">{title}</h2>

      <Link to="/">
        <Icon.Close className="w-6" />
      </Link>
    </div>
  );
}
