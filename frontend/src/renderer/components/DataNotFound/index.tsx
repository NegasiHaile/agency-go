import { Stack } from '@mui/material';
import FileNotFound from 'renderer/assets/svg/FileNotFound';

export default function DataNotFound() {
  return (
    <Stack justifyContent="center" direction="row">
      <FileNotFound />
    </Stack>
  );
}
