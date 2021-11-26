import { ReactNode, MouseEvent } from "react";
import { motion, MotionProps } from "framer-motion";

import { Layer } from "@/components/atoms";

type Props = MotionProps & {
  children?: ReactNode;
  background?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};
export function Modal({ children, background, onClick, ...props }: Props) {
  return (
    <Layer background={background} onClick={onClick}>
      <motion.div
        className="flex flex-col p-4 bg-white rounded-2xl shadow"
        {...props}
      >
        {children}
      </motion.div>
    </Layer>
  );
}
