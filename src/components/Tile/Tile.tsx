import { useTheme } from "@mui/joy";
import React, { useMemo } from "react";
import {
  SNAP_BORDER_WIDTH,
  SNAP_COLOR,
  SNAP_RADIUS,
  TILE_CELL_SIZE,
  TILE_COLORS,
  TRIANGLE_HEIGHT,
  TRIANGLE_WIDTH,
} from "./config";

export type TileType = "core" | "side" | "corner";

export interface TileProps {
  type: "core" | "side" | "corner";
  row: number;
  col: number;
  /** The number of large horizontal hexagons */
  widthMultiholes: number;
  /** The number of large vertical hexagons */
  heightMultiholes: number;
  borders: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}

function Tile(props: TileProps) {
  const { type, row, col, widthMultiholes, heightMultiholes, borders } = props;

  const theme = useTheme();

  const x = col;
  const y = row;

  const topLeftX = x * TILE_CELL_SIZE;
  const topLeftY = y * TILE_CELL_SIZE;

  const drawSteps = [];
  // Start in top left corner
  drawSteps.push(`M ${topLeftX} ${topLeftY}`);

  // Draw top triangle if not bordering top
  if (!borders.top) {
    drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE / 2 - TRIANGLE_HEIGHT / 2} ${topLeftY}`);
    drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE / 2} ${topLeftY - TRIANGLE_HEIGHT}`);
    drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE / 2 + TRIANGLE_HEIGHT / 2} ${topLeftY}`);
  }

  // Top right
  drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE} ${topLeftY}`);

  // Draw right triangle if not bordering right
  if (!borders.right) {
    drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE} ${topLeftY + TILE_CELL_SIZE / 2 - TRIANGLE_HEIGHT / 2}`);
    drawSteps.push(
      `L ${topLeftX + TILE_CELL_SIZE + TRIANGLE_WIDTH} ${topLeftY + TILE_CELL_SIZE / 2 - TRIANGLE_HEIGHT / 2 + TRIANGLE_HEIGHT / 2}`,
    );
    drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE} ${topLeftY + TILE_CELL_SIZE / 2 + TRIANGLE_HEIGHT / 2}`);
  }

  // Bottom right
  drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE} ${topLeftY + TILE_CELL_SIZE}`);

  // Draw bottom triangle if not bordering bottom
  if (!borders.bottom) {
    drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE / 2 + TRIANGLE_HEIGHT / 2} ${topLeftY + TILE_CELL_SIZE}`);
    drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE / 2} ${topLeftY + TILE_CELL_SIZE - TRIANGLE_HEIGHT}`);
    drawSteps.push(`L ${topLeftX + TILE_CELL_SIZE / 2 - TRIANGLE_HEIGHT / 2} ${topLeftY + TILE_CELL_SIZE}`);
  }

  // Bottom left
  drawSteps.push(`L ${topLeftX} ${topLeftY + TILE_CELL_SIZE}`);

  // Draw left triangle if not bordering left
  if (!borders.left) {
    drawSteps.push(`L ${topLeftX} ${topLeftY + TILE_CELL_SIZE / 2 + TRIANGLE_HEIGHT / 2}`);
    drawSteps.push(`L ${topLeftX + TRIANGLE_WIDTH} ${topLeftY + TILE_CELL_SIZE / 2}`);
    drawSteps.push(`L ${topLeftX} ${topLeftY + TILE_CELL_SIZE / 2 - TRIANGLE_HEIGHT / 2}`);
  }

  // Finish at top left
  drawSteps.push(`L ${topLeftX} ${topLeftY}`);

  // todo: convert this to gradient
  const color = useMemo(() => getTileColor(type), [type]);

  const gradientID = `gradient_${x}_${y}`;
  return (
    <React.Fragment key={`${x}-${y}`}>
      <defs>
        <linearGradient id={gradientID} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: TILE_COLORS[type].startGradient, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: TILE_COLORS[type].endGradient, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientID})`}
        stroke={theme.palette.common.black}
        strokeWidth={0.5}
        d={drawSteps.join(",")}
      />
      {/* Add snap to top left */}
      <circle
        cx={topLeftX + SNAP_RADIUS + SNAP_BORDER_WIDTH}
        cy={topLeftY + SNAP_RADIUS + SNAP_BORDER_WIDTH}
        r={SNAP_RADIUS}
        stroke={SNAP_COLOR}
        strokeWidth={1.2}
        fill="none"
      />
      {/* Add snap to top right */}
      <circle
        cx={topLeftX + TILE_CELL_SIZE - SNAP_RADIUS - SNAP_BORDER_WIDTH}
        cy={topLeftY + SNAP_RADIUS + SNAP_BORDER_WIDTH}
        r={SNAP_RADIUS}
        stroke={SNAP_COLOR}
        strokeWidth={1.2}
        fill="none"
      />
      {/* Add snap to bottom right */}
      <circle
        cx={topLeftX + TILE_CELL_SIZE - SNAP_RADIUS - SNAP_BORDER_WIDTH}
        cy={topLeftY + TILE_CELL_SIZE - SNAP_RADIUS - SNAP_BORDER_WIDTH}
        r={SNAP_RADIUS}
        stroke={SNAP_COLOR}
        strokeWidth={1.2}
        fill="none"
      />
      {/* Add snap to bottom left */}
      <circle
        cx={topLeftX + SNAP_RADIUS + SNAP_BORDER_WIDTH}
        cy={topLeftY + TILE_CELL_SIZE - SNAP_RADIUS - SNAP_BORDER_WIDTH}
        r={SNAP_RADIUS}
        stroke={SNAP_COLOR}
        strokeWidth={1.2}
        fill="none"
      />
      <text
        x={x * TILE_CELL_SIZE + TILE_CELL_SIZE / 2}
        y={y * TILE_CELL_SIZE + TILE_CELL_SIZE / 2}
        fontSize={6}
        fill={theme.palette.text.secondary}
        textAnchor="middle"
        dominantBaseline="middle"
        filter="url(#text-shadow)"
      >
        {`${widthMultiholes} x ${heightMultiholes}`}
      </text>
    </React.Fragment>
  );
}

const getTileColor = (type: TileType) => {
  switch (type) {
    case "core":
      return "red";
    case "side":
      return "green";
    case "corner":
      return "yellow";
  }
};

export default React.memo(Tile);
