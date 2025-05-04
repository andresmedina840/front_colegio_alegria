// store/uiStore.ts
import { create } from "zustand";

type UIState = {
  isLoading: boolean;
  loaderMessage?: string;
  setIsLoading: (value: boolean, message?: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  loaderMessage: undefined,
  setIsLoading: (value, message) =>
    set({ isLoading: value, loaderMessage: message }),
}));
