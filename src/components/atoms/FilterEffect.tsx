import clsx from "clsx";
import { motion, MotionProps } from "framer-motion";

type GlassmorphismProps = MotionProps & {
  className?: string;
};
export function Glassmorphism({ className, ...props }: GlassmorphismProps) {
  return (
    <motion.div
      className={clsx("backdrop-filter backdrop-blur-sm", className)}
      {...props}
    />
  );
}
