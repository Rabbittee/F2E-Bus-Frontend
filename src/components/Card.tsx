import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
};
export function Card({ children }: CardProps) {
  return <div className=" rounded-md w-full ">{children}</div>;
}
