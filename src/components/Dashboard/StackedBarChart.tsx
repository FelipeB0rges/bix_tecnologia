import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTransactions } from '@/hooks/useTransactions';
import { Chart, registerables } from 'chart.js';
import { format, parse } from 'date-fns';
import { Skeleton } from '@mui/material';

Chart.register(...registerables);

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  min-height: 400px;
`;

const ChartTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 1rem;
`;

export const StackedBarChart: React.FC = () => {
  const { groupedByMonth, isLoading } = useTransactions();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !isLoading) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        const labels = groupedByMonth.map(item => {
          const date = parse(item.month, 'yyyy-MM', new Date());
          return format(date, 'MMM yyyy');
        });
        
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Income',
                data: groupedByMonth.map(item => item.income),
                backgroundColor: 'rgba(46, 204, 113, 0.7)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1,
              },
              {
                label: 'Expenses',
                data: groupedByMonth.map(item => item.expenses),
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
              }
            }
          }
        });
      }
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [groupedByMonth, isLoading]);

  if (isLoading) {
    return (
      <ChartContainer>
        <Skeleton variant="text" width="40%" height={32} style={{ marginBottom: '1rem' }} />
        <Skeleton variant="rectangular" height={350} />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle>Income vs Expenses by Month</ChartTitle>
      <div style={{ height: '350px' }}>
        <canvas ref={chartRef} />
      </div>
    </ChartContainer>
  );
};
