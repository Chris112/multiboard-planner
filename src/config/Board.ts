import { TileOption, tileSizeConfig } from "./tiles";
import { Units } from "./units";

/** Multiboard hole sizes defined at https://www.multiboard.io/knowledge-hub/tiles  */
export const MULTIHOLE_SIZE_MM = 25;
export const MULTIHOLE_SIZE_INCHES = 0.984252;

export class Board {
  private tileSize: TileOption;
  private width: number;
  private height: number;
  private units: Units;

  constructor({
    tileSize,
    width,
    height,
    units,
  }: {
    tileSize: TileOption;
    width: number;
    height: number;
    units: Units;
  }) {
    this.tileSize = tileSize;
    this.width = width;
    this.height = height;
    this.units = units;
  }

  /**
   * Calculate the number of core tiles required for the multiboard
   * = (xTiles - 1) * (yTiles - 1)
   */
  get coreTiles(): number {
    return Math.max((this.xTiles - 1) * (this.yTiles - 1), 0);
  }

  /**
   * Calculate the number of side tiles required for the multiboard
   * = xTiles - 1 + yTiles - 1
   */
  get sideTiles(): number {
    return Math.max(this.xTiles - 1 + this.yTiles - 1, 0);
  }

  /**
   * Calculate the number of corner tiles required for the multiboard
   * = 1 when xTiles and yTiles are greater than 1
   */
  get cornerTiles(): number {
    if (this.xTiles > 1 && this.yTiles > 1) {
      return 1;
    } else {
      return 0;
    }
  }

  get totalTiles(): number {
    return this.coreTiles + this.sideTiles + this.cornerTiles;
  }

  /**
   * Calculate the number of tiles required in the x direction
   * = Floor(board_width / tile_width)
   */
  get xTiles(): number {
    const singleTileWidth = this.tileWidth;
    if (singleTileWidth === 0) return 0;
    return Math.floor(this.width / singleTileWidth);
  }

  /**
   * Calculate the number of tiles required in the x direction
   * = Floor(board_width / tile_width)
   */
  get yTiles(): number {
    const singleTileHeight = this.tileHeight;
    if (singleTileHeight === 0) return 0;
    return Math.floor(this.height / singleTileHeight);
  }

  // Calculate the single tile width based on the units
  get tileWidth(): number {
    const tileConfig = tileSizeConfig[this.tileSize];
    switch (this.units) {
      case "mm":
        return tileConfig.x * MULTIHOLE_SIZE_MM;
      case "inch":
        return tileConfig.x * MULTIHOLE_SIZE_INCHES;
    }
  }

  // Calculate the single tile height based on the units
  get tileHeight(): number {
    const tileConfig = tileSizeConfig[this.tileSize];
    switch (this.units) {
      case "mm":
        return tileConfig.y * MULTIHOLE_SIZE_MM;
      case "inch":
        return tileConfig.y * MULTIHOLE_SIZE_INCHES;
    }
  }

  get unusedWidth(): number {
    return this.width - this.xTiles * this.tileWidth;
  }

  get unusedHeight(): number {
    return this.height - this.yTiles * this.tileHeight;
  }
}
