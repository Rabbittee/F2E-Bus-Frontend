import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
};
export function Card({ children }: CardProps) {
  return <div className="bg-white rounded-md w-full p-4">{children}</div>;
}
