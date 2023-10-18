import { create } from 'zustand';

const useStore = create((set) => ({
  contractStartDate: null,
  contractEndDate: null,
  contractStartMaxDate: null,
  contractEndMinDate: null,
  editErrors: null,
  nextContractStartDate: null,
  activeContract: null,
  activeStaff: null,
  setActiveContract: (contract) =>
    set((state) => ({
      activeContract: contract,
    })),
  setActiveStaff: (staff) =>
    set((state) => ({
      activeStaff: staff,
    })),
  setNextContractStartDate: (date) =>
    set((state) => ({
      nextContractStartDate: date,
    })),
  setEditErrors: (error) =>
    set((state) => ({
      editErrors: error,
    })),
  setContractStartDate: (date) =>
    set((state) => ({
      contractStartDate: date,
    })),
  setContractEndDate: (date) =>
    set((state) => ({
      contractEndDate: date,
      contractStartMaxDate: !state.contractStartDate
        ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
        : null,
    })),
  setContractStartMaxDate: (date) =>
    set({
      contractStartMaxDate: new Date(
        new Date(date).getTime() - 24 * 60 * 60 * 1000,
      ),
    }),
  setContractEndMinDate: (date) =>
    set({
      contractEndMinDate: new Date(
        new Date(date).getTime() + 24 * 60 * 60 * 1000,
      ),
    }),
}));

export default useStore;
