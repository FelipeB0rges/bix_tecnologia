import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTransactions } from '@/hooks/useTransactions';
import { Chart, registerables } from 'chart.js';
import { format, parse } from 'date-fns';

Chart.register(...registerables);

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 1rem;
`;

export const LineChart: React.FC = () => {
  const { balanceOverTime } = useTransactions();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Destroy existing chart if it exists
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
  }, [balanceOverTime]);

  return (
    <ChartContainer>
      <ChartTitle>Balance Evolution Over Time</ChartTitle>
      <canvas ref={chartRef} />
    </ChartContainer>
  );
};
