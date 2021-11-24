import clsx from "clsx";
import { Icon } from "@/components";
import { useState } from "react";

export function Modal() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div
      className={clsx(
        "h-screen w-screen fixed left-0 top-0 z-40 ",
        "flex justify-center",
        "transition-all duration-500 ",
        isOpen ? "opacity-100" : "hidden"
      )}
    >
      <div className="w-full h-full  backdrop-filter backdrop-blur-sm absolute top-0 left-0"></div>
      <div className="w-full h-full bg-black opacity-40 absolute top-0 left-0"></div>
      <div className="w-full flex flex-col justify-center items-center">
        <div
          className={clsx(
            "flex flex-col  z-10 rounded-md p-4 items-center gap-6 ",
            "bg-white",
            "animate-fadeIn",
            isOpen ? "animate-fadeIn" : "animate-fadeOut"
          )}
        >
          <span>
            <img className="w-9" src={Icon.LocationActive} alt="Modal Icon" />
          </span>
          <div className="flex flex-col items-center">
            <p className="text-gray-400">為了更好的協助您...</p>
            <p className="text-dark-green font-bold text-lg">
              是否允許網站存取您目前的位置?
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="py-2 px-8 rounded-full border-2 border-blue"
              onClick={() => setIsOpen(false)}
            >
              拒絕
            </button>
            <button className="py-2 px-8 rounded-full bg-blue text-white">
              接受
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
