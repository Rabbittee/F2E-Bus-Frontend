import { Card, MapFigure, NearBy } from "@/components";

export function Result() {
  return (
    <div className="relative pt-8 flex-1 flex">
      <Card>
        <MapFigure />
        <NearBy />
      </Card>
    </div>
  );
}
