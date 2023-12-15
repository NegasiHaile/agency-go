import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Switch, styled } from '@mui/material';
import { InputWithLabel } from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { useState } from 'react';
import { useFormik } from 'formik';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
};
const frequencyFilter = ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Yearly'];
export default function ViewModal({ open, setOpen, userData }: any) {
  const handleClose = () => setOpen(false);
  console.debug(userData, 'data');
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

  return (
    <Modal
      className="boxsize"
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
            }}
          >
            <Typography sx={{ fontSize: '40px', padding: '10px' }}>
              {' '}
              View Data{' '}
            </Typography>
            <span style={{ fontSize: '30px', padding: '10px' }}>
              {userData?.userName}
            </span>
          </Box>
          <div
            className="bvb"
            style={{
              boxSizing: 'border-box',
              backgroundColor: '#625f5f',
              padding: '30px',
            }}
          >
            <h3>
              Amount : <span>{userData?.amount}</span>
            </h3>
            <h3>
              Status :{' '}
              <span>{userData?.status ? 'Delivery' : 'unDelivery'}</span>
            </h3>
            <h3>
              Date : <span>10\1\2000</span>
            </h3>
            <h3>
              Status : <span>{userData?.isEmployee ? 'Paid' : 'unPaid'}</span>
            </h3>
            <h3>
              balanceDue : <span>{userData?.balanceDue}</span>
            </h3>
            <h3>
              addressShipTo : <span>{userData?.addressShipTo}</span>
            </h3>
            <h3>
              address : <span>{userData?.address}</span>
            </h3>
            <h3>
              clientCompanyName : <span>{userData?.clientCompanyName}</span>
            </h3>
            <h3>
              contactDetails : <span>{userData?.contactDetails}</span>
            </h3>
            <h3>
              email : <span>{userData?.email}</span>
            </h3>
            <h3>
              subtotal : <span>{userData?.subtotal}</span>
            </h3>
            <h3>
              subtotalLessDiscount :{' '}
              <span>{userData?.subtotalLessDiscount}</span>
            </h3>
            <h3>
              total : <span>{userData?.total}</span>
            </h3>{' '}
            <h3>
              totalTax : <span>{userData?.totalTax}</span>
            </h3>{' '}
            <h3>
              unitPrice : <span>{userData?.unitPrice}</span>
            </h3>
          </div>
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
