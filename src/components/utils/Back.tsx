import { cloneElement, isValidElement, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import invariant from "tiny-invariant";

type BackProps = {
  children?: ReactNode;
  delta?: number;
};
export function Back({ children, delta = -1 }: BackProps) {
  invariant(isValidElement(children), "Should be valid react element");

  const navigate = useNavigate();

  return cloneElement(children, {
    onClick: () => navigate(delta),
  });
}
