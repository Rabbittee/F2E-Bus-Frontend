import { Icon } from "@/components";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function ClickToTopButton() {
  const [isVisable, setIsVisable] = useState<Boolean>(false);

  const toggleVisibility = () => {
    scrollY > 300 ? setIsVisable(true) : setIsVisable(false);
  };

  const scrollToTop = () => {
    scroll({
      top: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.addEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div
      className={clsx(
        "fixed w-12 bottom-3 right-3 z-10 duration-300 transition-all",
        !isVisable && "pointer-events-none opacity-0"
      )}
    >
      <a onClick={scrollToTop} className="text-light-blue opacity-40">
        <Icon.ClickToTop />
      </a>
    </div>
  );
}
