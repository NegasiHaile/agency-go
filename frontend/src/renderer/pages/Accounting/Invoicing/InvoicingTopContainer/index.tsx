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
import { agencyCreatorSplit, randomNumber } from '..';

interface Props {
  allUsers: [];
}
const InvoicingTopContainer = ({allUsers}: Props) => {
  const [isCreateInvoiceModalOpen, setCreateInvoiceModalOpen] = useState(false);
  const [customer, setCustomer] = useState('');
  const [isCustomInvoiceModalOpen, setCustomInvoiceModalOpen] = useState(false);
  const [selectData, setSelectedData] = useState('Current invoice settings');
  const {data, setData} = useContext(MyInvoiceContext);

  const handleOpen = () => setCreateInvoiceModalOpen(true);

  useEffect(()=>{
    setSelectedData('Current invoice settings');
  }, [])

  const handleSelectUser = (userData: any)=>{
    setData({
      ...(userData as {}), 
      currentModalBalance: userData?.currentModalBalance?? randomNumber(25000, 1000),
      agencyPer: userData?.agencyPer?? agencyCreatorSplit()});
  }

  const cardData = [
    {
      id: 1,
      title: 'Current Model Balance',
      value: data?.currentModalBalance,
    },
    {
      id: 2,
      title: 'Agency/Model Split (%)',
      value: data?.agencyPer,
    },
  ];

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
            Create Invoice
          </Button>
          <Select
            id="current-invoice-settings"
            value={selectData}
            onChange={(e) => setSelectedData(e.target.value)}
            sx={{
              width: 'fit-content',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.light,
              },
              height: '100%',
              padding: '0px 0px',
              ' & .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
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
            >
              Current Invoice Setting
            </MenuItem>
            {allUsers.map((item: any, index: any) => (
              <MenuItem
                key={index}
                value={`${item?._id}`}
                sx={{
                  fontWeight: 500,
                  fontSize: '11px',
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}
                onClick={() => (
                  setCustomInvoiceModalOpen(true), setCustomer(item), handleSelectUser(item)
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
        {cardData.map((data, index) => {
          return (
            <Stack
              key={index}
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
          setCreateInvoiceModalOpen={setCreateInvoiceModalOpen}
        />
      )}
    </Box>
  );
};

export default InvoicingTopContainer;
