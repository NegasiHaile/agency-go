import { ChatterSalesChart } from './Chart';
import { Box, Typography, useTheme} from '@mui/material';

const ChatterSales = () => {
  
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Box
      padding="16px"
      borderRadius={2}
      sx={{
        background: isDarkTheme ? '#181818' : '#FFFFFF',
      }}
    >
      <Box marginBottom="10px" display="flex" justifyContent="space-between">
        <Typography fontWeight="600" fontSize="18px">
          Chatter Sales
        </Typography>
      </Box>
      <Box>
        <ChatterSalesChart />
      </Box>
    </Box>
  );
};

export default ChatterSales;
