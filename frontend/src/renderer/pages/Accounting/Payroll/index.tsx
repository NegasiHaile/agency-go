import { useState, useEffect } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import PayrollTopContainer from './PayrollTopContainer';
import { API_URL } from 'config';
import { groupingPayrolls } from './helpers/groupingPayrolls';
import TableAccordion from './TableAccordion';
export interface payrollType {
  employeeId: string,
  hourlyPay: string,
  commissionEarned: string,
  bonus: string,
  status: boolean,
  totalHours: string,
  totalPayment: number,
  createdAt?: string,
}

const HTTP_GET_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

type frequency = 'Weekly'|'Biweekly'|'Monthly'|'Annually'
type status = 'true'|'false' | "Status"
type role = 'admin'|'manager'|'employee' | 'Roles'
const statuses = ['true', 'false']
const roles = ['admin', 'manager', 'employee']

interface filters {
  frequency: frequency;
  role: role;
  status: status;
}

const initialFilters:filters = {frequency: 'Weekly', role: 'Roles', status: 'Status'}

export default function Payroll() {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [allPayrolls, setAllPayrolls] = useState<payrollType[] | []>([]);
  const [filteredUser, setFilteredUser] = useState<any[] | []>([])
  const [groupedPayrolls, setGroupedPayrolls] = useState<any>([]);
  const [filters, setFilters] = useState<filters>(initialFilters)

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, HTTP_GET_OPTIONS);
      if (response.ok) {
        const res = await response.json();
        setAllUsers(res?.data);
        setFilteredUser(res?.data);
      } else {
        console.error('Failed to get users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPayrolls = async () => {
    try {
      const response = await fetch(`${API_URL}/payroll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const res = await response.json();
        setAllPayrolls(res?.data);
      } else {
        console.error('Failed to get users');
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllUsers();
    getAllPayrolls()
  }, []);

  useEffect(() => {
    filterPayrolls(filters.frequency, filters.role, filters.status );
  }, [allPayrolls, filters]);


  const filterPayrolls = (selectedFrequency: any, selectedRole: any, selectedStatus: any) => {
    let payrollsInGroup:any[] = [];
    //filter based on Roles
    if (roles.includes(selectedRole)) {
      const userFilters = allUsers.filter((user: any) => user.role == selectedRole);
      setFilteredUser(userFilters)
    }
    else {
      setFilteredUser(allUsers)
    }

    // filter based on status
    if ( statuses.includes(selectedStatus)) {
      const payrollFilters = allPayrolls.filter((payroll: any) => `${payroll.status}` === selectedStatus);
      payrollsInGroup = groupingPayrolls(payrollFilters, selectedFrequency);
    } else {
      payrollsInGroup = groupingPayrolls(allPayrolls, selectedFrequency);
    }
    console.log("payrollsInGroup:", payrollsInGroup)
    setGroupedPayrolls(payrollsInGroup);
  }

  return (
    <Box
      display="flex"
      gap="5px"
      sx={{ background: isDarkTheme ? '#121212' : 'white' }}
    >
      <Stack
        width={'100%'}
        padding={'10px'}
        sx={{
          background: isDarkTheme ? '#0c0c0c' : '#EAF1FF', borderRadius: '5px',
        }}
      >
        <PayrollTopContainer filters={filters} setFilters={setFilters}  />
        <TableAccordion
        allUsers={filteredUser}
        allPayrolls={allPayrolls}
        setAllPayrolls={setAllPayrolls} 
        groupedPayrolls={groupedPayrolls}
        payrollGroupTitle={filters.frequency}
         />
      </Stack>
    </Box>
  );
}
