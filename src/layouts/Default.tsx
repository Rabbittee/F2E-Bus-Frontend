import { ReactNode } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

function Background() {
  return <div className="bg-map" />;
}

function ResultBackground() {
  return <div className="bg-result" />;
}

type LayoutProps = {
  children?: ReactNode;
};
export function Default({ children }: LayoutProps) {
  const location = useLocation<string>();
  return (
    <>
      {location.pathname === "/" ? <Background /> : <ResultBackground />}

      <main className={clsx("h-screen", "flex flex-col justify-between gap-2")}>
        {children}
      </main>
    </>
  );
}
