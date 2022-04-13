import create from "zustand"

type ILoadingStore = {
  // Getters
  showLoading: boolean;
  loadingTitle: string;
  loadingBody: string;
  transactions: string[];

  // Setters
  setShowLoading: (showLoading: boolean) => void;
  setLoadingTitle: (loadingTitle: string) => void;
  setLoadingBody: (loadingBody: string) => void;
  setTransactions: (transactions: string[]) => void;

  // Helpers
  closeLoading: () => void;
}

const DEFAULT_HEADING = 'Please wait for the transaction to complete ...';
const DEFAULT_BODY = '';

export const useLoadingStore = create<ILoadingStore>((set, get) => ({
  showLoading: false,
  loadingTitle: DEFAULT_HEADING,
  loadingBody: DEFAULT_BODY,
  transactions: [],
  setShowLoading: (showLoading) => {
    set(state => ({
      ...state,
      showLoading
    }))
  },
  setLoadingTitle: (loadingTitle) => {
    set(state => ({
      ...state,
      loadingTitle
    }))
  },
  setLoadingBody: (loadingBody) => {
    set(state => ({
      ...state,
      loadingBody
    }))
  },
  setTransactions: (transactions) => {
    set(state => ({
      ...state,
      transactions
    }))
  },
  closeLoading: () => {
    set(state => ({
      ...state,
      showLoading: false,
      loadingTitle: DEFAULT_HEADING,
      loadingBody: DEFAULT_BODY,
      transactions: []
    }))
  }
}))