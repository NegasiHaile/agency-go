import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import EditIconSvg from 'renderer/assets/svg/EditIconSvg';
import AddFromVaultSvg from 'renderer/assets/svg/AddFromVaultSvg';

import TableAccordion from '../TableAccordion';
import { useState, useEffect, ChangeEvent } from 'react';
import { AnyNsRecord } from 'dns';

const tableData = [
  {
    id: 1,
    employee: 'Joan Adams',
    role: 'Admin',
    hourlyPay: '14',
    commissionEarned: '134',
    bonuses: '14',
    datePaid: '',
    status: 'Unpaid',
    totalHours: '58',
    totalCompensation: '1,435.05',
  },
  {
    id: 2,
    employee: 'Zain',
    role: 'Admin',
    hourlyPay: '12',
    commissionEarned: '145',
    bonuses: '13',
    datePaid: '',
    status: 'Unpaid',
    totalHours: '53',
    totalCompensation: '1,435.05',
  },
  {
    id: 3,
    employee: 'Shah',
    role: 'Manager',
    hourlyPay: '14',
    commissionEarned: '142',
    bonuses: '16',
    datePaid: 'Sep 24, 2023',
    status: 'Paid',
    totalHours: '56',
    totalCompensation: '1,435.05',
  },
  {
    id: 4,
    employee: 'Damilare',
    role: 'Manager',
    hourlyPay: '17',
    commissionEarned: '101',
    bonuses: '14',
    datePaid: 'Sep 24, 2023',
    status: 'Paid',
    totalHours: '50',
    totalCompensation: '1,435.05',
  },
  {
    id: 5,
    employee: 'Eloghosa',
    role: 'Employee',
    hourlyPay: '10',
    commissionEarned: '146',
    bonuses: '34',
    datePaid: 'Sep 24, 2023',
    status: 'Paid',
    totalHours: '49',
    totalCompensation: '1,435.05',
  },
];

const PayrollTable = () => {
  return (
    <TableAccordion>
      <TableData />
    </TableAccordion>
  );
};

export default PayrollTable;

const TableData = () => {
  const [alluser, setAlluser] = useState<any>([]);
  const [tableData2, setTableData] = useState<any>([]); // Initialize with your data
  const [loaclData, setLoaclData] = useState<any>([]); // Initialize with your data
  const [editingIndex, setEditingIndex] = useState<any>(null);
  const [inputValue, setInputValue] = useState<any>({
    hourlyPay: '',
    commissionEarned: '',
    bonuses: '',
  });

  const handleChnge = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const getuser = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch('http://localhost:3000/users', options);
      if (response.ok) {
        const data = await response.json();
        setAlluser(data?.data);
        console.log(data, 'get user Data');
      } else {
        console.error('Failed to create the user');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getuser();
  }, []);

  const editIndex = (index: any) => {
    setEditingIndex(index);
    if (tableData2[index]) {
      const edit123 = tableData2[index];
      setInputValue(edit123);
    }
  };

  const saveData = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingIndex !== null) {
      // If editing an existing entry, replace it
      const updatedTableData = [...tableData2];
      updatedTableData[editingIndex] = inputValue;
      setTableData(updatedTableData);
    } else {
      // If not editing, add a new entry
      setTableData((prevTableData: any) => [...prevTableData, inputValue]);
    }
    setEditingIndex(null);
    setInputValue({
      hourlyPay: '',
      commissionEarned: '',
      bonuses: '',
    });
    localStorage.setItem('tableData', JSON.stringify(tableData2));
  };

  useEffect(() => {
    // Load data from local storage only if it's not already set
    const dataFromLocalStorage = localStorage.getItem('tableData');
    if (dataFromLocalStorage && tableData2.length === 0) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      setTableData(parsedData);
    }
  }, []);

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
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
        <TableHead sx={{ bgcolor: isDarkTheme ? '#131213' : '#EAF1FF' }}>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Hourly Pay</TableCell>
            <TableCell>Commission earned</TableCell>
            <TableCell>Bonuses</TableCell>
            <TableCell>Date paid</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Hours</TableCell>
            <TableCell>Total Compensation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alluser.map((item: any, index: any) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell> {`${item?.firstName} ${item?.lastName}`} </TableCell>
              <TableCell>
                {item.role ? 'Employee' : tableData[index]?.role}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '14px',
                  }}
                >
                  {editingIndex === index ? (
                    <input
                      type="number"
                      style={{ width: '40px' }}
                      name="hourlyPay"
                      value={inputValue.hourlyPay}
                      onChange={handleChnge}
                    />
                  ) : (
                    <Typography>
                      $
                      {!tableData2[index]?.hourlyPay
                        ? 0
                        : tableData2[index]?.hourlyPay}
                    </Typography>
                  )}

                  {editingIndex === index ? (
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',

                        fontSize: '20px',
                      }}
                      onClick={() => saveData(index)}
                    >
                      +
                    </button>
                  ) : (
                    <button
                      style={{ background: 'transparent', border: 'none' }}
                      onClick={() => editIndex(index)}
                    >
                      <EditIconSvg />
                    </button>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '14px',
                  }}
                >
                  {editingIndex === index ? (
                    <input
                      type="number"
                      style={{ width: '40px' }}
                      name="commissionEarned"
                      value={inputValue.commissionEarned}
                      onChange={handleChnge}
                    />
                  ) : (
                    <Typography>
                      $
                      {!tableData2[index]?.commissionEarned
                        ? 0
                        : tableData2[index]?.commissionEarned}
                    </Typography>
                  )}

                  {editingIndex === index ? (
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',

                        fontSize: '20px',
                      }}
                      onClick={() => saveData(index)}
                    >
                      +
                    </button>
                  ) : (
                    <button
                      style={{ background: 'transparent', border: 'none' }}
                      onClick={() => editIndex(index)}
                    >
                      <EditIconSvg />
                    </button>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '14px',
                  }}
                >
                  {editingIndex === index ? (
                    <input
                      type="number"
                      style={{ width: '40px' }}
                      name="bonuses"
                      value={inputValue.bonuses}
                      onChange={handleChnge}
                    />
                  ) : (
                    <Typography>
                      $
                      {!tableData2[index]?.bonuses
                        ? 0
                        : tableData2[index]?.bonuses}
                    </Typography>
                  )}

                  {editingIndex === index ? (
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',

                        fontSize: '20px',
                      }}
                      onClick={() => saveData(index)}
                    >
                      +
                    </button>
                  ) : (
                    <button
                      style={{ background: 'transparent', border: 'none' }}
                      onClick={() => editIndex(index)}
                    >
                      <EditIconSvg />
                    </button>
                  )}
                </Box>
              </TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>
                {tableData[index]?.datePaid}
              </TableCell>
              <TableCell
                sx={{
                  color:
                    tableData[index]?.status === 'Unpaid'
                      ? '#FEC84A'
                      : '#37DE8F',
                }}
              >
                <Typography
                  sx={{
                    width: 'fit-content',
                    padding: '4px 10px',
                    borderRadius: '14px',
                    fontSize: '12px',
                    background:
                      tableData[index]?.status === 'Unpaid'
                        ? '#473200'
                        : '#072718',
                  }}
                >
                  {tableData[index]?.status}
                </Typography>
              </TableCell>

              <TableCell sx={{ color: '#FFFFFF' }}>
                {tableData[index]?.totalHours}Hrs
              </TableCell>

              {/* <TableCell sx={{ color: '#FFFFFF' }}>





              
              ${tableData2[index]?.hourlyPay*tableData[index]?.totalHours+tableData2[index]?.commissionEarned+tableData2[index]?.bonuses}   
            </TableCell> */}
              <TableCell sx={{ color: '#FFFFFF' }}>
                $
                {(
                  parseFloat(tableData2[index]?.hourlyPay) *
                    parseFloat(tableData[index]?.totalHours) +
                  parseFloat(tableData2[index]?.commissionEarned) +
                  parseFloat(tableData2[index]?.bonuses)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
