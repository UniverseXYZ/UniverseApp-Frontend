import create from "zustand";

interface IErrorStore {
  // Getters
  showError: boolean;
  errorTitle: string;
  errorBody: string;

  // Setters
  setShowError: (showError: boolean) => void;
  setErrorTitle: (errorTitle: string) => void;
  setErrorBody: (errorBody: string) => void;

  // Helpers
  closeError: () => void;
}

export const useErrorStore = create<IErrorStore>((set) => ({
  showError: false,
  errorBody: '',
  errorTitle: '',
  setShowError: (showError) => {
    set(state => ({
      ...state,
      showError
    }))
  },
  setErrorBody: (errorBody) => {
    set(state => ({
      ...state,
      errorBody
    }))
  },
  setErrorTitle: (errorTitle) => {
    set(state => ({
      ...state,
      errorTitle
    }))
  },
  closeError: () => {
    set(state => ({
      ...state,
      showError: false,
      errorBody: '',
      errorTitle: '',
    }))
  }
}))