import { ReactNode } from "react";
import { HasID } from "@/models";

type TabsProps<T> = {
  items?: T[];
  classes?: {
    wrapper?: string;
    list?: string;
    item?: string;
  };
  children?: (item: T) => ReactNode;
};
export function Tabs<T extends HasID>({
  items,
  children,
  classes,
}: TabsProps<T>) {
  return (
    <nav className={classes?.wrapper}>
      <ul className={classes?.list}>
        {items?.map((item) => (
          <li key={String(item.id)} className={classes?.item}>
            {children?.(item)}
          </li>
        ))}
      </ul>
    </nav>
  );
}
