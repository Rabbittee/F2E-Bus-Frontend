import { motion } from "framer-motion";
import { Icon, Modal, Glassmorphism } from "@/components";

type LoadingProps = {
  textDelay?: number;
  children?: string;
};
export function Loading({ textDelay = 0, children = "loading" }: LoadingProps) {
  return (
    <Modal
      background={
        <Glassmorphism
          className="brightness-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      }
    >
      <div className="relative">
        <motion.div
          animate={{
            y: [-4, 0],
            scaleX: [1, 1.05],
            scaleY: [1, 0.95],
            //
          }}
          transition={{
            type: "keyframes",
            times: [0, 0.2],
            duration: 0.2,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Icon.Bus className="w-32" />
        </motion.div>

        <motion.div
          className="absolute flex -space-x-1"
          style={{ bottom: `${8}px`, right: `98%` }}
          animate={{ x: [0, -2], opacity: [0, 1] }}
          transition={{ repeat: Infinity }}
        >
          <Icon.Air className="w-8" />
        </motion.div>
      </div>

      <strong className="text-dark-green text-2xl text-center flex justify-center relative">
        {children.split("").map((char, i) => (
          <motion.div
            key={i}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{
              type: "tween",
              ease: "backOut",
              duration: 0.2,
              delay: textDelay + i * 0.5,
            }}
          >
            <span>{char}</span>
          </motion.div>
        ))}

        <div>
          {"...".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                type: "tween",
                ease: "circOut",
                duration: 1,
                delay: textDelay + children.length * 0.5 + i * (1 / 3),
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </strong>
    </Modal>
  );
}
