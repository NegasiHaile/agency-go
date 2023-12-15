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
  FormLabel,
  useTheme,
} from '@mui/material';
import {
  DropdownWithLabel,
  InputWithLabel,
} from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { antyBrowserProfileStatusList } from '../ManageEmployees/constant';
import GoogleMaps from './GoogleMaps';

interface $props {
  open: boolean;
  type: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  onFormSubmit: (data: any) => void;
  handleCreate: (data: any) => void;
  handleFormSubmitRef: any;
  increaseFetchIndex: () => any;
}

const General = ({
  open,
  type,
  setOpen,
  refetch,
  onFormSubmit,
  handleCreate,
  handleFormSubmitRef,
  increaseFetchIndex,
}: $props) => {
  const [selectedPlatform, setSelectedPlatform] = React.useState('Win32');
  const [locationPreference, setLocationPreference] = React.useState('default');
  const [locationCoords, setLocationCoords] = useState(null);
  const [alignment2, setAlignment2] = React.useState('web');
  const [selectedproxy, setselectedproxy] = React.useState('no-proxy');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedProxyProtocol, setSelectedProxyProtocol] =
    React.useState('http');
  const [newData, setNewData] = useState({
    name: '',
    status: 'ready',
    platform: selectedPlatform,
    tags: [],
    proxy: '',
  });
  const [errors, setErrors] = useState({});

  const validateProxyString = (proxyUrl) => {
    const proxyPattern = /^((.*?):(\d+))(@(.+?):(.+))?$/;
    return proxyPattern.test(proxyUrl);
  };

  const handleNameChange = (name: string, value: string) => {
    setNewData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleProxyChange = (proxy: string, value: string) => {
    setNewData((prevData) => ({
      ...prevData,
      proxy: value,
    }));
  };

  const handleTagsChange = (value: []) => {
    setNewData((prevData) => ({
      ...prevData,
      tags: value,
    }));
  };
  const handleproxyNameChange = (proxyName: any, value: any) => {
    setNewData((prevData) => ({
      ...prevData,
      proxyName: value,
    }));
  };
  const handleUserAgentChange = (userAgent: any, value: any) => {
    setNewData((prevData) => ({
      ...prevData,
      userAgent: value,
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
    const newErrors = {};

    if (!newData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (selectedproxy === 'set-proxy') {
      if (!newData.proxy) {
        newErrors.proxy = 'Proxy url is not added';
        isValid = false;
      } else if (!validateProxyString(newData.proxy)) {
        newErrors.proxy = 'Proxy url is not valid';
        isValid = false;
      }
    }

    setErrors(Object.assign(errors, newErrors));
    return isValid;
  };

  function parseProxyString(proxyString) {
    const proxyPattern = /^((.*?):(\d+))(@(.+?):(.+))?$/;
    const match = proxyString.match(proxyPattern);

    if (!match) {
      return false;
    }

    const result = {
      host: match[2],
      port: parseInt(match[3]),
    };

    if (match[5] && match[6]) {
      result.username = match[5];
      result.password = match[6];
    }

    return result;
  }

  const handleFormSubmit = async () => {
    // event.preventDefault(); // Prevents default form submission behavior

    // Validate fields before submission
    const isValid = validateFields();

    function delay(delayInMilliseconds: number) {
      return new Promise((resolve) => {
        setTimeout(resolve, delayInMilliseconds);
      });
    }

    await delay(100);
    console.log({ isValid, errors, newData });

    if (!isValid) {
      for (const key in errors) {
        if (errors[key] !== '') {
          alert(errors[key]);
          break;
        }
      }
      return;
    }

    await window.electron.ipcRenderer.invoke(
      'anty-browser:create-profile',
      Object.assign(newData, {
        geolocation: locationCoords,
        proxy: parseProxyString(newData.proxy),
      })
    );
    increaseFetchIndex();
    setOpen(false);

    // // onFormSubmit(newData);
    // // Clear form data after submission (if needed)
    // setNewData({
    //   name: '',
    //   status: '',
    //   tags: '',
    //   proxy: '',
    //   changeIPURL: '',
    //   proxyName: '',
    // });
    // handleCreate(newData);
  };

  handleFormSubmitRef.current = { handleFormSubmit: handleFormSubmit };

  const handleOSChange = (
    event: React.MouseEvent<HTMLElement>,
    platform: string
  ) => {
    setNewData((prevData) => ({
      ...prevData,
      platform: platform,
    }));
    setSelectedPlatform(platform);
  };

  const handleProxySelect = (
    event: React.MouseEvent<HTMLElement>,
    proxy: string
  ) => {
    setselectedproxy(proxy);
  };

  const handleProxyProtocolChange = (
    event: React.MouseEvent<HTMLElement>,
    selectedProxyProtocol: string
  ) => {
    setNewData((prevData) => ({
      ...prevData,
      proxyProtocol: selectedProxyProtocol,
    }));
    setSelectedProxyProtocol(selectedProxyProtocol);
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
              options={antyBrowserProfileStatusList}
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
            onChange={(event, newValue) => {
              handleTagsChange(newValue, event);
            }}
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
            value={selectedPlatform}
            exclusive
            onChange={handleOSChange}
            aria-label="Platform"
            style={{ alignItems: 'center' }}
            size="small"
          >
            <FormLabel>Operating System: &nbsp;</FormLabel>
            <ToggleButton value="Win32">WINDOWS</ToggleButton>
            <ToggleButton value="MacIntel">MACOS</ToggleButton>
            <ToggleButton value="Linux x86_64">LINUX</ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            color="primary"
            value={locationPreference}
            exclusive
            onChange={(e, lp) => {
              if (lp === 'default') {
                setLocationCoords(null);
              }
              setLocationPreference(lp);
            }}
            aria-label="GeoLocation Preference"
            style={{ alignItems: 'center' }}
            size="small"
          >
            <FormLabel>Geolocation Preference: &nbsp;</FormLabel>
            <ToggleButton value="default">Default</ToggleButton>
            <ToggleButton value="custom">Custom</ToggleButton>
          </ToggleButtonGroup>

          {locationPreference === 'custom' && (
            <GoogleMaps
              setLocationCoords={(payload) => {
                if (locationPreference === 'custom') {
                  setLocationCoords(payload);
                }
              }}
            />
          )}

          <ToggleButtonGroup
            color="primary"
            value={selectedproxy}
            exclusive
            onChange={handleProxySelect}
            aria-label="Platform"
            style={{ alignItems: 'center' }}
            size="small"
          >
            <FormLabel>Proxy Config: &nbsp;</FormLabel>
            <ToggleButton value="no-proxy">No Proxy</ToggleButton>
            <ToggleButton value="set-proxy">NEW PROXY</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {selectedproxy === 'set-proxy' && (
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
              label="Proxy URL"
              inputIdentifierName="proxyUrl"
              placeholder="Enter proxy url"
              handleOnChange={handleProxyChange}
            />
            <small>Correct format: HOST:PORT@USER:PASS or HOST:PORT</small>
          </Box>
        )}

        {/*   <Box
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
        <Box
          sx={{
            marginInline: '5px',
            justifyContent: 'space-between',
            display: 'flex',
            color: isDarkTheme ? '#fff' : '#000',
            gap: '20px',
          }}
        ></Box>
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
            handleOnChange={handleUserAgentChange}
          />
        </Box>
        */}
      </Box>
    </form>
  );
};

export default General;
