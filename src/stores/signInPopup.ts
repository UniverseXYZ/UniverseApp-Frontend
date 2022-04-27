import create from "zustand";

type ISignInPopupStore = {
  // Getters
  showNotAuthenticatedPopup: boolean;
  message: string;
  onClose: () => void;
  // Setters
  setShowNotAuthenticatedPopup: (showNotAuthenticatedPopup: boolean) => void;
  setMessage: (message: string) => void;
  setOnClose: (onClose: () => void) => void;
};

export const useSignInPopupStore = create<ISignInPopupStore>((set, get) => ({
  showNotAuthenticatedPopup: false,
  message: "You have to be signed in.",
  onClose: () => {
    set((state) => ({
      ...state,
      showNotAuthenticatedPopup: false,
    }));
  },
  setShowNotAuthenticatedPopup: (showNotAuthenticatedPopup) => {
    set((state) => ({
      ...state,
      showNotAuthenticatedPopup,
    }));
  },
  setMessage: (message) => {
    set((state) => ({
      ...state,
      message,
    }));
  },
  setOnClose: (onClose) => {
    set((state) => ({
      ...state,
      onClose,
    }));
  },
}));
