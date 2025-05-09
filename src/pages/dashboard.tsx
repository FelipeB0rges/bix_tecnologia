import Head from 'next/head';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { FilterBar } from '@/components/Dashboard/FilterBar';
import { SummaryCards } from '@/components/Dashboard/SummaryCards';
import { StackedBarChart } from '@/components/Dashboard/StackedBarChart';
import { LineChart } from '@/components/Dashboard/LineChart';
import styled from 'styled-components';

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: var(--dark);
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Financial Dashboard</title>
      </Head>
      <DashboardLayout>
        <PageTitle>Financial Overview</PageTitle>
        <FilterBar />
        <SummaryCards />
        <ChartsContainer>
          <StackedBarChart />
          <LineChart />
        </ChartsContainer>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;
