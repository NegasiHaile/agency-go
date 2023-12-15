import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'

import { Divider, IconButton, Switch, styled, useTheme } from '@mui/material';
import { InputWithLabel } from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { useState } from 'react';
import {useFormik} from 'formik';


import TextField from '@mui/material/TextField';
import { API_URL } from 'config';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  borderRadius: '10px',
  boxShadow: 24,
  p: 2,
};

const frequencyFilter = ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Yearly'];
export default function CustomInvoiceModal({ userData, open, setOpen, setCreateInvoiceModalOpen }: any) {
  const handleClose = () => setOpen(false);

  const initialValues = {
    companyName: userData?.companyName? userData?.companyName:'',
    amount: userData?.amount,
    description: '',
    employeeId: userData?._id,
    status: true,
    userId: userData?._id,
    number: '',
    date: new Date(),
    recurringInvoice: true,
    recurringTimeline: true,
    autoEmailNotification: true,
    autoTextNotification: true,
    triggerWithdrawal: true,
    frequency: 'Daily',
  };

  const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log("values:", values);
      await handleCreateInvoice(values);
      handleClose();
      setCreateInvoiceModalOpen(true); // Opening the list of invoice templates container modal
    },
  });

  const handleCreateInvoice = async (value: any) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    };
    try {
      const response = await fetch(`${API_URL}/invoicing`, options);
        const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';

  return (
    
    <Modal
      sx={{ backdropFilter: 'blur(4px)'}}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{...style, backgroundColor: isDarkTheme ? '#111' : '#fff'}}>
          <Box
            sx={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', margin: '10px 0px'}}>
            <Typography> Create Invoice </Typography>
            <IconButton aria-label="close" size="small"
             onClick={handleClose}>
              <CloseIcon fontSize="inherit" sx={{color:isDarkTheme? "#fff" : "#454545"}} />
            </IconButton>
          </Box>

          <Divider />

          <Box display={'flex'} justifyContent={'space-between'} marginBottom={'25px'} alignItems={'end'}>
            <Box>
              <Typography fontSize={'18px'}>To</Typography>
              <Typography sx={{ fontSize: '14px' }}>
                <b>{`${userData?.firstName} ${userData?.lastName}`}</b>
                <br />
                {`${userData?.email} `}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '14px' }}>{new Date().toLocaleDateString()}</Typography>
            </Box>
          </Box>

          <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={'24px'}
            margin={'12px 0px'}
          >
            <TextField id="outlined-basic" fullWidth size='small' name="companyName" value={values.companyName} placeholder='Agency Go' onChange={handleChange} />
            <TextField id="outlined-basic" fullWidth type='number' size='small' name="amount" value={values.amount} placeholder="$1,203" onChange={handleChange} />
          </Box>

          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} margin={'8px 0px'}>
            <Typography sx={{ fontSize: '16px', marginTop: '10px', fontWeight: '500' }}>
              Recurring invoice
            </Typography>
            <AntSwitch
              checked={values.recurringInvoice}
              onClick={()=> setFieldValue("recurringInvoice", !values.recurringInvoice)}
              inputProps={{ 'aria-label': 'ant design' }}
            />
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} margin={'8px 0px'}>
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Recurring Timeline
            </Typography>
            <AntSwitch
              checked={values.recurringTimeline}
              onClick={()=> setFieldValue("recurringTimeline", !values.recurringTimeline)}
              inputProps={{ 'aria-label': 'ant design' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              margin: '10px 0px',
            }}
          >
            <Box>
              <Typography> Pick frequency</Typography>
              <Box sx={{ borderRadius: '10px', marginTop: '5px' }}>
                <FrequencySelector frequencyFilter={frequencyFilter} value={values.frequency} setFieldValue={setFieldValue} />
              </Box>
            </Box>
          </Box>
          
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            margin={'8px 0px'}
          >
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Automatic Email notification
            </Typography>
            <AntSwitch
              checked={values.autoEmailNotification}
              onClick={()=> setFieldValue("autoEmailNotification", !values.autoEmailNotification)}
              inputProps={{ 'aria-label': 'ant design' }}
            />
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            margin={'8px 0px'}
          >
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Automatic Text notification
            </Typography>
            <AntSwitch
              checked={values.autoTextNotification}
              onClick={()=> setFieldValue("autoTextNotification", !values.autoTextNotification)}
              inputProps={{ 'aria-label': 'ant design' }}
            />
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            margin={'8px 0px'}
          >
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
             Trigger Withdrawal
            </Typography>
            <AntSwitch
              name='triggerWithdrawal'
              checked={values.triggerWithdrawal}
              inputProps={{ 'aria-label': 'ant design' }}
              onClick={()=> setFieldValue("triggerWithdrawal", !values.triggerWithdrawal)}
            />
          </Box>
          
          <Box sx={{display: 'flex', justifyContent: 'end !important', margin: '12px 0px'}}>
            <Box>
              <InputWithLabel
                label="Enter Number"
                inputIdentifierName="number"
                value={values.number}
                placeholder="+1 (209) - 424- 23"
                inputStyle={{
                  color: isDarkTheme ? '#fff' : '#000',
                  border: '1px solid ',
                  borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
                  backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
                  width: '100%',
                }}
                handleOnChange={setFieldValue}
              />
            </Box>
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} gap={'8px'} padding={'50px 10px 10px'}>
            <Button
              sx={{ color: '#fff', textTransform: 'capitalize' }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit" // Specify the type as "submit"
              sx={{ color: '#fff', textTransform: 'capitalize' }}
            >
              Create Invoice
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const FrequencySelector = ({ frequencyFilter, value, setFieldValue }: any) => {
   const theme = useTheme();
   const isDarkTheme = theme.palette.mode === 'dark';

   const isSelected =(item:string, value:string)=>{
    return item.toLowerCase() === value.toLowerCase()
   }

  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid #04A1FF',
        width: 'fit-content',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      {frequencyFilter.map((item: string, index: number) => (
        <Box
          sx={{
            bgcolor: isSelected(item, value) ? '#04A1FF' : 'transparent',
            cursor: 'pointer',
            padding: '8px 10px',
            border: '1px solid #04A1FF',
            color: isSelected(item, value) ? '#fff' : isDarkTheme ? '#fff': '#000',
          }}
          key={index}
          onClick={() => setFieldValue("frequency", item)}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
};
