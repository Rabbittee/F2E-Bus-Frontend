import { Box, NearBy, MapFigure } from "@/components";

export function Result() {
  return (
    <div className="relative pt-8 flex-1 flex">
      <Box>
        <MapFigure />
        <NearBy />
      </Box>
    </div>
  );
}
