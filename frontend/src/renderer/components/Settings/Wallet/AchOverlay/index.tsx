import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, Stack } from '@mui/material';
import Overlay from '../Common/Modal';
import classes from '../WireTransferOverlay/styles.module.css';
import {
  InputWithLabel,
  LabelText,
  ModalFooter,
} from '../Common/ModalComponents';

export default function AchOverlay() {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({
    beneficaryName: '',
    routingCode: '',
    accountNumber: '',
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
      heading="Add Bitsafe Details"
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
            label="ABA Routing Code"
            value={data.routingCode}
            inputIdentifierName="routingCode"
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
        </div>
      </div>
      <ModalFooter addHandler={addHandler} cancelHandler={cancelHandler} />
    </Overlay>
  );
}
