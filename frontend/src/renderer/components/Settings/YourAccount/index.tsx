import React, { useState } from 'react';

import ChangepictureSvg from 'renderer/assets/svg/ChangePictureSvg';

import ProfilePic from 'renderer/assets/png/profile.jpg';
import EditSvg from 'renderer/assets/svg/EditSvg';
import { Button, Typography, useTheme } from '@mui/material';
import classes from './styles.module.css';

interface InputProps {
  placeholder: string;
  name: string;
  value: string;
  handleOnChange: (value: string, name: string) => void;
}
function Input(props: InputProps) {
  const { placeholder, name, handleOnChange, value } = props;
const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';


  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => handleOnChange(e.target.value, name)}
      className={classes.inputWrap}
      value={value}
      style={{ color: isDarkTheme ? '#fff' : '#000' }}
    />
  );
}
function YourAccount() {
  const [password, setPassword] = useState({
    confirmPassword: '',
    newPassword: '',
    prevPassword: '',
  });
  const handleOnChange = (value: string, name: string) => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const enableButton =
    password.confirmPassword &&
    password.newPassword &&
    password.confirmPassword === password.newPassword;
  return (
    <div className={classes.wrapper}>
      <div className={classes.profilePicWrap}>
        <img
          src={ProfilePic}
          alt="profile pic"
          className={classes.profilePicImage}
        />

        <div className={classes.changePictureTextWrapper}>
          <div className={classes.changePictureText}>Change Picture</div>
          <div className={classes.changePictureIcon}>
            <ChangepictureSvg />
          </div>
        </div>
      </div>
      <div className={classes.nameWrap}>
        <div className={classes.profileNameText}>John Doe</div>
        <EditSvg />
      </div>
      <div className={classes.passwordChangeWrapper}>
        <div className={classes.inputListWrapper}>
          <Input
            placeholder="Previous password"
            name="prevPassword"
            handleOnChange={handleOnChange}
            value={password.prevPassword}
    
          />
          <Input
            placeholder="New password"
            name="newPassword"
            handleOnChange={handleOnChange}
            value={password.newPassword}
          />
          <Input
            placeholder="Confirm password"
            name="confirmPassword"
            handleOnChange={handleOnChange}
            value={password.confirmPassword}
          />
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: 'your-desired-color-here',
              '&.Mui-disabled': {
                backgroundColor: 'rgba(4, 161, 255, 0.32)',
              },
            }}
          >
            <Typography fontWeight={500} fontSize="14px" sx={{ color: '#fff' }}>
              Save
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default YourAccount;
