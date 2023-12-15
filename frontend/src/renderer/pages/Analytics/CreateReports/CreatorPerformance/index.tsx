import { Box, Stack } from '@mui/material';
import SearchUsers from 'renderer/components/SearchUsers';
import Earnings from './components/Earnings';
import DayHourEarnings from './components/DayHourEarnings';
import { EaringDistribution } from './components/EarningDistribution';
import ChargeBacks from './components/ChargeBack';

export default function CreatorPerformance() {
  return (
    <Box display="flex" gap="10px">
      <Stack>
        <SearchUsers />
      </Stack>
      <Stack display="flex" gap="10px" width={'100%'}>
        <Earnings />
        <EaringDistribution />
        <DayHourEarnings />
        <ChargeBacks />
      </Stack>
    </Box>
  );
}
