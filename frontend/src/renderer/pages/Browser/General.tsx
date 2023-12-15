import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Chip,
  FormControlLabel,
  OutlinedInput,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import Overlay from 'renderer/components/Settings/Wallet/Common/Modal';
import styles from 'renderer/components/Settings/Wallet/Common/Modal/styles.module.css';
import {
  DropdownWithLabel,
  InputWithLabel,
  ModalFooter,
} from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { Stack } from '@mui/system';
import fetchReq from 'utils/fetch';
import useFormEmployee from '../ManageEmployees/hooks/useForm';
import Dropzone from 'react-dropzone';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import { roleList } from '../ManageEmployees/constant';
import NewProfile from './NewProfile';

interface $props {
  open: boolean;
  type: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  onFormSubmit: (data: any) => void;
  handleCreate: (data: any) => void;
  dataRef: (data: any) => void;
  handleFormSubmitRef: any;
}

const General = ({
  open,
  type,
  setOpen,
  refetch,
  onFormSubmit,
  handleCreate,
  dataRef,
  handleFormSubmitRef,
}: $props) => {
  const [alignment, setAlignment] = React.useState('web');
  const [alignment2, setAlignment2] = React.useState('web');
  const [alignment3, setAlignment3] = React.useState('web');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [alignment4, setAlignment4] = React.useState('web');
  const [alignment5, setAlignment5] = React.useState('web');
  const [alignment6, setAlignment6] = React.useState('web');
  const [alignment7, setAlignment7] = React.useState('web');
  const [alignment8, setAlignment8] = React.useState('web');
  const [alignment9, setAlignment9] = React.useState('web');
  const [alignment10, setAlignment10] = React.useState('web');
  const [alignment11, setAlignment11] = React.useState('web');
  const [alignment12, setAlignment12] = React.useState('web');
  const [alignment13, setAlignment13] = React.useState('web');
  const [alignment14, setAlignment14] = React.useState('web');
  const [alignment15, setAlignment15] = React.useState('web');
  const [newData, setNewData] = useState({
    name: '',
    status: '',
    tags: '',
    proxy: '',
    changeIPURL: '',
    proxyName: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    status: '',
  });

  useEffect(() => {
    if (newData.name) {
      dataRef(newData);
    }
  }, [newData]);

  const handleNameChange = (name: string, value: string) => {
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProxyChange = (proxy: string, value: string) => {
    setNewData((prevData) => ({
      ...prevData,
      [proxy]: value,
    }));
  };

  const handlechangeIPURLChange = (changeIPURL: any, value: any) => {
    setNewData((prevData) => ({
      ...prevData,
      [changeIPURL]: value,
    }));
  };

  const handleTagsChange = (tags: any, value: any) => {
    setNewData((prevData) => ({
      ...prevData,
      [tags]: value,
    }));
  };

  const handleproxyNameChange = (proxyName: any, value: any) => {
    setNewData((prevData) => ({
      ...prevData,
      [proxyName]: value,
    }));
  };

  const handleStatusChange = (status: any, value: any) => {
    setNewData((prevData) => ({
      ...prevData,
      [status]: value,
    }));
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!newData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else {
      newErrors.name = '';
    }

    if (!newData.status.trim()) {
      newErrors.status = 'Status is required';
      isValid = false;
    } else {
      newErrors.status = '';
    }

    // Validate other fields similarly if needed

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (event) => {
   // event.preventDefault(); // Prevents default form submission behavior

    // Validate fields before submission
    const isValid = validateFields();

    // Display form data in the console
    console.log('Form Data:', newData);

    // onFormSubmit(newData);
    // Clear form data after submission (if needed)
    setNewData({
      name: '',
      status: '',
      tags: '',
      proxy: '',
      changeIPURL: '',
      proxyName: '',
    });
    // handleCreate(newData);
  };

  handleFormSubmitRef.current = { handleFormSubmit: handleFormSubmit };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleChange1 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment2(newAlignment);
  };

  const handleChange2 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment3(newAlignment);
  };

  const handleChange3 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment4(newAlignment);
  };

  const handleChange4 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment5(newAlignment);
  };

  const handleChange5 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment6(newAlignment);
  };

  const handleChange6 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment7(newAlignment);
  };

  const handleChange7 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment8(newAlignment);
  };

  const handleChange8 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment9(newAlignment);
  };

  const handleChange9 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment10(newAlignment);
  };

  const handleChange10 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment11(newAlignment);
  };

  const handleChange11 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment12(newAlignment);
  };

  const handleChange12 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment13(newAlignment);
  };

  const handleChange13 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment14(newAlignment);
  };

  const handleChange14 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment15(newAlignment);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
    console.log('Selected Files:', acceptedFiles);
  };

  const handleFileSelect = (e: any) => {
    setSelectedFiles(e.target.files[0]);
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <form onSubmit={handleFormSubmit}>
      <Box
        bgcolor={isDarkTheme ? '#0C0C0C' : '#fff'}
        display={'flex'}
        flexDirection={'column'}
        gap={'20px'}
      >
        <Box
          sx={{
            marginInline: '5px',
            justifyContent: 'space-between',
            display: 'flex',
            color: isDarkTheme ? '#fff' : '#000',
            gap: '20px',
            width: '940px',
          }}
        >
          <InputWithLabel
            label="Name"
            inputIdentifierName="name"
            placeholder="Enter name"
            handleOnChange={handleNameChange}
          />
          <Box
            sx={{
              width: '443px',
            }}
          >
            <DropdownWithLabel
              label="Status"
              inputIdentifierName="status"
              placeholder="status"
              options={roleList}
              handleOnChange={handleStatusChange}
            />
          </Box>
        </Box>

        <Typography color={isDarkTheme ? '#fff' : '#000'}> Tags</Typography>
        <Box
          sx={{
            marginInline: '5px',
            display: 'flex',
            color: isDarkTheme ? '#fff' : '#000',
            gap: '20px',
          }}
        >
          <Autocomplete
            sx={{ width: '100%' }}
            clearIcon={false}
            options={[]}
            freeSolo
            multiple
            renderTags={(value, props) =>
              value.map((option, index) => (
                <Chip label={option} {...props({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: false,
                  onChange: { handleTagsChange },
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: isDarkTheme ? '#fff' : '#000',
            gap: '14px',
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="web">WINDOWS</ToggleButton>
            <ToggleButton value="android">MACOS</ToggleButton>
            <ToggleButton value="ios">LINUX</ToggleButton>
          </ToggleButtonGroup>
          {/* <ToggleButtonGroup
          color="primary"
          value={alignment2}
          exclusive
          onChange={handleChange1}
          aria-label="Platform"
        >
          <ToggleButton value="web">NONE</ToggleButton>
          <ToggleButton value="android">FACEBOOK</ToggleButton>
          <ToggleButton value="ios">GOOGLE</ToggleButton>
        </ToggleButtonGroup> */}
          <ToggleButtonGroup
            color="primary"
            value={alignment3}
            exclusive
            onChange={handleChange2}
            aria-label="Platform"
          >
            <ToggleButton value="web">NO PROXY</ToggleButton>
            <ToggleButton value="android">NEW PROXY</ToggleButton>
            <ToggleButton value="ios">SAVED PROXIES</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            color="primary"
            value={alignment4}
            exclusive
            onChange={handleChange3}
            aria-label="Platform"
            sx={{ height: '31px', borderRadius: '8px' }}
          >
            <ToggleButton value="web">HTTP</ToggleButton>
            <ToggleButton value="android">SOCKS4</ToggleButton>
            <ToggleButton value="ios">SOCKS5</ToggleButton>
            <ToggleButton value="ssh">SSH</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: isDarkTheme ? '#fff' : '#000',
            gap: '14px',
          }}
        >
          <InputWithLabel
            label="Proxy"
            inputIdentifierName="proxy"
            placeholder="Proxy"
            handleOnChange={handleProxyChange}
          />
          <InputWithLabel
            label="Change IP URL"
            inputIdentifierName="Change IP URL"
            placeholder="Change IP URL"
            handleOnChange={handlechangeIPURLChange}
          />
          <InputWithLabel
            label="Proxy Name"
            inputIdentifierName="Proxy Name"
            placeholder="Proxy Name"
            handleOnChange={handleproxyNameChange}
          />
        </Box>
        {/* <Box>
        <Dropzone maxSize={104857600} onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <Box
                  sx={{
                    border: '1px solid #292929',
                    borderRadius: '5px',
                    padding: '10px',
                    textAlign: 'center',
                    marginTop: '10px',
                    width: '100%',
                    height: '120px',
                  }}
                >
                  <BackupOutlinedIcon
                    style={{
                      fontSize: '36px',
                      color: isDarkTheme ? '#fff' : '#000',
                    }}
                  />
                  <Typography color={ isDarkTheme ? '#fff' : '#000'}>
                    {selectedFiles.length === 0
                      ? 'Click to upload file from your computer or drag your file here'
                      : `${selectedFiles.length} image selected`}
                  </Typography>
                </Box>
              </div>
            </section>
          )}
        </Dropzone>
      </Box> */}
        <Box
          sx={{
            marginInline: '5px',
            justifyContent: 'space-between',
            display: 'flex',
            color: isDarkTheme ? '#fff' : '#000',
            gap: '20px',
          }}
        >
          {/* <InputWithLabel
          label="Login"
          inputIdentifierName="Login"
          placeholder="Login"
        />
        <InputWithLabel
          label="Password"
          inputIdentifierName="Password"
          placeholder="Password"
          type="password"
        /> */}
        </Box>
        <Box
          sx={{
            marginInline: '5px',
            justifyContent: 'space-between',
            display: 'flex',
            color: isDarkTheme ? '#fff' : '#000',
            gap: '20px',
          }}
        >
          <InputWithLabel
            label="User Agent"
            inputIdentifierName="User Agent"
            placeholder="User Agent"
          />
        </Box>
        {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: isDarkTheme ? '#fff' : '#000',
          gap: '14px',
        }}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          WEBRTC
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment5}
          exclusive
          onChange={handleChange4}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            OFF
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="ios" sx={{ fontSize: '12px' }}>
            ALTERED
          </ToggleButton>
          <ToggleButton value="manual" sx={{ fontSize: '12px' }}>
            MANUAL
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          Canvas
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment6}
          exclusive
          onChange={handleChange5}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            OFF
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="ios" sx={{ fontSize: '12px' }}>
            NOISE
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          WEBGL
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment7}
          exclusive
          onChange={handleChange6}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px', fontSize: '10px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            OFF
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="ios" sx={{ fontSize: '12px' }}>
            NOISE
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          Client Rects
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment9}
          exclusive
          onChange={handleChange8}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            NOISE
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          Timezone
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment10}
          exclusive
          onChange={handleChange9}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            AUTO
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            MANUAL
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          Language
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment11}
          exclusive
          onChange={handleChange10}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            AUTO
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            MANUAL
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          GioLocation
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment12}
          exclusive
          onChange={handleChange11}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            AUTO
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            AUTO
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          CPU
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment13}
          exclusive
          onChange={handleChange12}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            MANUAL
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          Memory
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment14}
          exclusive
          onChange={handleChange13}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            MANUAL
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          Screen
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment15}
          exclusive
          onChange={handleChange14}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            MANUAL
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          Media Devices
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment13}
          exclusive
          onChange={handleChange14}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            MANUAL
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          {' '}
          Ports
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment4}
          exclusive
          onChange={handleChange3}
          aria-label="Platform"
          sx={{ height: '31px', borderRadius: '8px' }}
        >
          <ToggleButton value="web" sx={{ fontSize: '12px' }}>
            REAL
          </ToggleButton>
          <ToggleButton value="android" sx={{ fontSize: '12px' }}>
            PROTECT
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ color: isDarkTheme ? '#fff' : '#000' }}>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="Ports"
          labelPlacement="start"
        />
      </Box>
      <Box sx={{ color: isDarkTheme ? '#fff' : '#000' }}>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="Command Line Switches"
          labelPlacement="start"
        />
      </Box>
      <Box>
        <Typography
          sx={{
            color: isDarkTheme ? '#fff' : '#000',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
          }}
        >
          Notes
        </Typography>
        <OutlinedInput
          sx={{ width: '100%' }}
          id="outlined-adornment-weight"
          multiline
          maxRows={8}
          rows={4}
        />
      </Box> */}
      </Box>
    </form>
  );
};

export default General;
