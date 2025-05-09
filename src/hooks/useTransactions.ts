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
    const loadData = async () => {
      // Adiciona um pequeno delay artificial para melhorar a experiência de loading
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!Array.isArray(transactions) || transactions.length === 0) {
        console.error("Falha ao carregar transações:", transactions);
        setTransactionsData([]);
        return;
      }

      const processed = (transactions as Transaction[]).map(t => ({
        ...t,
        amount: t.amount.toString(),
      }));

      const dates = processed.map(t => new Date(t.date).getTime());
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));

      useFiltersStore.setState({
        dateRange: { 
          startDate: minDate.toISOString().split('T')[0],
          endDate: maxDate.toISOString().split('T')[0]
        }
      });

      setTransactionsData(processed);
      setDataLoaded(true);
    };

    loadData();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactionsData.filter(transaction => {
      const txDate = new Date(transaction.date).getTime();
      const startTimestamp = new Date(dateRange.startDate).getTime();
      const endTimestamp = new Date(dateRange.endDate).getTime() + (24 * 60 * 60 * 1000 - 1);

      const inRange = txDate >= startTimestamp && txDate <= endTimestamp;
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
    accounts:   Array.from(new Set(transactionsData.map(t => t.account))),
    industries: Array.from(new Set(transactionsData.map(t => t.industry))),
    states:     Array.from(new Set(transactionsData.map(t => t.state))),
  }), [transactionsData]);

  const groupedByMonth = useMemo(() => {
    if (!dataLoaded) return [];

    const months: Record<string, { income: number; expenses: number }> = {};

    filteredTransactions.forEach(({ date, amount }) => {
      const val = parseFloat(amount);
      if (isNaN(val) || val === 0) return;

      const dt = new Date(date);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;

      months[key] = months[key] || { income: 0, expenses: 0 };
      if (val > 0) months[key].income += val;
      else         months[key].expenses += Math.abs(val);
    });

    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, vals]) => ({ month, ...vals }));
  }, [filteredTransactions, dataLoaded]);

  const balanceOverTime = useMemo(() => {
    if (!dataLoaded) return [];

    const sorted = [...filteredTransactions].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return da - db;
    });

    let running = 0;
    return sorted.map(({ date, amount }) => {
      const val = parseFloat(amount);
      running += val;
      const formattedDate = new Date(date).toISOString().split('T')[0];
      return { date: formattedDate, balance: running };
    });
  }, [filteredTransactions, dataLoaded]);

  return {
    transactions: filteredTransactions,
    summaryData,
    uniqueOptions,
    groupedByMonth,
    balanceOverTime,
    isLoading: !dataLoaded || transactionsData.length === 0,
  };
};
