import styled from 'styled-components';
import { useTransactions } from '@/hooks/useTransactions';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div<{ variant: string }>`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${({ variant }) => {
      switch (variant) {
        case 'balance': return 'var(--primary)';
        case 'income': return 'var(--secondary)';
        case 'expense': return 'var(--danger)';
        case 'pending': return 'var(--warning)';
        default: return 'var(--primary)';
      }
    }};
  }
`;

const CardTitle = styled.h3`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.5rem;
`;

const CardValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--dark);
`;

export const SummaryCards: React.FC = () => {
  const { summaryData } = useTransactions();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <CardsContainer>
      <Card variant="balance">
        <CardTitle>Total Balance</CardTitle>
        <CardValue>
          {formatCurrency(summaryData.balance)}
        </CardValue>
      </Card>
      
      <Card variant="income">
        <CardTitle>Total Income</CardTitle>
        <CardValue>
          {formatCurrency(summaryData.income)}
        </CardValue>
      </Card>
      
      <Card variant="expense">
        <CardTitle>Total Expenses</CardTitle>
        <CardValue>
          {formatCurrency(summaryData.expenses)}
        </CardValue>
      </Card>
      
      <Card variant="pending">
        <CardTitle>Pending Transactions</CardTitle>
        <CardValue>
          {summaryData.pendingCount}
        </CardValue>
      </Card>
    </CardsContainer>
  );
};
