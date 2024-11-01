type TileConfig = {
  label: string;
  /** The number of big holes (multiholes) across the horizontal x axis */
  x: number;
  /** The number of big holes (multiholes) across the vertical y axis */
  y: number;
};

export const tileSizeConfig = {
  "16x16": {
    label: "16x16",
    x: 16,
    y: 16,
  },
  "15x15": {
    label: "15x15",
    x: 15,
    y: 15,
  },
  "14x14": {
    label: "14x14",
    x: 14,
    y: 14,
  },
  "13x13": {
    label: "13x13",
    x: 13,
    y: 13,
  },
  "12x12": {
    label: "12x12",
    x: 12,
    y: 12,
  },
  "11x11": {
    label: "11x11",
    x: 11,
    y: 11,
  },
  "10x10": {
    label: "10x10",
    x: 10,
    y: 10,
  },
  "9x9": {
    label: "9x9",
    x: 9,
    y: 9,
  },
  "8x8": {
    label: "8x8",
    x: 8,
    y: 8,
  },
  "7x7": {
    label: "7x7",
    x: 7,
    y: 7,
  },
  "6x6": {
    label: "6x6",
    x: 6,
    y: 6,
  },
  "5x5": {
    label: "5x5",
    x: 5,
    y: 5,
  },
  "4x4": {
    label: "4x4",
    x: 4,
    y: 4,
  },
  "3x3": {
    label: "3x3",
    x: 3,
    y: 3,
  },
  "2x2": {
    label: "2x2",
    x: 2,
    y: 2,
  },
} as const satisfies Record<string, TileConfig>;

export type TileOption = keyof typeof tileSizeConfig;
