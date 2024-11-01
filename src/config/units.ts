type UnitConfig = {
  label: string;
};

export const unitID = {
  mm: "mm",
  inch: "inch",
} as const;

export type UnitID = keyof typeof unitID;

export const unitConfig = {
  mm: {
    label: "mm",
  },
  inch: {
    label: "inch",
  },
} as const satisfies Record<UnitID, UnitConfig>;

export type Units = keyof typeof unitConfig;
