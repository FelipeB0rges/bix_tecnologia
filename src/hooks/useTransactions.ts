"use client";

import { useMemo, useEffect, useState } from 'react';
import { Transaction, SummaryData } from '@/types';
import transactions from '../data/transactions.json';
import { useFiltersStore } from '@/stores/filtersStore';

export const useTransactions = () => {
  const { dateRange, account, industry, state } = useFiltersStore();
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      console.error("Falha ao carregar transações:", transactions);
      setTransactionsData([]);
      return;
    }

    // Normaliza amount como string e date como number (timestamp)
    const processed = (transactions as Transaction[]).map(t => ({
      ...t,
      amount: t.amount.toString(),
      date: typeof t.date === 'number'
        ? t.date
        : new Date(t.date).getTime()
    }));

    // Calcula menor e maior timestamp para inicializar o filtro de data
    const timestamps = processed.map(t => t.date as number);
    const minDate = Math.min(...timestamps);
    const maxDate = Math.max(...timestamps);

    // Ajusta o dateRange do store para cobrir todo o dataset inicial
    useFiltersStore.setState({
      dateRange: { startDate: minDate, endDate: maxDate }
    });

    setTransactionsData(processed);
    setDataLoaded(true);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactionsData.filter(transaction => {
      const txDate = typeof transaction.date === 'number'
        ? transaction.date
        : new Date(transaction.date).getTime();

      const inRange = txDate >= dateRange.startDate && txDate <= dateRange.endDate;
      const byAccount  = !account  || transaction.account  === account;
      const byIndustry = !industry || transaction.industry === industry;
      const byState    = !state    || transaction.state    === state;

      return inRange && byAccount && byIndustry && byState;
    });
  }, [transactionsData, dateRange, account, industry, state]);

  const summaryData = useMemo<SummaryData>(() => {
    let income = 0, expenses = 0, pendingCount = 0;

    filteredTransactions.forEach(({ amount }) => {
      const val = parseFloat(amount);
      if (amount === "0") {
        pendingCount++;
      } else if (val > 0) {
        income += val;
      } else if (val < 0) {
        expenses += Math.abs(val);
      }
    });

    return { income, expenses, balance: income - expenses, pendingCount };
  }, [filteredTransactions]);

  const uniqueOptions = useMemo(() => ({
    accounts:   [...new Set(transactionsData.map(t => t.account))],
    industries: [...new Set(transactionsData.map(t => t.industry))],
    states:     [...new Set(transactionsData.map(t => t.state))],
  }), [transactionsData]);

  const groupedByMonth = useMemo(() => {
    if (!dataLoaded) return [];

    const months: Record<string, { income: number; expenses: number }> = {};

    filteredTransactions.forEach(({ date, amount }) => {
      const val = parseFloat(amount);
      if (isNaN(val) || val === 0) return;

      const dt = new Date(typeof date === 'number' ? date : new Date(date).getTime());
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;

      months[key] = months[key] || { income: 0, expenses: 0 };
      if (val > 0) months[key].income += val;
      else           months[key].expenses += Math.abs(val);
    });

    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, vals]) => ({ month, ...vals }));
  }, [filteredTransactions, dataLoaded]);

  const balanceOverTime = useMemo(() => {
    if (!dataLoaded) return [];

    const sorted = [...filteredTransactions].sort((a, b) => {
      const da = typeof a.date === 'number' ? a.date : new Date(a.date).getTime();
      const db = typeof b.date === 'number' ? b.date : new Date(b.date).getTime();
      return da - db;
    });

    let running = 0;
    return sorted.map(({ date, amount }) => {
      const val = parseFloat(amount);
      running += val;
      const dt = new Date(typeof date === 'number' ? date : new Date(date).getTime());
      return { date: dt.toISOString().split('T')[0], balance: running };
    });
  }, [filteredTransactions, dataLoaded]);

  return {
    transactions:   filteredTransactions,
    summaryData,
    uniqueOptions,
    groupedByMonth,
    balanceOverTime,
    isLoading: !dataLoaded || transactionsData.length === 0,
  };
};
