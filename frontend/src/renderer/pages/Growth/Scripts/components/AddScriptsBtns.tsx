import { Add } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import theme from 'renderer/styles/muiTheme';

export default function AddScriptsBtns() {
  return (
    <Stack direction="row" gap="10px">
      <Button
        variant="outlined"
        sx={{
          borderColor: theme.palette.primary.main,
          marginLeft: 'auto',
          height: '32px',
          textTransform: 'unset',
        }}
      >
        <Typography
          fontWeight={600}
          fontSize="12px"
          color={theme.palette.primary.main}
          textTransform="unset"
        >
          Import from Excel
        </Typography>
      </Button>
      <Button
        variant="contained"
        sx={{
          background: theme.palette.primary.main,
          marginLeft: 'auto',
          height: '32px',
          textTransform: 'unset',
        }}
        startIcon={<Add sx={{ color: '#fff' }} />}
      >
        <Typography
          fontWeight={600}
          fontSize="12px"
          color="#fff"
          textTransform="unset"
        >
          Add Scripts
        </Typography>
      </Button>
    </Stack>
  );
}
