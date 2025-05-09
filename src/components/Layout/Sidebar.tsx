import Link from 'next/link';
import styled from 'styled-components';
import { useAuthStore } from '@/stores/authStore';

const SidebarContainer = styled.aside`
  width: var(--sidebar-width);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--dark);
  color: white;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1rem 0;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const NavItem = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

export const Sidebar: React.FC = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarContainer>
      <Logo>Financial Dashboard</Logo>
      <NavMenu>
        <NavItem>
          <Link href="/dashboard">Home</Link>
        </NavItem>
        <NavItem onClick={handleLogout}>Logout</NavItem>
      </NavMenu>
    </SidebarContainer>
  );
};
