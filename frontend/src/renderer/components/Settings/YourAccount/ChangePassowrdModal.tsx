import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Typography, useTheme, Input } from '@mui/material';
import Overlay from '../Wallet/Common/Modal';
import classes from './styles.module.css';
import axios from 'axios';
import { API_URL } from 'config';
const token = localStorage.getItem('Authorization');



interface $Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnChange: (value: string, name: string) => void;
  password?: any;
  enableButton?: any;
  setPassword?: any;
}

export default function ChangePasswordModal({
  open,
  setOpen,
  handleOnChange,
  password,
  enableButton,
  setPassword,
}: $Props) {
  const cancelHandler = () => {
    setOpen(false);
    setPassword({
      confirmPassword: '',
      newPassword: '',
      prevPassword: '',
    });
  };

  const submitPassword = async() => {
    try{
      const user_Id = localStorage.getItem("UserId")
      if (password.newPassword == password.confirmPassword) {
      const response= await axios.put(`${API_URL}/users/${user_Id}`,
        {
          oldPassword:password.prevPassword,
          newPassword:password.newPassword,
          confirmNewPassword:password.confirmPassword
        },
        {
          headers: {
            
            Authorization: `Bearer ${token}`,
        }
      }
        )
       console.log("response",response);
       
        setOpen(false);
        setPassword({
          confirmPassword: '',
          newPassword: '',
          prevPassword: '',
        });
      }
    }
   catch{
    console.log("Password Not changed");
   }
  } 

  const handleModalClose = () => {
    setOpen(false);
  };


  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Overlay
      heading={'Change Password'}
      open={open}
      handleClose={handleModalClose}
    >
      <Box
        sx={{
          padding: '20px',
          backgroundColor: isDarkTheme ? '#4B4B4B' : '#fff',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
        }}
      >
        <div className={classes.passwordChangeWrapper}>
          <div className={classes.inputListWrapper}>
            <Input
              placeholder="Previous password"
              name="prevPassword"
              onChange={(e) => handleOnChange(e.target.value, 'prevPassword')}
              value={password.prevPassword}
            />
            <Input
              placeholder="New password"
              name="newPassword"
              onChange={(e) => handleOnChange(e.target.value, 'newPassword')}
              value={password.newPassword}
            />
            <Input
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={(e) =>
                handleOnChange(e.target.value, 'confirmPassword')
              }
              value={password.confirmPassword}
            />
            {password.newPassword != password.confirmPassword &&
              password.confirmPassword && (
                <Typography color={'red'} fontSize={'10px'}>
                  Password not matched
                </Typography>
              )}
          </div>
        </div>
        <div className={classes.buttonWrapper}>
        <Button
                  variant="outlined"
                  fullWidth
                  sx={{ textTransform: 'capitalize',fontWeight:"500" }}
                  onClick={cancelHandler}
                >
                 CANCEL
                </Button>
         
          <Button
            onClick={submitPassword}
            variant="contained"
            fullWidth
          >
            <Typography sx={{ color: '#fff' }}>
              Save
            </Typography>
          </Button>
        </div>
      </Box>
      {/* <Box
        sx={{
          backgroundColor: isDarkTheme ? '#4B4B4B' : '#fff',
        }}
      >
        <form
          className={styles.modalBody}
          id="addEmployee"
        //   onSubmit={handleSubmit}
        >
          <Stack
            gap="10px"
            sx={{
              marginInline: '30px',
              paddingTop: '31px',
              paddingBottom: '50px',
            }}
            className={styles.inputListWrapper}
          >
            <Box>
              <InputWithLabel
                label="Previous Password"
                inputIdentifierName="password"
                placeholder="Enter previous password"
                // register={register as any}
              />
              <InputWithLabel
                label="New Password"
                inputIdentifierName="password"
                placeholder="Enter new password"
                // register={register as any}
              />
                <InputWithLabel
                label="Confirm new Password"
                inputIdentifierName="password"
                placeholder="Confirm new password"
                // register={register as any}
              />
            </Box>
          </Stack>
        </form>
      </Box> */}

      {/* <ModalFooter
        addHandler={addHandler}
        cancelHandler={cancelHandler}
        addText={'Save'}
        // isLoading={isLoading}
        id="changepassword"
      /> */}
    </Overlay>
  );
}
