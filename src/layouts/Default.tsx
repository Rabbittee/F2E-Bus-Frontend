import { ReactNode } from "react";
import clsx from "clsx";

function Background() {
  return <div className="bg-map" />;
}

type LayoutProps = {
  children?: ReactNode;
};
export function Default({ children }: LayoutProps) {
  return (
    <>
      <Background />

      <main
        className={clsx(
          "h-screen",
          "flex flex-col justify-center",
          "gap-10 px-7"
        )}
      >
        {children}
      </main>
    </>
  );
}
