"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FiltersState } from '@/types';
import { format } from 'date-fns';

const getInitialDateRange = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  return {
    startDate: format(firstDay, 'yyyy-MM-dd'),
    endDate: format(today, 'yyyy-MM-dd'),
  };
};

interface FiltersStore extends FiltersState {
  setDateRange: (startDate: string, endDate: string) => void;
  setAccount: (account: string) => void;
  setIndustry: (industry: string) => void;
  setState: (state: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set) => ({
      dateRange: getInitialDateRange(),
      account: '',
      industry: '',
      state: '',
      setDateRange: (startDate, endDate) => set({ dateRange: { startDate, endDate } }),
      setAccount: (account) => set({ account }),
      setIndustry: (industry) => set({ industry }),
      setState: (state) => set({ state }),
      resetFilters: () => set({
        dateRange: getInitialDateRange(),
        account: '',
        industry: '',
        state: '',
      }),
    }),
    {
      name: 'filters-storage',
    }
  )
);
