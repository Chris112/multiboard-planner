import { TileType } from "./Tile";

// Configuration for tile sizes
export const TILE_CELL_SIZE = 50;
export const TRIANGLE_WIDTH = 5;
export const TRIANGLE_HEIGHT = 6;
export const SNAP_RADIUS = 2;
export const SNAP_COLOR = "#d0d0d0";
export const SNAP_BORDER_WIDTH = 0.75;
export const TILE_COLORS: Record<TileType, { startGradient: string; endGradient: string }> = {
  core: {
    startGradient: "rgb(219, 83, 96)",
    endGradient: "rgb(196, 60, 85)",
  },
  side: {
    startGradient: "rgb(127, 184, 114)",
    endGradient: "rgb(110, 162, 116)",
  },
  corner: {
    startGradient: "rgb(253, 204, 135)",
    endGradient: "rgb(250, 181, 119)",
  },
};
