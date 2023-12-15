import { useEffect, useState } from 'react';
import ChangepictureSvg from 'renderer/assets/svg/ChangePictureSvg';
import ProfilePic from 'renderer/assets/png/profile.jpg';
import EditSvg from 'renderer/assets/svg/EditSvg';
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import classes from './styles.module.css';
import fetchReq from 'utils/fetch';
import ChangePasswordModal from './ChangePassowrdModal';
import axios from 'axios';
import { API_URL } from 'config';
import _ from 'lodash';
import { t } from 'i18next';

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
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  const [OpenAddEmployee, setOpenAddEmployee] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>('');
  const [agencyImage, setAgencyImage] = useState<any>('');
  const [password, setPassword] = useState({
    confirmPassword: '',
    newPassword: '',
    prevPassword: '',
  });
  const token = localStorage.getItem('Authorization');
  const [userData, setUserData] = useState({
    user: {
      name: '',
      email: '',
    },
    agency: {
      agencyName: '',
      email: '',
    },
  });

  const [editUserDetail, setEditUserDetail] = useState(false);
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

  const fetchUserDetail = () => {
    let endpoint = 'verify';
    let options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.message == 'verify') {
          setUserData(res.data);
        }
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const handelAccountDetail = async () => {
    try {
      const _Id = userData?.user?._id;
      const token = localStorage.getItem('Authorization');
      if (userData?.user?.isEmployee == true) {
        const response = await axios.put(
          `${API_URL}/employee/updateEmployeeSetting/${_Id}`,
          {
            name: userData.user.firstName,
            email: userData.user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'personal detail======');
      } else if (userData?.user?.isAgency == true) {
        const response = await axios.put(
          `${API_URL}/agency/updateAgencySetting/${_Id}`,
          {
            agencyName: userData.agency.agencyName,
            email: userData.user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'admin data======');
      }
      setEditUserDetail(false);
    } catch {
      console.log("can't update api error");
    }
  };

  const handleProfileImage = (e: any) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleAgencyImage = (e: any) => {
    if (e.target.files) {
      setAgencyImage(e.target.files[0]);
    }
  };

  return (
    <>
      {userData && (
        <div className={classes.wrapper}>
          <div className={classes.profilePicWrap}>
            {/* <img
          src={ProfilePic}
          alt="profile pic"
          className={classes.profilePicImage}
        /> */}

            {/* <div className={classes.changePictureTextWrapper}>
        <div className={classes.changePictureText}>Change Picture</div>
          <div className={classes.changePictureIcon}>
          <ChangepictureSvg />
          </div>
        </div> */}
            {!editUserDetail ? (
              <>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => setOpenAddEmployee(!OpenAddEmployee)}
                >
                  {t('Change Password')}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ color: '#fff', textTransform: 'capitalize' }}
                  onClick={() => {
                    setEditUserDetail(true);
                  }}
                >
                  {t('Edit')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  variant="outlined"
                  className={classes.passwordheading}
                  onClick={() => setEditUserDetail(false)}
                >
                  {t('Cancel')}
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  sx={{ color: '#fff' }}
                  className={classes.savebutton}
                  onClick={() => {
                    handelAccountDetail();
                  }}
                >
                  {t('Save')}
                </Button>
              </>
            )}
          </div>
          {/* <div className={classes.nameWrap}>
        <div className={classes.profileNameText}>John Doe</div>
        <IconButton aria-label="edit" onClick={()=>setEditUserDetail(true)}>
       <EditSvg />
      </IconButton>
      </div> */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <Stack width={'100%'} gap={'10px'}>
              <Typography fontSize={'22px'} fontWeight={600}>
                {t('Personal Info')}
              </Typography>
              <Stack gap={'10px'}>
                <Typography color={'gray'}>{t('Picture')}</Typography>
                <div className={classes.changePictureTextWrapper}>
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      className={classes.profilePicImage}
                    />
                  ) : (
                    <img
                      src={ProfilePic}
                      className={classes.profilePicImage}
                    ></img>
                  )}

                  <Button
                    aria-label="edit"
                    sx={{
                      padding: '5px 5px',
                      fontSize: '5px',
                      cursor: 'pointer',
                    }}
                    // disabled={!editUserDetail}
                  >
                    <label
                      className={classes.changePictureText}
                      htmlFor="profile-input"
                    >
                      {t('Change Picture')}
                      <input
                        type="file"
                        accept="image/png"
                        style={{
                          border: '1px solid red',
                          position: 'absolute',
                          display: 'none',
                          cursor: 'pointer',
                        }}
                        id="profile-input"
                        onChange={(e) => handleProfileImage(e)}
                      />
                      <div className={classes.changePictureIcon}>
                        <ChangepictureSvg />
                      </div>
                    </label>
                  </Button>
                  {/* <div className={classes.changePictureText}>
                    Change Picture
                    <div className={classes.changePictureIcon}>
                      <ChangepictureSvg />
                    </div>
                  </div> */}
                </div>
                <Typography color={'gray'}>{t('User Name')}</Typography>
                <input
                  placeholder="Enter user name"
                  value={userData?.user?.firstName}
                  disabled={!editUserDetail}
                  onChange={(e) =>
                    setUserData((prev: any) => {
                      return {
                        ...prev,
                        user: {
                          ...prev.user,
                          firstName: e.target.value,
                        },
                      };
                    })
                  }
                  style={{
                    borderRadius: '3px',
                    border: '1px solid #aaa',
                    padding: '12px',
                    width: '80%',
                    marginTop: '2px',
                    boxSizing: 'border-box',
                    backgroundColor: isDarkTheme
                      ? editUserDetail
                        ? '#000'
                        : '#36454F'
                      : editUserDetail
                      ? '#EAF1FF'
                      : '#D3D3D3',
                    color: isDarkTheme
                      ? editUserDetail
                        ? '#fff'
                        : 'gray'
                      : editUserDetail
                      ? '#000'
                      : 'gray',
                  }}
                />
                <Typography color={'gray'}>{t('E-mail')}</Typography>
                <input
                  placeholder="Enter user email"
                  value={userData?.user?.email}
                  disabled={!editUserDetail}
                  onChange={(e) =>
                    setUserData((prev: any) => {
                      return {
                        ...prev,
                        user: {
                          ...prev.user,
                          email: e.target.value,
                        },
                      };
                    })
                  }
                  style={{
                    borderRadius: '3px',
                    border: '1px solid #b2b8b4',
                    padding: '12px',
                    width: '80%',
                    marginTop: '2px',
                    boxSizing: 'border-box',
                    backgroundColor: isDarkTheme
                      ? editUserDetail
                        ? '#000'
                        : '#36454F'
                      : editUserDetail
                      ? '#EAF1FF'
                      : '#D3D3D3',
                    color: isDarkTheme
                      ? editUserDetail
                        ? '#fff'
                        : 'gray'
                      : editUserDetail
                      ? '#000'
                      : 'gray',
                  }}
                />
              </Stack>
            </Stack>
            <Stack width={'100%'} gap={'10px'}>
              <Typography fontSize={'22px'} fontWeight={600}>
                {t('Agency Info')}
              </Typography>
              <Stack gap={'10px'}>
                <Typography color={'gray'}>{t('Picture')}</Typography>
                <div className={classes.changePictureTextWrapper}>
                  {agencyImage ? (
                    <img
                      src={URL.createObjectURL(agencyImage)}
                      className={classes.profilePicImage}
                    />
                  ) : (
                    <img
                      src={ProfilePic}
                      className={classes.profilePicImage}
                    ></img>
                  )}
                  <Button
                    sx={{
                      padding: '5px 5px',
                      fontSize: '5px',
                      cursor: 'pointer',
                    }}
                    // disabled={!editUserDetail}
                  >
                    <label
                      className={classes.changePictureText}
                      htmlFor="agency-input"
                    >
                      {t('Change Picture')}
                      <input
                        type="file"
                        accept="image/png"
                        style={{
                          position: 'absolute',
                          display: 'none',
                          cursor: 'pointer',
                        }}
                        id="agency-input"
                        onChange={(e) => handleAgencyImage(e)}
                      />
                      <div className={classes.changePictureIcon}>
                        <ChangepictureSvg />
                      </div>
                    </label>
                  </Button>
                  {/* <div className={classes.changePictureText}>
                    Change Picture
                    <div className={classes.changePictureIcon}>
                      <ChangepictureSvg />
                    </div>
                  </div> */}
                </div>
                <Typography color={'gray'}>{t('Agency Name')}</Typography>
                <input
                  placeholder="Enter agency name"
                  value={userData?.agency?.agencyName}
                  disabled={userData.user.isAgency==false ? editUserDetail:!editUserDetail}
                  onChange={(e) =>
                    setUserData((prev: any) => {
                      return {
                        ...prev,
                        agency: {
                          ...prev.agency,
                          agencyName: e.target.value,
                        },
                      };
                    })
                  }
                  style={{
                    borderRadius: '3px',
                    border: '1px solid #aaa',
                    padding: '12px',
                    width: '80%',
                    marginTop: '2px',
                    boxSizing: 'border-box',
                    backgroundColor: isDarkTheme
                      ? editUserDetail
                        ?  userData?.user?.isAgency == false ? '#36454F':'#000'
                        : '#36454F'
                      : editUserDetail
                      ? userData?.user?.isAgency == false ? '#D3D3D3':'#EAF1FF'
                      : '#D3D3D3',
                    color: isDarkTheme
                      ? editUserDetail
                        ? '#fff'
                        : 'gray'
                      : editUserDetail
                      ? '#000'
                      : 'gray',
                  }}
                />
                <Typography color={'gray'}>{t('E-mail')}</Typography>
                <input
                  placeholder="Enter agency email"
                  value={userData?.agency?.userId?.email}
                  disabled={userData?.user?.isAgency === false ? editUserDetail:!editUserDetail}
                  onChange={(e) =>
                    setUserData((prev: any) => {
                      return {
                        ...prev,
                        agency: {
                          ...prev.agency,
                          email: e.target.value,
                        },
                      };
                    })
                  }
                  style={{
                    borderRadius: '3px',
                    border: '1px solid #aaa',
                    padding: '12px',
                    width: '80%',
                    marginTop: '2px',
                    boxSizing: 'border-box',
                    backgroundColor: isDarkTheme
                      ? editUserDetail 
                        ?  userData?.user?.isAgency == false ? '#36454F':'#000'
                        : '#36454F'
                      : editUserDetail
                      ?  userData?.user?.isAgency == false ? '#D3D3D3':'#EAF1FF'
                      : '#D3D3D3',
                    color: isDarkTheme
                      ? editUserDetail
                        ? '#fff'
                        : 'gray'
                      : editUserDetail
                      ? '#000'
                      : 'gray',
                  }}
                />
              </Stack>
            </Stack>
          </Box>

          <ChangePasswordModal
            open={OpenAddEmployee}
            setOpen={setOpenAddEmployee}
            handleOnChange={handleOnChange}
            password={password}
            enableButton={enableButton}
            setPassword={setPassword}
          />
        </div>
      )}
    </>
  );
}

export default YourAccount;
