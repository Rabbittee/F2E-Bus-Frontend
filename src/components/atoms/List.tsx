import { HasID } from "@/models";
import clsx from "clsx";
import { ReactNode } from "react";

type ListProps<T extends HasID> = {
  title?: ReactNode;
  className?: string;
  classes?: {
    wrapper?: string;
    list?: string;
  };
  items?: T[];
  children?: (item: T) => ReactNode;
};
export function List<T extends HasID>({
  title,
  className,
  items,
  children,
  classes,
}: ListProps<T>) {
  if (!items?.length) return <></>;

  return (
    <div className={clsx("flex flex-col", className, classes?.wrapper)}>
      {title}

      <ul
        className={clsx(
          "flex flex-col gap-2 overflow-auto px-2",
          classes?.list
        )}
      >
        {items.map((item) => (
          <li key={String(item.id)}>{children?.(item)}</li>
        ))}
      </ul>
    </div>
  );
}
