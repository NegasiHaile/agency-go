import { Box } from '@mui/material';
import Earnings from './components/Earnings/Earnings';
import CreatorEarnings from './components/CreatorEarnings';
import { EaringDistribution } from './components/EarningDistribution';
import CreatorStatistics from './components/CreatorStatistics';

export default function Overview() {
  return (
    <Box display="flex" flexDirection="column" gap="16px">
      <Earnings />
      <CreatorEarnings />
      <EaringDistribution />
      <CreatorStatistics />
    </Box>
  );
}
