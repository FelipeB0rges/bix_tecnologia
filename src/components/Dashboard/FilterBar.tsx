import styled from 'styled-components';
import { useFiltersStore } from '@/stores/filtersStore';
import { useTransactions } from '@/hooks/useTransactions';

const FilterContainer = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
  color: var(--dark);
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
`;

const ResetButton = styled.button`
  background-color: var(--light);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #ddd;
  }
`;

export const FilterBar: React.FC = () => {
  const { 
    dateRange, 
    account, 
    industry, 
    state, 
    setDateRange, 
    setAccount, 
    setIndustry, 
    setState, 
    resetFilters 
  } = useFiltersStore();
  
  const { uniqueOptions } = useTransactions();

  return (
    <FilterContainer>
      <FilterGroup>
        <Label>Start Date</Label>
        <Input 
          type="date" 
          value={dateRange.startDate} 
          onChange={(e) => setDateRange(e.target.value, dateRange.endDate)}
        />
      </FilterGroup>
      
      <FilterGroup>
        <Label>End Date</Label>
        <Input 
          type="date" 
          value={dateRange.endDate} 
          onChange={(e) => setDateRange(dateRange.startDate, e.target.value)}
        />
      </FilterGroup>
      
      <FilterGroup>
        <Label>Account</Label>
        <Select 
          value={account} 
          onChange={(e) => setAccount(e.target.value)}
        >
          <option value="">All Accounts</option>
          {uniqueOptions.accounts.map((acc) => (
            <option key={acc} value={acc}>{acc}</option>
          ))}
        </Select>
      </FilterGroup>
      
      <FilterGroup>
        <Label>Industry</Label>
        <Select 
          value={industry} 
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option value="">All Industries</option>
          {uniqueOptions.industries.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </Select>
      </FilterGroup>
      
      <FilterGroup>
        <Label>State</Label>
        <Select 
          value={state} 
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">All States</option>
          {uniqueOptions.states.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </Select>
      </FilterGroup>
      
      <ResetButton onClick={resetFilters}>
        Reset Filters
      </ResetButton>
    </FilterContainer>
  );
};
