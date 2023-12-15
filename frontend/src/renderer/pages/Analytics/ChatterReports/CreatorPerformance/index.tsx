import { Box, Stack } from '@mui/material';
import ChatterSales from './components/ChatterSales';
import MessageCount from './components/MessageCount';
import FansChatted from './components/FansChatted';
import ChatterActivity from './components/ChatterActivity';
import GoldenRatio from './components/GoldenRatio';
import UnlockRatio from './components/UnlockRatio';
import SearchUsers from 'renderer/components/SearchUsers';

const CreatorPerformance = () => {
  return (
    <Box display="flex" gap="10px">
      <Stack width={'30%'}>
        <SearchUsers />
      </Stack>
      <Stack width={'70%'} display='flex' gap='10px'>
        <ChatterSales />
        <MessageCount />
        <FansChatted />
        <ChatterActivity />
        <GoldenRatio />
        <UnlockRatio />
      </Stack>
    </Box>
  );
};

export default CreatorPerformance;
