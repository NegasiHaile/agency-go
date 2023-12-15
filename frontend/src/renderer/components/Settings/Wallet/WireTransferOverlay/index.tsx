import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, Stack } from '@mui/material';
import Overlay from '../Common/Modal';
import classes from './styles.module.css';
import {
  DropdownWithLabel,
  InputWithLabel,
  LabelText,
  ModalFooter,
} from '../Common/ModalComponents';
import { countryList } from '../constant';

export default function WireTransferOverlay() {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({
    beneficaryName: '',
    accountNumber: '',
    street: '',
    town: '',
    zipCode: '',
    country: '',
    swiftCode: '',
    intermeditarySwiftCode: '',
  });

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addHandler = () => {
    console.log('add handler clicked');
  };

  const cancelHandler = () => {
    console.log('cancel handler');
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  return (
    <Overlay
      heading="Add Wire Transfer Details"
      open={open}
      handleClose={handleModalClose}
    >
      <div className={classes.modalBody}>
        <div className={classes.radioButtonGroupWrapper}>
          <FormControl>
            <LabelText label="Account type" />
            <Stack direction="row">
              <FormControlLabel
                value="personal"
                control={<Radio />}
                label="Personal"
                sx={{
                  fontSize: '11px',
                }}
              />
              <FormControlLabel
                value="corporate"
                control={<Radio />}
                label="Corporate"
                sx={{
                  fontSize: '11px',
                }}
              />
            </Stack>
          </FormControl>
        </div>
        <div className={classes.inputListWrapper}>
          <InputWithLabel
            label="Beneficiary Name"
            value={data.beneficaryName}
            inputIdentifierName="beneficaryName"
            placeholder=""
            handleOnChange={handleChange}
          />
          <InputWithLabel
            label="Account Number"
            value={data.accountNumber}
            inputIdentifierName="accountNumber"
            placeholder=""
            handleOnChange={handleChange}
          />
          <InputWithLabel
            label="Street"
            value={data.street}
            inputIdentifierName="street"
            placeholder=""
            handleOnChange={handleChange}
          />
          <InputWithLabel
            label="Town/City"
            value={data.town}
            inputIdentifierName="town"
            placeholder=""
            handleOnChange={handleChange}
          />
          <InputWithLabel
            label="Postal/Zip Code"
            value={data.zipCode}
            inputIdentifierName="zipCode"
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
          <InputWithLabel
            label="BIC/SWIFT Cod"
            value={data.swiftCode}
            inputIdentifierName="swiftCode"
            placeholder=""
            handleOnChange={handleChange}
          />
          <InputWithLabel
            label="Intermediary Bank BIC/SWIFT Code"
            value={data.intermeditarySwiftCode}
            inputIdentifierName="intermeditarySwiftCode"
            placeholder=""
            handleOnChange={handleChange}
          />
        </div>
      </div>
      <ModalFooter addHandler={addHandler} cancelHandler={cancelHandler} />
    </Overlay>
  );
}
