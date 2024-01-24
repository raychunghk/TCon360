import { create } from 'zustand';

const useUIStore = create((set) => ({
  drawerOpened: false,
  isEventUpdated: false,
  siteTitle: 'TCon360',
  setIsEventUpdated: (evtupdated) =>
    set((state) => ({
      isEventUpdated: evtupdated,
    })),
  setDrawerOpen: () =>
    set(() => ({
      drawerOpened: true,
    })),
  setDrawerClose: () =>
    set(() => ({
      drawerOpened: false,
    })),
  clearAllState: () =>
    set(() => ({
      drawerOpened: false,

      isEventUpdated: false,
    })),
}));

export default useUIStore;
