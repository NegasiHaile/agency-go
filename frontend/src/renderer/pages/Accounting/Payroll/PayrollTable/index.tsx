import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { API_URL } from 'config';

import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState, ChangeEvent, useEffect } from 'react';
import { format_MMM_DD_YYYY } from '../helpers/formateDates';

interface payrollType{
  _id:string
  employeeId:string,
  hourlyPay: string,
  commissionEarned: string,
  bonus: string,
  status:boolean,
  totalHours:string,
  totalPayment:number
}

const defaultPayroll:payrollType = {
  _id:'',
  employeeId:'',
  hourlyPay: '0',
  commissionEarned: '0',
  bonus: '0',
  status:false,
  totalHours:'0',
  totalPayment:0
}

 const PayrollTable = ({allUsers, payrollGroup, allPayrolls, setAllPayrolls}: any) => {

  //hourlyPay, Commission Earned and Bonus editable Contents type
  const [payrollInputs, setPayrollInputs] = useState({  hourlyPay:false,  bonus:false,  commission:false })

  //the payroll that is selected to be edited
  const [selectedPayroll, setSelectedPayroll] = useState<payrollType>(defaultPayroll);

  // index of the selected payroll
  const [editingIndex, setEditingIndex] = useState<any>(null);

  const handlePayrollUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPayroll({ ...selectedPayroll, [e.target.name]: e.target.value });
  };

  const calculateTotalPayment = ()=>{
    return parseFloat(selectedPayroll?.hourlyPay) * parseFloat(selectedPayroll?.totalHours) +  parseFloat(selectedPayroll?.commissionEarned) + parseFloat(selectedPayroll?.bonus);
  }

  const editPayroll = (fieldName:string, payrollIndex:number) => {
    const defaultIn = {  hourlyPay:false,  bonus:false,  commission:false }
     payrollIndex != editingIndex ? setPayrollInputs({...defaultIn, [fieldName]:true})  : setPayrollInputs({...payrollInputs, [fieldName]:true})
     setEditingIndex(payrollIndex);

    if (payrollGroup[payrollIndex]) {
      const selectedPayroll: payrollType = payrollGroup[payrollIndex];
      setSelectedPayroll(selectedPayroll);
    }
  };

  const savePayroll = async (fieldName:string, payrollIndex: number) => {

    setPayrollInputs({...payrollInputs,[fieldName]:false})

    try {
      const response = await fetch(`${API_URL}/payroll/${selectedPayroll?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...selectedPayroll, 
          status: (!!selectedPayroll?.status).toString(),
          totalPayment: calculateTotalPayment()}),
      });
      if (response.ok) {
        const payroll = await response.json();
        const payrolls = [...payrollGroup];
        payrolls[payrollIndex] = payroll?.data;

        const alPayrolls =[...allPayrolls]
        const index = alPayrolls.findIndex(pr => pr._id==payrolls[payrollIndex]._id)
        index!=-1 && ((alPayrolls[index] = (payrolls[payrollIndex])) && setAllPayrolls(alPayrolls) )

      } else {
        console.error('Failed to get users');
      }
    } catch (error) {
      console.error(error)
    }
  };

  const findUser = (employeeId: string) =>{
    // Find the user based on the employeeId in payroll
    const user = allUsers.find((thisUser: {_id: string}) => thisUser?._id === employeeId);
    return user??null;
  }

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 650,
          borderRadius: 16,
          borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
        }}
        aria-label="simple table"
      >
        <TableHead sx={{ bgcolor: isDarkTheme ? '#131213' : '#EAF1FF' }}>
          <TableRow sx={{border: '0px'}}>
            <TableCell>Employee</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Hourly Pay</TableCell>
            <TableCell>Commission earned</TableCell>
            <TableCell>Bonuses</TableCell>
            <TableCell>Date_Paid</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total_Hours</TableCell>
            <TableCell>Total Compensation</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {payrollGroup.map((payroll: any, payrollIndex: any) => {
            const user = findUser(payroll?.employeeId);
            return(
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={payrollIndex}
            >
              <TableCell> {user?<>{`${user?.firstName??''} ${user?.lastName??''}`}</>: 'Not found!'} </TableCell>
              <TableCell>
                {user?.role}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  
                  {editingIndex === payrollIndex && payrollInputs.hourlyPay ? (
                    <TextField
                      type="number"
                      sx={{ width: '60px'}}
                      className='noSpinner'
                      name="hourlyPay"
                      value={selectedPayroll.hourlyPay}
                      onChange={handlePayrollUpdate}
                      inputProps={{ style: { padding: '3px 5px' } }}

                    />
                  ): (
                    <Typography width={'60px'} padding= '3px 5px' >
                      ${!payroll?.hourlyPay? 0: payroll?.hourlyPay}
                    </Typography>
                  )}
                  {editingIndex === payrollIndex && payrollInputs.hourlyPay ? (
                    <IconButton size="small"
                      onClick={() => savePayroll("hourlyPay", payrollIndex)}>
                     <AddIcon fontSize="inherit" color='primary' />
                   </IconButton>
                  ) : (
                  <IconButton size="small" 
                    onClick={() => editPayroll("hourlyPay", payrollIndex)}>
                      <EditOutlinedIcon fontSize="inherit" color='action' />
                 </IconButton>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  {editingIndex === payrollIndex && payrollInputs.commission ? (
                    <TextField
                      type="number"
                      sx={{ width: '60px'}}
                      className='noSpinner'
                      name="commissionEarned"
                      value={selectedPayroll.commissionEarned}
                      onChange={handlePayrollUpdate}
                      inputProps={{ style: { padding: '3px 5px' } }}

                  />
                  ) : (
                    <Typography width={'60px'} padding= '3px 5px' >
                      ${!payroll?.commissionEarned? 0 : payroll?.commissionEarned}
                    </Typography>
                  )}
                  
                  {editingIndex === payrollIndex && payrollInputs.commission? (
                    <IconButton size="small"
                      onClick={() => savePayroll('commission',payrollIndex)}>
                     <AddIcon fontSize="inherit" color='primary' />
                   </IconButton>
                  ) : (
                  <IconButton size="small"
                    onClick={() => editPayroll('commission',payrollIndex)}>
                      <EditOutlinedIcon fontSize="inherit" color='action' />
                 </IconButton>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  {editingIndex === payrollIndex && payrollInputs.bonus ? (
                    <TextField
                    type="number"
                    sx={{ width: '60px'}}
                    className='noSpinner'
                    name="bonus"
                    value={selectedPayroll.bonus}
                    onChange={handlePayrollUpdate}
                    inputProps={{ style: { padding: '3px 5px' } }}
                      
                    />
                  ) : (
                    <Typography width={'60px'} padding= '3px 5px'>
                      ${!payroll?.bonus? 0: payroll?.bonus}
                    </Typography>
                  )}
                  
                  {editingIndex === payrollIndex && payrollInputs.bonus ? (
                    <IconButton size="small"
                      onClick={() => savePayroll('bonus', payrollIndex)}>
                     <AddIcon fontSize="inherit" color='primary' />
                   </IconButton>
                  ) : (
                  <IconButton size="small"
                    onClick={() => editPayroll('bonus',payrollIndex)}>
                      <EditOutlinedIcon fontSize="inherit" color='action' />
                 </IconButton>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                {/* {payroll?.datePaid??''} */}
                {format_MMM_DD_YYYY(payroll?.paidDate)}
              </TableCell>
              <TableCell
                sx={{
                  color: payroll?.status === 'true' || payroll?.status === true?  '#37DE8F' : '#FEC84A',
                }}
              >
                <Typography
                  sx={{
                    // width: 'fit-content',
                    padding: '4px 10px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    background:
                    payroll?.status === 'true' || payroll?.status === true ? '#072718': '#473200',
                    textAlign: 'center'
                  }}
                >

                  {payroll?.status === 'true' || payroll?.status === true ? 'Paid' : 'Unpaid'}
                </Typography>
              </TableCell>

              <TableCell>
                {payroll?.totalHours ? payroll.totalHours + ' Hrs' : ''}
              </TableCell>

              <TableCell>
                $
                {(
                  parseFloat(payroll?.totalPayment)
                  // c
                )?.toFixed(2)}
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
 }

 export default PayrollTable
