import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EditSvg from 'renderer/assets/svg/downloadSvg';
import theme from 'renderer/styles/muiTheme';
import AddLeder from './AddLeder';
import { API_URL } from 'config';

const payoutData = [
  {
    id: '1',
    amount: '$1,024',
    status: 'Pending',
    date: 'Oct 4, 2023',
    invoiceStatus: 'Unpaid',
  },


];
const BookkeepingTable = () => {
  const [selectedStatus, setSelectedStatus] = useState('Filter');


const [allInvoice,setAllInvoice]=useState<any>([]);

const[isOpen,setOpen]=useState<any>(false)

  const getInvoice = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    };
    try {
      const response = await fetch(`${API_URL}/invoicing`, options);
      if (response.ok) {
        const data = await response.json();
        setAllInvoice(data?.data)
        console.log(data, 'getData');
      } else {
        console.error('Failed to create the invoice');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    getInvoice()
  },[])
const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <>
      <Stack
        borderRadius="16px"
        gap="15px"
        sx={{
          padding: '10px',
          border: `1px solid ${theme.palette.primary.contrastText}`,
          bgcolor: isDarkTheme ? '#0C0C0C' : '#fff',
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} gap={'10px'}>
            <Button
              variant="contained"
              sx={{ color: '#fff', textTransform: 'capitalize' }}
              onClick={() => setOpen(true)}
            >
              Add Ledger{' '}
            </Button>
            <Typography fontSize="22px">Ledger</Typography>
          </Box>
          <Box>
            <Select
              id="filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              sx={{
                width: 'fit-content',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.secondary.light,
                },
                height: 'fit-content',
                padding: '0px 0px',
                ' & .MuiOutlinedInput-input': {
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
                value={'Filter'}
                sx={{ fontWeight: 500, fontSize: '11px' }}
              >
                Filter
              </MenuItem>
              <MenuItem
                value={'paid'}
                sx={{ fontWeight: 500, fontSize: '11px' }}
              >
                Paid invoice
              </MenuItem>
              <MenuItem
                value={'unpaid'}
                sx={{ fontWeight: 500, fontSize: '11px' }}
              >
                Pending invoice
              </MenuItem>
            </Select>
          </Box>
        </Box>
        <TableContainer>
          <Table
            sx={{
              minWidth: 650,
              borderRadius: 16,
              border: '1px solid ',
              borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
            }}
            aria-label="simple table"
          >
            <TableHead sx={{ bgcolor: isDarkTheme ? '#0C0C0C' : '#fff' }}>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Debit</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // (
                //   selectedStatus == 'Filter'
                //   ? payoutData
                //   : payoutData.filter(
                //       (d) =>
                //         d.invoiceStatus.toLowerCase() ===
                //         selectedStatus.toLowerCase()
                //     )
                // )
                allInvoice.map((row: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ color: '#FFFFFF' }}>23/04/2023</TableCell>

                    <TableCell
                      scope="column"
                      sx={{ color: '#FFFFFF', padding: '25px 10px' }}
                    >
                      Cash
                    </TableCell>

                    <TableCell sx={{ color: '#FFFFFF' }}>Invioce</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>Invioce</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>100</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>1090</TableCell>

                    <TableCell sx={{ color: '#04A1FF' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <Box sx={{ cursor: 'pointer' }}>
                          <EditSvg />
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <AddLeder open={isOpen} setOpen={setOpen} />
    </>
  );
};

export default BookkeepingTable;
