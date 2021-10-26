import { ReactNode } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

function Background() {
  return <div className="bg-map" />;
}

type LayoutProps = {
  children?: ReactNode;
};
export function Default({ children }: LayoutProps) {
  const location = useLocation<string>();
  return (
    <>
      {location.pathname !== "/result" && <Background />}

      <main className={clsx("h-screen", "flex flex-col justify-center")}>
        {children}
      </main>
    </>
  );
}
