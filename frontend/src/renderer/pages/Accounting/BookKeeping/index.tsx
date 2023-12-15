import { Box, Stack, useTheme } from '@mui/material';
import BookkeepingTopContainer from './BookkeepingTopContainer';
import BookkeepingTable from './BookkeepingTable';
import { BookkeepingPieCenter } from './BookkeepingPieCenter';

export default function BookKeeping() {

 const theme = useTheme();
 const isDarkTheme = theme.palette.mode === 'dark';


  return (
    <Box
      display="flex"
      gap="5px"
      padding={'6px'}
      sx={{ background: isDarkTheme ? '#121212' : '#EAF1FF' }}
    >
      <Stack
        width={'100%'}
        padding={'10px'}
        sx={{ background: isDarkTheme ? '#0C0C0C' : '#EAF1FF' }}
        gap="10px"
      >
        <BookkeepingTopContainer />
        <BookkeepingPieCenter />
        <BookkeepingTable />
      </Stack>
    </Box>
  );
}
