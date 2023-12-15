import { useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PageTopbar from 'renderer/components/PageTopbar';
import { useState } from 'react';
import useQuery from 'renderer/hooks/useQuery';
import MultiSelect from 'renderer/components/Dropdown';
import fetchReq from 'utils/fetch';
import { Button, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import General from './General';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: '#292929',
  color: '#000',
  boxShadow: 24,
  borderRadius: 2,
};

export default function NewProfile({
  open,
  setOpen,
  name,
  id,
  increaseFetchIndex,
}: any) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [formData, setFormData] = useState(null);
  const [newData, setNewData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isLoading, data } = useQuery({ key: 'get-creator' });

  const handleFormSubmitRef = useRef(null);

  const handleCreate = () => {
    // Call handleFormSubmit in General component from NewProfile
    // handleFormSubmitFromNewProfile(formData);
    if (handleFormSubmitRef.current) {
      handleFormSubmitRef.current?.handleFormSubmit();
    }
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const dataRef = (newData) => {
  //    setNewData(newData);
  // };

  // console.log('--newData--', newData);

  return (
    <div>
      <Modal
        sx={{ backdropFilter: 'blur(4px)' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} height={'90%'} overflow="auto">
          <Box
            sx={{
              display: 'flex',
              height: '60px',
              borderRadius: '10px 10px 0px 0px',
              backgroundColor: '#04A1FF',
              // color: isDarkTheme ? '#fff' : '#000',
              // background: isDarkTheme ? '#000' : '#EAF1FF',
            }}
          >
            <Box
              width={'100%'}
              display={'flex'}
              justifyContent={'space-between'}
              paddingLeft={'20px'}
            >
              <Box display={'flex'} gap={'10px'} marginTop={'20px'}></Box>
              <Box display={'flex'}>
                <Button
                  variant="text"
                  startIcon={<AddIcon />}
                  sx={{ color: '#fff' }}
                  onClick={handleCreate}
                >
                  Create
                </Button>
                <Button
                  variant="text"
                  startIcon={<CloseIcon />}
                  onClick={handleClose}
                  sx={{ color: '#fff' }}
                ></Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            bgcolor={isDarkTheme ? '#0C0C0C' : '#fff'}
          >
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              style={{ display: 'none' }}
            >
              <Tab label="General" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <Box bgcolor={isDarkTheme ? '#0C0C0C' : '#fff'}>
            <CustomTabPanel value={value} index={0}>
              <Box>
                <General
                  setOpen={setOpen}
                  handleFormSubmitRef={handleFormSubmitRef}
                  increaseFetchIndex={increaseFetchIndex}
                />
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
