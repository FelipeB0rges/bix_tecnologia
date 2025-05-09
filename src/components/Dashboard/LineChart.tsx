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
  min-height: 400px;
`;

const ChartTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 1rem;
`;

export const LineChart: React.FC = () => {
  const { balanceOverTime, isLoading } = useTransactions();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !isLoading) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        const labels = balanceOverTime.map(item => {
          const date = parse(item.date, 'yyyy-MM-dd', new Date());
          return format(date, 'dd MMM yyyy');
        });
        
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Balance',
                data: balanceOverTime.map(item => item.balance),
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.2,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
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
  }, [balanceOverTime, isLoading]);

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
      <ChartTitle>Balance Evolution Over Time</ChartTitle>
      <div style={{ height: '350px' }}>
        <canvas ref={chartRef} />
      </div>
    </ChartContainer>
  );
};
