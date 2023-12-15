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
import theme from 'renderer/styles/muiTheme';
import { MyInvoiceContext } from '../context/context';
import ViewModal from './ViewModal';

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
  const [openView, setOpenView] = useState<any>(false);
  const [selectedStatus, setSelectedStatus] = useState('Filter');
  const [userData, setUserData] = useState<any>('');
  const [selectedStatu, setSelectedStatu] = useState<any>('');

  const [allInvoice, setAllInvoice] = useState<any>([]);

  const { data } = useContext(MyInvoiceContext);
  console.log('contextData', data?._id);

  // console.log(allInvoice?.data?.firstName)

  const getInvoice = async (id: any) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(
        `http://localhost:3000/invoicing/user/${id}/invoices`,
        options
      );
      if (response.ok) {
        const data = await response.json();
        setAllInvoice(data?.data);
        console.log(data?.data, 'getData');
      } else {
        console.error('Failed to create the invoice');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dataForReactApi = {
    status: selectedStatu,
  };

  const updateInvoice = async (id: any) => {
    console.log(selectedStatu);

    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/invoicing/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForReactApi),
      });

      if (response.ok) {
        // Update the state after a successful update
        getInvoice(data?._id);
        console.log('Invoice updated successfully');
      } else {
        console.error('Failed to update the invoice');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // handle dowmold pdf
  const pdfData = {
    userName: data?.firstName,
    companyName: '',
    clientCompanyName: '',
    companyAddress: '',
    companyContact: '',
    contactDetails: '',
    description: '',
    qty: 11,
    unitPrice: 12.11,
    total: 0,
    userId: data?._id,
    employeeId: data?._id,
    email: data?.email,
    amount: 0,
    status: true,
    address: 'test',
    invoiceNo: 'INC0001',
    paymentTerms: 'test',
    contactName: 'test',
    nameDept: 'test',
    addresss: 'test',
    phone: 'test',
    invoiceTitle: 'test',
    paymentInstructions: 'test',
    subtotal: 0,
    discount: 0,
    subtotalLessDiscount: 0,
    taxRate: 'test',
    totalTax: 0,
    shippingHandling: 0,
    balanceDue: '$25310',
    date: '2023-11-06',
    addressShipTo: 'test',
    phoneShipTo: 'test',
  };
  const handlePDF = async (data: any) => {
    console.log(data);



      window.location.href = data;
      // setpdfURl(responseData.data)

  };
  // const handlePDF = async (data: any) => {
  //   console.log(data);
  // };
  useEffect(() => {
    getInvoice(data?._id);
    // setAllInvoice(contextData)
  }, [data]);
  // useEffect(()=>{
  //   getInvoice(contextData.data._id)
  // },[contextData?.data?._id])
  const [openPromo, setOpenPromo] = useState<any | null>(false);
  const handleView = (data: any) => {
    console.log(data);
    setUserData(data);
    setOpenView(true);
  };

  const handleStatusToggle = (istrue: any) => {
    console.log(istrue);
    setSelectedStatu((istrue: any) => (istrue ? true : false));
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
        <Box
          display={'flex'}
          justifyContent={'space-between'}

        >
          <Typography fontSize="22px">Invoicing</Typography>
          <Box>
            <Select
              id="filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
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
              {allInvoice.reverse().map((item: any, index: any) => {
                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="row" sx={{ padding: '25px 10px' }}>
                      ${item?.qty * item?.unitPrice}
                    </TableCell>
                    <TableCell
                      scope="row"
                      sx={{
                        color: item?.delivery === true ? '#37DE8F' : '#FEC84A',
                      }}
                    >
                      {item?.delivery === true ? 'Successfull' : 'Pending'}
                    </TableCell>
                    <TableCell>{item?.createdAt }</TableCell>
                    <TableCell
                      scope="row"
                      sx={{
                        color: item?.status ? '#FEC84A' : '#37DE8F',
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                      onClick={() => {
                        handleStatusToggle(item?.status);
                        updateInvoice(item?._id);
                      }}
                    >
                      <Select
                        value={item?.status ? 'Paid' : 'Unpaid'}
                        onChange={(e) => {
                          console.log(e.target.value);
                          updateInvoice(item?._id);

                          setSelectedStatu(
                            e.target.value === 'Paid' ? true : false
                          );
                        }}
                        style={{ color: item?.status ? '#FEC84A' : '#37DE8F' }}
                      >
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Unpaid">Unpaid</MenuItem>
                      </Select>
                    </TableCell>
                    {/* <TableCell
                  sx={{
                    color:
                    allInvoice.data.isAdmin  === 'Unpaid' ? '#FEC84A' : '#37DE8F',
                  }}
                >
                  <Typography
                    sx={{
                      width: 'fit-content',
                      padding: '4px 10px',
                      borderRadius: '14px',
                      fontSize: '12px',
                      background:
                      allInvoice.data.isAdmin === 'Unpaid' ? '#473200' : '#072718',
                    }}
                  >
                    {allInvoice.data.isAdmin  === true ? 'paid': 'Unpaid'}
                  </Typography>
                </TableCell> */}
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
                          onClick={() => handleView(allInvoice[index])}
                        >
                          View
                        </Typography>
                        <Box
                          // onClick={() => handlePDF(item?.pdfUrl)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <a href={item?.pdfUrl} target="_blank" rel="noopener noreferrer"><DownloadSvgIcon /></a>
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
      <ViewModal open={openView} setOpen={setOpenView} userData={userData} />
    </>
  );
};

export default Payouts;
