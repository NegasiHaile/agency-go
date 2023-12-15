import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { PickersShortcutsItem } from '@mui/x-date-pickers/PickersShortcuts';
import { DateRange } from '@mui/x-date-pickers-pro';

// Remove the incorrect import of 'XLSX' as a default export

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
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
  p: 2,
};

// const CustomTable = ({ users }: any) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Last Name</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user: any, index: any) => (
//           <tr key={index}>
//             <td>{user.name}</td>
//             <td>{user.lastname}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

export default function CreateInvoiceModal({ open, setOpen }: any) {
  const tableRef = useRef(null);

  const handleClose = () => setOpen(false);

  const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
    {
      label: 'This Week',
      getValue: () => {
        const today = dayjs();
        return [today.startOf('week'), today.endOf('week')];
      },
    },
    // ... other shortcuts definitions
  ];

  // Function to export the users array to Excel

  return (
    <Modal
      sx={{ backdropFilter: 'blur(4px)' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 0px',
          }}
        >
          {/* Your header content */}
        </Box>
        <Divider sx={{ bgcolor: '#292929' }} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateRangePicker
            slotProps={{
              shortcuts: {
                items: shortcutsItems,
              },
              actionBar: { actions: [] },
            }}
            calendars={2}
          />
        </LocalizationProvider>
        {/* <CustomTable users={users} /> */}
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          gap={'8px'}
          padding={'20px 10px'}
        >
          <Button
            sx={{ color: '#fff', textTransform: 'capitalize' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ color: '#fff', textTransform: 'capitalize' }}
            onClick={() => {
              handleClose();
              // Call the export function
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
