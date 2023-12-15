import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import theme from 'renderer/styles/muiTheme';
import CreateInvoiceModal from '../CreateInvoiceModal';
import CustomInvoiceModal from '../CustomInvoiceModal';
import AvatarSvg from 'renderer/assets/svg/AvatarSvg';
import { MyInvoiceContext } from '../context/context';

const InvoicingTopContainer = () => {
  const [isCreateInvoiceModalOpen, setCreateInvoiceModalOpen] = useState(false);
  const [customer, setCustomer] = useState('');
  const [isCustomInvoiceModalOpen, setCustomInvoiceModalOpen] = useState(false);
  const [selectData, setSelectedData] = useState('Current invoice settings');
  const handleOpen = () => setCreateInvoiceModalOpen(true);
  const [alluser, setAlluser] = useState<any>([]);

  const { data } = useContext(MyInvoiceContext);
  // console.debug(data?.data?.currentModalBalance, 'data');

  const cardData = [
    {
      id: 1,
      title: 'Current Model Balance',
      value: data?.data?.currentModalBalance || ' 20000',
    },
    {
      id: 2,
      title: 'Agency/Model Split (%)',
      value: data?.data?.agencyPer || '30/70 ',
    },
  ];
  const getuser = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch('http://localhost:3000/users', options);
      if (response.ok) {
        const data = await response.json();
        setAlluser(data?.data);
        console.log(data, 'get user Data');
      } else {
        console.error('Failed to create the user');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getuser();
  }, []);

const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box margin={'10px 0px'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography fontSize="22px">Invoicing</Typography>

        <Box gap={'10px'} display={'flex'} alignItems={'center'}>
          <Button
            variant="contained"
            sx={{ color: '#fff', textTransform: 'capitalize', height: '40px' }}
            onClick={handleOpen}
          >
            Create Invoice{' '}
          </Button>
          <Select
            id="current-invoice-settings"
            value={selectData}
            onChange={(e) => setSelectedData(e.target.value)}
            sx={{
              
              width: 'fit-content',
              '.MuiOutlinedInput-notchedOutline': {
                
              },
              height: 'fit-content',
              padding: '0px 0px',
              ' & .MuiOutlinedInput-input':
                {
                  padding: '4px 8px',
                },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
             
              '& .MuiSelect-select': {
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
              },
              input: {
                backgroundColor: theme.palette.secondary.contrastText,
              },
            }}
          >
            <MenuItem
              value={'Current invoice settings'}
              sx={{ fontWeight: 500, fontSize: '11px' }}
              onClick={() => setCustomInvoiceModalOpen(true)}
            >
              Current Invoice Setting
            </MenuItem>
            {alluser.map((item: any, index: any) => (
              <MenuItem
                value={`${item?.firstName} ${item?.lastName}`}
                sx={{
                  fontWeight: 500,
                  fontSize: '11px',
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}
                onClick={() => (
                  setCustomInvoiceModalOpen(true), setCustomer(item)
                )}
              >
                <AvatarSvg />
                <Typography>{`${item?.firstName} ${item?.lastName}`}</Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box display={'flex'} gap={'10px'} margin={'16px 0px'}>
        {cardData.map((data) => {
          return (
            <Stack
              key={data.id}
              width={'50%'}
              flexDirection="row"
              borderRadius="16px"
              gap="15px"
              alignItems="center"
              height="90px"
              sx={{
                padding: '10px 20px',
                border: `1px solid `,
                borderColor: isDarkTheme ? '#292929' : '#fff',
                backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
              }}
            >
              <Stack minWidth="130px">
                <Typography
                  color={theme.palette.secondary.contrastText}
                  fontWeight="600"
                  fontSize="12px"
                >
                  {data.title}
                </Typography>
                <Typography fontSize="30px" fontWeight={700}>
                  ${data.value}
                </Typography>
                {/* <Typography color="#fff" fontSize="30px" fontWeight={700}>
                  {data.value.split('.')[0]}
                  {data.value.split('.')[1] && <span>.</span>}
                  <span style={{ fontSize: '20px' }}>
                    {data.value.split('.')[1]}
                  </span>
                </Typography> */}
              </Stack>
            </Stack>
          );
        })}
      </Box>
      {isCreateInvoiceModalOpen && (
        <CreateInvoiceModal
          open={isCreateInvoiceModalOpen}
          setOpen={setCreateInvoiceModalOpen}
          userData={customer}
        />
      )}
      {isCustomInvoiceModalOpen && (
        <CustomInvoiceModal
          open={isCustomInvoiceModalOpen}
          setOpen={setCustomInvoiceModalOpen}
          userData={customer}
        />
      )}
    </Box>
  );
};

export default InvoicingTopContainer;
