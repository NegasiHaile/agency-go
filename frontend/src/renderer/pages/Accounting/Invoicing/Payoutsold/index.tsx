import {
  Box,
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
import { useState } from 'react';
import DownloadSvgIcon from 'renderer/assets/svg/downloadSvg';
import theme from 'renderer/styles/muiTheme';

const payoutData = [
  {
    id: '1',
    amount: '$1,024',
    status: 'Pending',
    date: 'Oct 4, 2023',
    invoiceStatus: 'Unpaid',
  },
  {
    id: '2',
    amount: '$834',
    status: 'Pending',
    date: 'Oct 2, 2023',
    invoiceStatus: 'Unpaid',
  },
  {
    id: '3',
    amount: '$9,042.34',
    status: 'Successful',
    date: 'Sep 30, 2023',
    invoiceStatus: 'Paid',
  },
  {
    id: '4',
    amount: '$100',
    status: 'Successful',
    date: 'Sep 26, 2023',
    invoiceStatus: 'Paid',
  },
  {
    id: '5',
    amount: '$42,043.42',
    status: 'Successful',
    date: 'Sep 24, 2023',
    invoiceStatus: 'Paid',
  },
  {
    id: '6',
    amount: '$1,025.32',
    status: 'Successful',
    date: 'Sep 14, 2023',
    invoiceStatus: 'Paid',
  },
  {
    id: '7',
    amount: '$902',
    status: 'Successful',
    date: 'Sep 10, 2023',
    invoiceStatus: 'Paid',
  },
  {
    id: '8',
    amount: '$543',
    status: 'Successful',
    date: 'Sep 04, 2023',
    invoiceStatus: 'Paid',
  },
  {
    id: '9',
    amount: '$925.17',
    status: 'Successful',
    date: 'Sep 01, 2023',
    invoiceStatus: 'Paid',
  },
];
const Payouts = () => {
  const [selectedStatus, setSelectedStatus] = useState('Filter');

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Stack
      borderRadius="16px"
      gap="15px"
      bgcolor={isDarkTheme ? '#000' : '#fff'}
      sx={{
        paddingTop: '10px',
        paddingBottom: '10px',
        border: `2px solid ${theme.palette.primary.contrastText}`,
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        paddingTop={'10px'}
        paddingLeft={'15px'}
      >
        <Typography fontSize="22px">Invoicing</Typography>
        <Box sx={{ paddingRight: '16px' }}>
          <Select
            id="filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{
              width: '150px',

              height: 'fit-content',
              padding: '0px 0px',
              ' & .MuiOutlinedInput-input': {
                padding: '4px  8px',
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
            <MenuItem value={'Filter'} sx={{ fontWeight: 500 }}>
              Filter
            </MenuItem>
            <MenuItem value={'paid'} sx={{ fontWeight: 500 }}>
              Paid invoice
            </MenuItem>
            <MenuItem value={'unpaid'} sx={{ fontWeight: 500 }}>
              Pending invoice
            </MenuItem>
          </Select>
        </Box>
      </Box>
      <TableContainer
        sx={{
          border: `1px solid ${theme.palette.primary.contrastText}`,
          width: '100%',
        }}
      >
        <Table aria-label="simple table">
          <TableHead
            sx={{
              background: isDarkTheme ? '#ffffff33' : '#EAF1FF',
            }}
          >
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(selectedStatus == 'Filter'
              ? payoutData
              : payoutData.filter(
                  (d) =>
                    d.invoiceStatus.toLowerCase() ===
                    selectedStatus.toLowerCase()
                )
            ).map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell scope="row" sx={{ padding: '25px 10px' }}>
                  {row.amount}
                </TableCell>
                <TableCell
                  scope="row"
                  sx={{
                    color: row.status === 'Pending' ? '#FEC84A' : '#37DE8F',
                  }}
                >
                  <Typography
                    sx={{
                      width: 'fit-content',
                      padding: '4px 10px',
                      borderRadius: '14px',
                      fontSize: '12px',
                      background:
                        row.status === 'Pending' ? '#473200' : '#072718',
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell
                  sx={{
                    color:
                      row.invoiceStatus === 'Unpaid' ? '#FEC84A' : '#37DE8F',
                  }}
                >
                  <Typography
                    sx={{
                      width: 'fit-content',
                      padding: '4px 10px',
                      borderRadius: '14px',
                      fontSize: '12px',
                      background:
                        row.invoiceStatus === 'Unpaid' ? '#473200' : '#072718',
                    }}
                  >
                    {row.invoiceStatus}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: '#04A1FF' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Typography sx={{ cursor: 'pointer' }}>View</Typography>
                    <Box sx={{ cursor: 'pointer' }}>
                      <DownloadSvgIcon />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Payouts;
