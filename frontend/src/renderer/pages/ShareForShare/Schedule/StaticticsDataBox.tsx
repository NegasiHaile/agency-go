import { Box, Typography } from '@mui/material';
import theme from 'renderer/styles/muiTheme';

interface $Props {
  title: string;
  amount: string;
}

export default function StatisticsDataBox({ title, amount }: $Props) {
  return (
    <Box
      sx={{ border: `1px solid ${theme.palette.secondary.light}` }}
      width={'340px'}
      padding={'10px'}
      borderRadius={'16px'}
    >
      <Typography color={'#fff'} fontSize={'12px'} fontWeight={500}>
        {title}
      </Typography>
      <Typography
        fontSize={'22px'}
        fontWeight={700}
        color={theme.palette.secondary.contrastText}
      >
        {amount}
      </Typography>
    </Box>
  );
}
