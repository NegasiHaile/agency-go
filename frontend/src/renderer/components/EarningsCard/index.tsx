import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import CountUp from 'react-countup';

interface $Props {
  title: string;
  amount: string;
  icon?: ReactNode;
}

export default function EarningsCard({ title, amount }: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Stack
      flexDirection="row"
      borderRadius="16px"
      alignItems="center"
      justifyContent={'space-between'}
      sx={{
        padding: '18px',
        border: '1px solid',
        borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
        // background: isDarkTheme ? '#0C0C0C' : 'white' ,
      }}
    >
      <Stack spacing="10px" minWidth="60%">
        <Typography fontWeight="600" fontSize="12px">
          {title}
        </Typography>
        <Typography fontSize="24px" fontWeight={700}>
          <CountUp end={parseInt(amount)} duration={1} decimals={2}/>
        </Typography>
      </Stack>
    </Stack>
  );
}
