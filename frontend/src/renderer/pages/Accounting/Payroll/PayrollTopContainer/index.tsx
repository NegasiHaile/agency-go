import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import {useState } from 'react';
import CreateInvoiceModal from '../CreateModal';
import { OpenInNew } from '@mui/icons-material';

const payrollFrequency = ['Weekly', 'Biweekly', 'Monthly', 'Annually']
const PayrollTopContainer = ({filters, setFilters}: any) => {
  
  const [isCreateInvoiceModalOpen, setCreateInvoiceModalOpen] = useState(false);
  const handleOpen = () => setCreateInvoiceModalOpen(true);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box margin={'10px 0px'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
        <Typography fontSize="22px">Payroll</Typography>
        <Button
          variant="contained"
          sx={{ color: '#fff', textTransform: 'capitalize' }}
          size='small'
          startIcon={<OpenInNew />}
          onClick={handleOpen}>
          Export
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginTop:'20px', padding: '10px', borderRadius: '3px', backgroundColor: isDark? '#121212': '#fff' }}>
        <Box display={'flex'} gap={'10px'}>
          <Select
            id="current-invoice-settings"
            value={filters.frequency}
            onChange={(e) => setFilters({...filters, frequency: e.target.value})}
            sx={{
              borderRadius: '5px',
              width: 'fit-content',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.light,
              },
              height: 'fit-content',
              padding: '0px 0px',
              ' & .MuiOutlinedInput-input':
                {
                  padding: '4px 8px',
                },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
            
              input: {
                backgroundColor: theme.palette.secondary.contrastText,
              },
            }}
          >
            
            {payrollFrequency.map((item) => {
              return <MenuItem key={item} value={item} sx={{ fontWeight: 500 }}>
                        {item}
                    </MenuItem>
            })}
          </Select>
          <Select
            id="current-invoice-settings"
            value={filters.role}
            onChange={(e) => setFilters({...filters, role: e.target.value})}
            sx={{
              borderRadius: '5px',
              width: 'fit-content',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.light,
              },
              height: 'fit-content',
              padding: '0px 0px',
              ' & .MuiOutlinedInput-input':
                {
                  padding: '4px 8px',
                },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
             
              input: {
                backgroundColor: theme.palette.secondary.contrastText,
              },
            }}
          >
            <MenuItem
              value={'Roles'}
              sx={{ fontWeight: 500 }}
            >
              Roles
            </MenuItem>
            <MenuItem
              value={'admin'}
              sx={{ fontWeight: 500 }}
            >
              Admin
            </MenuItem>
            <MenuItem
              value={'manager'}
              sx={{ fontWeight: 500 }}
            >
              Manager
            </MenuItem>
            <MenuItem
              value={'employee'}
              sx={{ fontWeight: 500 }}
            >
              Employee
            </MenuItem>
          </Select>
          <Select
            id="current-invoice-settings"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            sx={{
              borderRadius: '5px',
              width: 'fit-content',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.light,
              },
              height: 'fit-content',
              padding: '0px 0px',
              ' & .MuiOutlinedInput-input':
                {
                  padding: '4px 8px',
                },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
             
              input: {
                backgroundColor: theme.palette.secondary.contrastText,
              },
            }}
          >
            <MenuItem
              value={'Status'}
              sx={{ fontWeight: 500 }}
            >
              Status
            </MenuItem>
            <MenuItem
              value={'true'}
              sx={{ fontWeight: 500 }}
            >
              Paid
            </MenuItem>
            <MenuItem
              value={'false'}
              sx={{ fontWeight: 500 }}
            >
              Unpaid
            </MenuItem>
          </Select>
          {isCreateInvoiceModalOpen && (
          <CreateInvoiceModal
            open={isCreateInvoiceModalOpen}
            setOpen={setCreateInvoiceModalOpen}
        />
      )}
        </Box>
      </Box>
    </Box>
  );
};

export default PayrollTopContainer;
