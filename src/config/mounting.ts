type MountingTypeConfig = {
  label: string;
};

export const MountingTypeID = {
  offsetSnaps: "offsetSnaps",
  boltLockConnected: "boltLockConnected",
  boltLockUnconnected: "boltLockUnconnected",
  regularSnaps: "regularSnaps",
  offsetSnapCommand: "offsetSnapCommand",
  offsetSnapVHB: "offsetSnapVHB",
  doubleSidedBoard: "doubleSidedBoard",
} as const;
export type MountingTypeID = keyof typeof MountingTypeID;

export const mountingTypeConfig = {
  offsetSnaps: {
    label: "Offset Snaps - Screw-On Mount",
  },
  boltLockConnected: {
    label: "Bolt-Lock - Screw-On Mount (Connected Board)",
  },
  boltLockUnconnected: {
    label: "Bolt-Lock - Screw-On Mount (Unconnected Board)",
  },
  regularSnaps: {
    label: "Regular Snaps - Screw-On Mount (Flush)",
  },
  offsetSnapCommand: {
    label: "Offset Snap - Command Strip Mounts",
  },
  offsetSnapVHB: {
    label: "Offset Snap - VHB Tape Mounts",
  },
  doubleSidedBoard: {
    label: "Double-Sided Board",
  },
} as const satisfies Record<MountingTypeID, MountingTypeConfig>;

export type MountingOption = keyof typeof mountingTypeConfig;
