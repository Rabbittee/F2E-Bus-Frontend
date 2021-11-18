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
        "w-full px-7 gap-4",
        "flex justify-between items-center",
        className
      )}
    >
      <Back>
        <Icon.Back className="w-10" />
      </Back>

      <h1 className="text-3xl font-bold w-full mb-1">{title}</h1>

      <Link to="/">
        <Icon.Close className="w-6" />
      </Link>
    </div>
  );
}
