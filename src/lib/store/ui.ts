"use client";

import { create } from "zustand";

/** Transient UI state shared across the shell (not persisted). */
interface UiState {
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
}

export const useUi = create<UiState>()((set) => ({
  paletteOpen: false,
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  navOpen: false,
  setNavOpen: (navOpen) => set({ navOpen }),
}));
