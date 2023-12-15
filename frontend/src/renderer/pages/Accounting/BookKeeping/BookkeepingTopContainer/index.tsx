import { Box, Stack, useTheme } from '@mui/material';
import BookLeftInvoice from './BookLeftInvoice';
import BookRightInvoice from './BookRightInvoice';


export default function BookkeepingTopContainer() {

const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';


  return (
    <Box
      display="flex"
      justifyContent={'space-between'}
      gap="10px"
     
      sx={{ background: isDarkTheme ? '#121212' : '#EAF1FF' }}
    >
      <Stack
       
       
        sx={{ background: isDarkTheme ? '#0C0C0C' : '#EAF1FF' }}
      >
        {/* <BookkeepingTopContainer/> */}
        <BookLeftInvoice />
      </Stack>
      <Stack
        width={'65%'}
        
        sx={{ background: isDarkTheme ? '#0C0C0C' : '#EAF1FF' }}
      >
        {/* <BookkeepingTopContainer/> */}
        <BookRightInvoice />
      </Stack>
    </Box>
  );
}
