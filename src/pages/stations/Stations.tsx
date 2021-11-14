import { Box, MapFigure, Stops } from "@/components";

export function Stations() {
  return (
    <div className="relative pt-8 flex-1 flex w-3">
      <Box>
        <MapFigure />
        <Stops />
      </Box>
    </div>
  );
}
