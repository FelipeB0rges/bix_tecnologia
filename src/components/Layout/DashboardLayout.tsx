import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { AuthGuard } from '../AuthGuard';

const MainContent = styled.main`
  margin-left: var(--sidebar-width);
  padding: 2rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <AuthGuard>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </AuthGuard>
  );
};
