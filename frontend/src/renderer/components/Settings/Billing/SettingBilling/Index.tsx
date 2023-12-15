import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Overlay from '../../Wallet/Common/Modal';
import classes from '../../Wallet/Common/Modal/styles.module.css';
import {
  DropdownWithLabel,
  InputWithLabel,
  LabelText,
  ModalFooter,
} from '../../Wallet/Common/ModalComponents';
import { countryList } from '../../Wallet/constant';

export default function SettingBilling() {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({
    CompanylegalName: '',
    TaxID: '',
    email: '',
    town: '',
    City: '',
    country: '',
    zipcode: '',
    streetaddress: '',
  });

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addHandler = () => {
    setOpen(false);
  };

  const cancelHandler = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';


  return (
    <Overlay heading="Setting" open={open} handleClose={handleModalClose}>
      <Box sx={{ backgroundColor: isDarkTheme ? '#4B4B4B' : '#fff' }}>
        <div className={classes.modalBody}>
          <Box
            sx={{
              marginRight: '30px',
              marginLeft: '30px',
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
            className={classes.inputListWrapper}
          >
            <InputWithLabel
              label="Company Legal Name"
              value={data.CompanylegalName}
              inputIdentifierName="CompanylegalName"
              placeholder=""
              handleOnChange={handleChange}
            />
            <InputWithLabel
              label="VAT Number/Tax ID"
              value={data.TaxID}
              inputIdentifierName="TaxID"
              placeholder=""
              handleOnChange={handleChange}
            />
            <InputWithLabel
              label="Email"
              value={data.email}
              inputIdentifierName="email"
              placeholder=""
              handleOnChange={handleChange}
            />
            <DropdownWithLabel
              label="Country"
              value={data.country}
              inputIdentifierName="country"
              options={countryList}
              handleOnChange={handleChange}
            />
            <DropdownWithLabel
              label="City"
              value={data.City}
              inputIdentifierName="City"
              options={countryList}
              handleOnChange={handleChange}
            />

            <InputWithLabel
              label="Post/Zip Code"
              value={data.zipcode}
              inputIdentifierName="zipcode"
              placeholder=""
              handleOnChange={handleChange}
            />
            <InputWithLabel
              label="Street Address"
              value={data.streetaddress}
              inputIdentifierName="streetaddress"
              placeholder=""
              handleOnChange={handleChange}
            />
          </Box>
        </div>
      </Box>

      <ModalFooter addHandler={addHandler} cancelHandler={cancelHandler} />
    </Overlay>
  );
}
