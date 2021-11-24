import { Icon } from "@/components";

export function ClickToTopButton() {
  return (
    <div className="fixed w-12 bottom-3 right-3 lg:hidden z-10">
      <a href="#root" className="text-light-blue opacity-40">
        <Icon.ClickToTop />
      </a>
    </div>
  );
}
