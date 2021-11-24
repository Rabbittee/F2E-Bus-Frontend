import { Icon } from "@/components";

export function UpperButton() {
  return (
    <div className="fixed w-12 bottom-3 right-3 lg:hidden">
      <a href="#root" className="text-light-blue">
        <Icon.UpperArrow />
      </a>
    </div>
  );
}
