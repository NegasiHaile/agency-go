import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Switch, styled, useTheme } from '@mui/material';
import { InputWithLabel } from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { useState } from 'react';
import {useFormik} from 'formik'
;
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
export default function CustomInvoiceModal({ open, setOpen, userData }: any) {
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: `${userData?.firstName} ${userData?.lastName}`,
    amount: 30,
    description: 'string',
    employeeId: userData?._id,
    status: 'true',
    userId: userData?._id,
    date: new Date(),
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);
      await handleCreateInvoice(values);
      handleClose();
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
      const response = await fetch('http://localhost:3000/invoicing', options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to create the invoice');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (name: any) => {
    console.log(name);
  };

const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Modal
      sx={{ backdropFilter: 'blur(4px)' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '10px 0px',
            }}
          >
            <Typography> Create Invoice </Typography>
            <Typography onClick={handleClose} sx={{ cursor: 'pointer' }}>
              X
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: '#292929' }} />
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'end'}
          >
            <Box>
              <Typography fontSize={'18px'}>To</Typography>
              <Typography sx={{ fontSize: '14px' }}>
                {`${userData?.firstName} ${userData?.lastName}`}
                <br />
                Address here
                <br />
                {`${userData?.email} `}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '14px' }}>
                Invoice No. 001 <br />
                04, Sep 2023
              </Typography>
            </Box>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={'8px'}
            margin={'12px 0px'}
          >
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="AgencyGo"
              style={{
                color: 'white',

                border: '1px solid #292929',
                backgroundColor: '#0C0C0C',
              }}
              onChange={handleChange}
            />

            {/* <InputWithLabel
            label="Company name"
            value={data.name}
            inputIdentifierName="name"
            placeholder="AgencyGo"
            inputStyle={{
              border: '1px solid #292929',
              backgroundColor: '#0C0C0C',
            }}
            handleOnChange={handleOnChange}
          /> */}
            <input
              type="number"
              name="amount"
              value={values.amount}
              placeholder="$1,203"
              style={{
                color: isDarkTheme ? '#fff' : '#000',
                border: '1px solid ',
                borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
                backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
                height: '40px',
                borderRadius: '8px',
                width: '100%',
              }}
              onChange={handleChange}
            />
            {/* <InputWithLabel
            label="Amount"
            inputIdentifierName="amount"
            value={data.amount}
            placeholder="$1,203"
            inputStyle={{
              border: '1px solid #292929',
              backgroundColor: '#0C0C0C',
            }}
            handleOnChange={handleOnChange}
          /> */}
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            margin={'8px 0px'}
          >
            <Typography
              sx={{ fontSize: '16px', marginTop: '10px', fontWeight: '500' }}
            >
              Recurring invoice
            </Typography>
            <AntSwitch
              defaultChecked
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
              Recurring Timeline
            </Typography>
            <AntSwitch
              defaultChecked
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
                <FrequencySelector frequencyFilter={frequencyFilter} />
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
              defaultChecked
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
              defaultChecked
              inputProps={{ 'aria-label': 'ant design' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end !important',
              margin: '12px 0px',
            }}
          >
            <Box>
              <InputWithLabel
                label="Enter Number"
                inputIdentifierName="number"
                //value={data.number}
                placeholder="+1 (209) - 424- 23"
                inputStyle={{
                  color: isDarkTheme ? '#fff' : '#000',
                  border: '1px solid ',
                  borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
                  backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
                  width: '100%',
                }}
                handleOnChange={handleOnChange}
              />
            </Box>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap={'8px'}
            padding={'50px 10px 10px'}
          >
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

const FrequencySelector = ({ frequencyFilter }: any) => {

  const [selected, setSelected] = useState(1);

   const theme = useTheme();
   const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid #04A1FF',
        width: 'fit-content',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      {frequencyFilter.map((data: string, index: number) => (
        <Box
          sx={{
            bgcolor: index + 1 === selected ? '#04A1FF' : 'transparent',
            cursor: 'pointer',
            padding: '8px 10px',
            border: '1px solid #04A1FF',
            color:
              index + 1 === selected
                ? '#fff'
                : isDarkTheme
                ? '#fff'
                : '#000',
          }}
          key={index}
          onClick={() => setSelected(index + 1)}
        >
          {data}
        </Box>
      ))}
    </Box>
  );
};
