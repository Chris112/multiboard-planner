import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import { MountingOption } from "../../config/mounting";
import { TileOption } from "../../config/tiles";
import { Units } from "../../config/units";

type GlobalStoreValues = {
  units: Units;
  width: number;
  height: number;
  tileSize: TileOption;
  mountType: MountingOption;
};

type GlobalStoreActions = {
  setUnits: (newUnits: Units) => void;
  setWidth: (newWidth: number) => void;
  setHeight: (newHeight: number) => void;
  setTileSize: (newSize: TileOption) => void;
  setMountType: (newMountType: MountingOption) => void;
};

export type GlobalStore = GlobalStoreValues & GlobalStoreActions;

const defaultStore: GlobalStoreValues = {
  height: 1000,
  width: 1000,
  units: "mm",
  tileSize: "8x8",
  mountType: "offsetSnaps",
};

export const globalStore = createStore<GlobalStore>()(
  persist(
    (set) => ({
      ...defaultStore,
      setUnits: (newUnits) => set({ units: newUnits }),
      setWidth: (newWidth) => set({ width: newWidth }),
      setHeight: (newHeight) => set({ height: newHeight }),
      setTileSize: (newSize) => set({ tileSize: newSize }),
      setMountType: (newMountType) => set({ mountType: newMountType }),
    }),
    { name: "multiboard-planner-global-store", version: 1 }
  )
);

export function useGlobalStore<T>(selector: (state: GlobalStore) => T) {
  return useStore(globalStore, useShallow(selector));
}
