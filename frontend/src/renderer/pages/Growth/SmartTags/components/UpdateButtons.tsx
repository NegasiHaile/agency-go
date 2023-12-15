import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import theme from 'renderer/styles/muiTheme';
import { useContext } from 'react';
import { MyContext } from '../context/context';

export default function UpdateButtons() {
  const {getTags}=useContext(MyContext)
  return (
    <Stack
      direction="row"
      gap="10px"
      alignItems="center"
      justifyContent="start"
    >
      <Button
        variant="text"
        startIcon={
          <DeleteOutlineIcon
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.error.main,
            }}
          />
        }
      >
        <Typography
          fontWeight={500}
          fontSize="12px"
          sx={{ color: theme.palette.error.main }}
        >
          Delete
        </Typography>
      </Button>
      <Button
        variant="text"
        startIcon={
          <EditNoteIcon
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
            }}
          />
        }
      >
        <Typography variant="h5"
        onClick={()=>getTags()}
        >Edit</Typography>
      </Button>
    </Stack>
  );
}
