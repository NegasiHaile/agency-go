import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import theme from 'renderer/styles/muiTheme';
import AvatarSvg from 'renderer/assets/svg/AvatarSvg';
import CreateInvoiceModal from '../CreateModal';

const PayrollTopContainer = () => {
  const [isCreateInvoiceModalOpen, setCreateInvoiceModalOpen] = useState(false);

  const [selectData, setSelectedData] = useState('Current invoice settings');
  const handleOpen = () => setCreateInvoiceModalOpen(true);

  return (
    <Box margin={'10px 0px'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize="22px">Invoicing</Typography>
        <Button
          variant="contained"
          sx={{ color: '#fff', textTransform: 'capitalize' }}
          onClick={handleOpen}

        >
          Export
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end',margin:'20px 0px' }}>
        <Box display={'flex'} gap={'10px'}>
          <Select
            id="current-invoice-settings"
            value={'Weekly'}
            onChange={(e) => setSelectedData(e.target.value)}
            sx={{
             
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
              value={'Weekly'}
              sx={{ fontWeight: 500 }}
            >
              Weekly
            </MenuItem>
            <MenuItem
              value={'Biweekly'}
              sx={{ fontWeight: 500 }}
            >
              Biweekly
            </MenuItem>
            <MenuItem
              value={'Monthly'}
              sx={{ fontWeight: 500 }}
            >
              Monthly
            </MenuItem>
            <MenuItem
              value={'Annually'}
              sx={{ fontWeight: 500 }}
            >
              Annually
            </MenuItem>
          </Select>
          <Select
            id="current-invoice-settings"
            value={'Roles'}
            onChange={(e) => setSelectedData(e.target.value)}
            sx={{
             
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
              value={'Admin'}
              sx={{ fontWeight: 500 }}
            >
              Admin
            </MenuItem>
            <MenuItem
              value={'Manager'}
              sx={{ fontWeight: 500 }}
            >
              Manager
            </MenuItem>
            <MenuItem
              value={'Employee'}
              sx={{ fontWeight: 500 }}
            >
              Employee
            </MenuItem>
          </Select>
          <Select
            id="current-invoice-settings"
            value={'Status'}
            onChange={(e) => setSelectedData(e.target.value)}
            sx={{
             
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
              value={'Paid'}
              sx={{ fontWeight: 500 }}
            >
              Paid
            </MenuItem>
            <MenuItem
              value={'Unpaid'}
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
