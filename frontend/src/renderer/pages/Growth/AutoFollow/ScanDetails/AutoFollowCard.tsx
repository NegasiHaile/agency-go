import { ErrorOutline } from '@mui/icons-material';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import theme from 'renderer/styles/muiTheme';

interface $Props {
  title: string;
  amount: string;
  icon?: ReactNode;
}

export default function AutoFollowCard({ title, amount, icon }: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Stack
      flexDirection="row"
      borderRadius="16px"
      gap="16px"
      alignItems="center"
      height="120px"
      padding="26px 16px"
      sx={{
        border: `1px solid ${theme.palette.primary.contrastText}`,
      }}
    >
      <Stack spacing="10px" minWidth="230px">
        <Typography
          color={isDarkTheme ? '#fff' : '#000'}
          display={'flex'}
          alignItems={'center'}
          gap={'6px'}
          fontWeight="600"
          fontSize="14px"
        >
          {title}
        </Typography>
        <Typography
          color={isDarkTheme ? '#fff' : '#000'}
          fontSize="40px"
          fontWeight={700}
        >
          {amount}
        </Typography>
      </Stack>
    </Stack>
  );
}
