import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import theme from 'renderer/styles/muiTheme';

interface $Props {
  title: string;
  amount: string;
  icon?: ReactNode;
}

export default function EarningsCard({ title, amount, icon }: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Stack
      flexDirection="row"
      borderRadius="16px"
      alignItems="center"
      justifyContent={'space-between'}
      sx={{
        padding: '32px',
        border: '1px solid',
        borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
      }}
    >
      <Stack spacing="10px" minWidth="60%">
        <Typography fontWeight="600" fontSize="14px">
          {title}
        </Typography>
        <Typography fontSize="36px" fontWeight={700}>
          {amount}
        </Typography>
      </Stack>

      {icon && (
        <Divider
          orientation="vertical"
          sx={{
            display: 'flex',
            backgroundColor: theme.palette.primary.contrastText,
            width: '1px',
          }}
          component="div"
        />
      )}
      <div
        style={{
          backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
          borderRadius: '200px',
          width: '50px',
          height: '50px',
        }}
      >
        <div
          style={{
            marginTop: '12px',
            marginLeft: '12px',
            filter: isDarkTheme
              ? ' brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)'
              : 'brightness(0) saturate(100%) invert(41%) sepia(98%) saturate(1260%) hue-rotate(177deg) brightness(101%) contrast(102%)',
          }}
        >
          {icon}
        </div>
      </div>
    </Stack>
  );
}
