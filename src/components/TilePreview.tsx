import { Box, Grid, Sheet, Stack, styled, useTheme } from "@mui/joy";
import { useGlobalStore } from "../lib/globalStore/globalStore";
import { Units } from "../config/units";
import { Board, MULTIHOLE_SIZE_INCHES, MULTIHOLE_SIZE_MM } from "../config/Board";
import React from "react";
import Tile from "./Tile";
import { TILE_CELL_SIZE } from "./Tile/config";
import { TileProps } from "./Tile/Tile";

function TilePreview() {
  const { units, width, height, tileSize } = useGlobalStore(({ units, width, height, tileSize }) => ({
    units,
    width,
    height,
    tileSize,
  }));

  const board = new Board({ height, width, units, tileSize });

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${board.xTiles}, 1fr)`,
    gridTemplateRows: `repeat(${board.yTiles}, 1fr)`,
    gap: "4px", // Adjusts spacing between squares, optional
    width: "100%", // Optional width control
    height: "100%", // Optional height control
  };

  const totalWidth = Math.max(
    board.xTiles * TILE_CELL_SIZE,
    // So tiles don't look too large, minimum width is 5 tiles
    TILE_CELL_SIZE * 8,
  );
  console.log("totalWidth: %o", totalWidth);
  // const totalHeight = Math.max(board.yTiles * TILE_CELL_SIZE, TILE_CELL_SIZE * 3);
  const totalHeight = board.yTiles * TILE_CELL_SIZE;
  console.log("totalWidth: %o", totalWidth);

  const theme = useTheme();
  return (
    <Sheet>
      <Grid container>
        <Grid xs={12}>
          <Stack spacing={1}>
            <div>{`Number of tiles required: ${board.xTiles} x ${board.yTiles}`}</div>
            <div>{`Single tile size: ${board.tileWidth} x ${board.tileHeight} ${units}`}</div>
            <div>{`Core tiles: ${board.coreTiles}`}</div>
            <div>{`Side tiles: ${board.sideTiles}`}</div>
            <div>{`Corner tiles: ${board.cornerTiles}`}</div>
            <div>{`Total tiles: ${board.totalTiles}`}</div>
            <div>{`Unused width: ${board.unusedWidth} ${units}`}</div>
            <div>{`Unused height: ${board.unusedHeight} ${units}`}</div>
          </Stack>
        </Grid>
        <Grid xs={12}>
          <svg width="100%" height="100%" viewBox={`0 0 ${totalWidth} ${totalHeight}`}>
            <filter id="text-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feOffset result="offOut" in="SourceAlpha" dx="0.2" dy="0.2" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0.3" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            {Array.from({ length: board.xTiles * board.yTiles }).map((_, index) => {
              console.log("Rendering tile %o", index);
              const row = Math.floor(index / board.xTiles);
              const col = index % board.xTiles;

              // Tile must know if it's on the edge of the board to draw the correct interlocking triangles
              const borders: TileProps["borders"] = {
                top: row === 0,
                right: col === board.xTiles - 1,
                bottom: row === board.yTiles - 1,
                left: col === 0,
              };

              // Top right tile is a corner tile
              // Top row and right column are side tiles (excluding top right)
              // Everything else is a core tile
              const tileType =
                row === 0 && col !== board.xTiles - 1
                  ? "side"
                  : row !== 0 && col === board.xTiles - 1
                    ? "side"
                    : row === 0 && col === board.xTiles - 1
                      ? "corner"
                      : "core";

              return (
                <Tile
                  key={index}
                  type={tileType}
                  row={row}
                  col={col}
                  widthMultiholes={board.tileWidth}
                  heightMultiholes={board.tileHeight}
                  borders={borders}
                />
              );
            })}
          </svg>
        </Grid>
        <Grid>
          {/* <div style={containerStyle}>
            {Array.from({ length: board.xTiles * board.yTiles }).map(
              (_, index) => {
                const x = index % board.xTiles;
                const y = Math.floor(index / board.xTiles);
                const row = Math.floor(index / board.xTiles);
                const col = index % board.xTiles;
                console.log("RENDERING TILE %o", {
                  x,
                  y,
                  row,
                  col,
                });

                if (
                  // On the first row of every column excluding the last
                  (row === 0 && col !== board.xTiles - 1) ||
                  // On the last column of every row excluding the first
                  (row !== 0 && col === board.xTiles - 1)
                ) {
                  return <Tile key={index} type="side" />;
                }

                if (
                  // On the first row and last column (top right corner)
                  row === 0 &&
                  col === board.xTiles - 1
                ) {
                  return <Tile key={index} type="corner" />;
                }

                // Core tile everywhere else
                return <Tile key={index} type="core" />;
              }
            )}
          </div> */}
        </Grid>
      </Grid>
    </Sheet>
  );
}

// interface TileProps {
//   type: "core" | "side" | "corner";
// }
// function Tile(props: TileProps) {
//   const { type } = props;
//   return (
//     <Box
//       sx={{
//         backgroundColor: type === "core" ? "red" : type === "side" ? "blue" : "green",
//         color: "white",
//         padding: 2,
//         borderRadius: 1,
//         // TODO: Make this dynamic like the multiboard generator
//         // TODO: Or do some scroll bars???
//         // width: "100px",
//         // height: "100px",
//         aspectRatio: "1", // Ensures it stays square,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       2 x 2
//     </Box>
//   );
// }

export default TilePreview;
