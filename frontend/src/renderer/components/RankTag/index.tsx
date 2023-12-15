import { Stack, Typography } from '@mui/material';
import theme from 'renderer/styles/muiTheme';

interface $Props {
  title: string;
  amount: string;
}

export default function RankTag({ title, amount }: $Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="2px"
      borderRadius="4px"
      padding="4px"
      sx={{ background: theme.palette.secondary.light }}
    >
      <Typography
        color={theme.palette.secondary.contrastText}
        fontWeight={600}
        fontSize="10px"
      >
        {title}
      </Typography>
      <Typography color="#fff" fontWeight={600} fontSize="10px">
        {amount}
      </Typography>
    </Stack>
  );
}
