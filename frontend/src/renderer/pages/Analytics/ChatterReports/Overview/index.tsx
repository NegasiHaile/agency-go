import { Box } from '@mui/material';
import ChatterSales from './components/ChatterSales';
import EaringDistribution from './components/EarningDistribution';
import ChattingStatistics from './components/ChattingStatistics';

const Overview = () => {
  return (
    <Box display="flex" flexDirection="column" gap="10px">
      <ChatterSales />
      <EaringDistribution />
      <ChattingStatistics />
    </Box>
  );
};

export default Overview;
