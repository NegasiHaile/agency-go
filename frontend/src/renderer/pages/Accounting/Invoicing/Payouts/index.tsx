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
import { useContext, useEffect, useState } from 'react';
import DownloadSvgIcon from 'renderer/assets/svg/downloadSvg';
import { MyInvoiceContext } from '../context/context';
import ViewModal from './ViewModal';
import { API_URL } from 'config';

const Payouts = () => {
  const [openView, setOpenView] = useState<boolean>(false);
  const [invoiceSelectedFilter, setInvoiceSelectedFilter] = useState('Filter');
  const [invoiceData, setInvoiceData] = useState<any>('');
  
  const { data, creatorInvoices, setCreatorInvoices } = useContext(MyInvoiceContext);


  const getInvoice = async () => {
    // Get selected user invoices data?._id = selected userID
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(
        `${API_URL}/invoicing/user/${data?._id}/invoices`,
        options
      );
      if (response.ok) {
        const resData = await response.json();
        setCreatorInvoices([...resData?.data])
        console.log("Selected creator Invoices:", resData?.data,);
      } else {
        console.error('Failed to create the invoice');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateInvoice = async (index:number, invoiceStatus: boolean, _id:string) => {
    // console.log("Selected invoice:", invoice)
    try {
      const response = await fetch(`${API_URL}/invoicing/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: invoiceStatus}),
      });

        getInvoice();
        console.log("response:", await response.json())
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoice();
  }, [data]);

  const handleView = (invoice: any) => {
    setInvoiceData(invoice);
    setOpenView(true);
  };
  
 const theme = useTheme();
 const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <>
      <Stack
        borderRadius="16px"
        gap="15px"
        sx={{
          padding: '10px',
          border: `1px solid `,
          borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
          backgroundColor: isDarkTheme ? '#121212' : '#fff',
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography fontSize="22px">Invoicing</Typography>
          <Box>
            <Select
              id="filter"
              value={invoiceSelectedFilter}
              onChange={(e) => setInvoiceSelectedFilter(e.target.value)}
              sx={{
                width: 'fit-content',

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
              border: '1px solid #292929',
            }}
            aria-label="simple table"
          >
            <TableHead sx={{ bgcolor: isDarkTheme ? '#292929' : '#EAF1FF' }}>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creatorInvoices?.reverse().map((item: any, index: any) => {
                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="row" sx={{ padding: '25px 10px' }}>
                      ${item?.amount}
                    </TableCell>
                    <TableCell
                      scope="row"
                      sx={{
                        color: item?.delivery === true ? '#37DE8F' : '#FEC84A',
                      }}
                    >
                      {item?.delivery === true ? 'Successful' : 'Pending'}
                    </TableCell>
                    <TableCell>{item?.createdAt}</TableCell>
                    <TableCell
                      scope="row"
                      sx={{
                        color: item?.status ?  '#37DE8F' : '#FEC84A',
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Select
                        value={item?.status ? 'Paid' : 'Unpaid'}
                        onChange={(e) => {
                          console.log(e.target.value);
                          updateInvoice(index, e.target.value === 'Paid' ? true : false, item?._id);
                        }}
                        style={{ color: item?.status ?  '#37DE8F' : '#FEC84A' }}
                      >
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Unpaid">Unpaid</MenuItem>
                      </Select>
                    </TableCell>
                    
                    <TableCell sx={{ color: '#04A1FF' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <Typography
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleView(creatorInvoices[index])}
                        >
                          View
                        </Typography>
                        <Box
                          sx={{ cursor: 'pointer' }}
                        >
                          <a
                            href={item?.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <DownloadSvgIcon />
                          </a>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <ViewModal open={openView} setOpen={setOpenView} invoiceData={invoiceData} />
    </>
  );
};

export default Payouts;
