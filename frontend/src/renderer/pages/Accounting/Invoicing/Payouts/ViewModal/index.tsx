import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Switch, styled, useTheme } from '@mui/material';
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
  boxShadow: 24,
};

export default function ViewModal({ open, setOpen, invoiceData }: any) {
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Modal
      className="boxsize"
      sx={{ backdropFilter: 'blur(4px)' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box sx={{...style, backgroundColor: isDarkTheme ? '#181818' : '#EAF1FF',}} >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: '40px', padding: '10px' }}> View Data</Typography>
            <span style={{ fontSize: '30px', padding: '10px' }}>
              {invoiceData?.userName}
            </span>
          </Box>
          <div
            className="bvb"
            style={{
              boxSizing: 'border-box',
              backgroundColor: isDarkTheme ? '#292929' : '#FFFFFF',
              padding: '30px',
            }}
          >
            <h3>
              Amount : <span>{invoiceData?.amount}</span>
            </h3>
            <h3>
              Status :{' '}
              <span>{invoiceData?.status ? 'Delivery' : 'unDelivery'}</span>
            </h3>
            <h3>
              Date : <span>10\1\2000</span>
            </h3>
            <h3>
              Status : <span>{invoiceData?.isEmployee ? 'Paid' : 'unPaid'}</span>
            </h3>
            <h3>
              balanceDue : <span>{invoiceData?.balanceDue}</span>
            </h3>
            <h3>
              addressShipTo : <span>{invoiceData?.addressShipTo}</span>
            </h3>
            <h3>
              address : <span>{invoiceData?.address}</span>
            </h3>
            <h3>
              clientCompanyName : <span>{invoiceData?.clientCompanyName}</span>
            </h3>
            <h3>
              contactDetails : <span>{invoiceData?.contactDetails}</span>
            </h3>
            <h3>
              email : <span>{invoiceData?.email}</span>
            </h3>
            <h3>
              subtotal : <span>{invoiceData?.subtotal}</span>
            </h3>
            <h3>
              subtotalLessDiscount :{' '}
              <span>{invoiceData?.subtotalLessDiscount}</span>
            </h3>
            <h3>
              total : <span>{invoiceData?.total}</span>
            </h3>{' '}
            <h3>
              totalTax : <span>{invoiceData?.totalTax}</span>
            </h3>{' '}
            <h3>
              unitPrice : <span>{invoiceData?.unitPrice}</span>
            </h3>
          </div>
        </Box>
    </Modal>
  );
}

