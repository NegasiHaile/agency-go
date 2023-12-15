import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Switch, styled } from '@mui/material';
import { InputWithLabel } from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { useState } from 'react';
import { useFormik } from 'formik';
import { API_URL } from 'config';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1280,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
};
const frequencyFilter = ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Yearly'];
export default function PromoTacker({ open, setOpen, userData }: any) {
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
      const response = await fetch(`${API_URL}/invoicing`, options);
      if (response.ok) {
        const data = await response.json();
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
      <Box sx={style}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <div>
            <h3>Free trail Link</h3>
          </div>
          <div
            style={{
              backgroundColor: '#f1920f',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderRadius: '10px',
              padding: '0px 5px',
            }}
          >
            <h3>Extension in demo mode</h3>
            <h3>
              Unlock full access to data - <b>Active Now</b>
            </h3>
          </div>
          <div style={{ width: '100%', backgroundColor: 'black' }}>
            <table className="modal-table" style={{ border: '0' }}>
              <tr
                style={{
                  width: '100%',
                  padding: '10px',
                  borderBottom: '1px solid gray',
                }}
              >
                <th style={{ width: '40%', border: 'none', textAlign: 'left' }}>
                  Link
                </th>
                <th style={{ width: '10%', border: 'none', textAlign: 'left' }}>
                  Claims
                </th>
                <th style={{ width: '10%', border: 'none', textAlign: 'left' }}>
                  Promo Cost
                </th>
                <th style={{ width: '10%', border: 'none', textAlign: 'left' }}>
                  Revenue
                </th>
                <th style={{ width: '10%', border: 'none', textAlign: 'left' }}>
                  Profit
                </th>
                <th style={{ width: '10%', border: 'none', textAlign: 'left' }}>
                  ROI
                </th>
                <th
                  style={{ width: '10%', border: 'none', textAlign: 'left' }}
                ></th>
              </tr>

              <tr>
                <td style={{ border: 'none', textAlign: 'left' }}>
                  reddit main page 1 month free trail
                </td>
                <td style={{ border: 'none', textAlign: 'left' }}>1 </td>
                <td style={{ border: 'none', textAlign: 'left' }}>Not set</td>
                <td style={{ border: 'none', textAlign: 'left', color: 'red' }}>
                  $0
                </td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>actions</td>
              </tr>
              <tr>
                <td style={{ border: 'none', textAlign: 'left' }}>
                  Twitter 1 month free trail
                </td>
                <td style={{ border: 'none', textAlign: 'left' }}>1 </td>
                <td style={{ border: 'none', textAlign: 'left' }}>Not set</td>
                <td
                  style={{ border: 'none', textAlign: 'left', color: 'green' }}
                >
                  $100
                </td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>actions</td>
              </tr>
              <tr>
                <td style={{ border: 'none', textAlign: 'left' }}>
                  SnapChat(7 days free trail)
                </td>
                <td style={{ border: 'none', textAlign: 'left' }}>1 </td>
                <td style={{ border: 'none', textAlign: 'left' }}>Not set</td>
                <td
                  style={{ border: 'none', textAlign: 'left', color: 'green' }}
                >
                  $4
                </td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>actions</td>
              </tr>

              <tr>
                <td style={{ border: 'none', textAlign: 'left' }}>
                  SnapChat 7 days free trail
                </td>
                <td style={{ border: 'none', textAlign: 'left' }}>1 </td>
                <td style={{ border: 'none', textAlign: 'left' }}>Not set</td>
                <td
                  style={{ border: 'none', textAlign: 'left', color: 'green' }}
                ></td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>actions</td>
              </tr>
              <tr>
                <td style={{ border: 'none', textAlign: 'left' }}>
                  SnapChat 7 days free trail
                </td>
                <td style={{ border: 'none', textAlign: 'left' }}>1 </td>
                <td style={{ border: 'none', textAlign: 'left' }}>Not set</td>
                <td
                  style={{ border: 'none', textAlign: 'left', color: 'green' }}
                ></td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>-</td>
                <td style={{ border: 'none', textAlign: 'left' }}>actions</td>
              </tr>
            </table>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '10px',
              }}
            >
              <h2>Load more </h2>
            </div>
          </div>
          <div
            onClick={handleClose}
            style={{
              width: '80px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'gray',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <h4>Close</h4>
          </div>
        </div>
      </Box>
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
