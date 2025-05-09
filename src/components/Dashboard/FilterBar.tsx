import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Skeleton } from '@mui/material';
import { useFiltersStore } from '@/stores/filtersStore';
import { useTransactions } from '@/hooks/useTransactions';
import styled from 'styled-components';

const FilterContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: flex-end;
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
  
  const { uniqueOptions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <FilterContainer>
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={56} />
        ))}
      </FilterContainer>
    );
  }

  return (
    <FilterContainer>
      <TextField
        type="date"
        label="Start Date"
        value={dateRange.startDate}
        onChange={(e) => setDateRange(e.target.value, dateRange.endDate)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      
      <TextField
        type="date"
        label="End Date"
        value={dateRange.endDate}
        onChange={(e) => setDateRange(dateRange.startDate, e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      
      <FormControl fullWidth>
        <InputLabel>Account</InputLabel>
        <Select
          value={account}
          label="Account"
          onChange={(e) => setAccount(e.target.value)}
        >
          <MenuItem value="">All Accounts</MenuItem>
          {uniqueOptions.accounts.map((acc) => (
            <MenuItem key={acc} value={acc}>{acc}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel>Industry</InputLabel>
        <Select
          value={industry}
          label="Industry"
          onChange={(e) => setIndustry(e.target.value)}
        >
          <MenuItem value="">All Industries</MenuItem>
          {uniqueOptions.industries.map((ind) => (
            <MenuItem key={ind} value={ind}>{ind}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          value={state}
          label="State"
          onChange={(e) => setState(e.target.value)}
        >
          <MenuItem value="">All States</MenuItem>
          {uniqueOptions.states.map((st) => (
            <MenuItem key={st} value={st}>{st}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Button 
        variant="outlined" 
        onClick={resetFilters}
        fullWidth
      >
        Reset Filters
      </Button>
    </FilterContainer>
  );
};
