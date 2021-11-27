import clsx from "clsx";
import { Layer } from ".";
import { Icon } from "./Icon";
import { motion } from "framer-motion";

type ToastProps = {
  type: "warning" | "error" | "info" | "success";
  message?: string;
  onClose?: () => void;
};

export function Toast({ type, message, onClose }: ToastProps) {
  return (
    <Layer placement="bottom" classes={{ content: "w-screen m-8" }}>
      <motion.div
        className={clsx(
          "flex gap-2",
          "rounded-xl py-2 px-4",
          "text-white",
          type === "warning" && "bg-orange",
          type === "error" && "bg-red-500",
          type === "info" && "bg-orange",
          type === "success" && "bg-orange",
          "shadow-md"
        )}
        initial={{ y: "200%" }}
        animate={{ y: "0%" }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {type === "error" && <Icon.Alert className="w-6" />}
        {type === "warning" && <Icon.Alert className="w-6" />}

        <span>{message}</span>

        <button onClick={onClose} className="ml-auto">
          <Icon.Close className="w-4" />
        </button>
      </motion.div>
    </Layer>
  );
}
