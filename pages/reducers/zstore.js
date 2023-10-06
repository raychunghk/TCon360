import create from 'zustand';

const useStore = create((set) => ({
  contractStartDate: null,
  contractEndDate: null,
  contractStartMaxDate: null,
  contractEndMinDate: null,
  setContractStartDate: (date) =>
    set((state) => ({
      contractStartDate: date,
  
    })),
  setContractEndDate:  (date) =>
    set((state) => ({
      contractEndDate: date,
      contractStartMaxDate: !state.contractStartDate
        ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
        : null,
    })),
  setContractStartMaxDate: (date) => set({ contractStartMaxDate: new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000)  }),
  setContractEndMinDate: (date) => set({ contractEndMinDate: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) }),
}));

export default useStore;
