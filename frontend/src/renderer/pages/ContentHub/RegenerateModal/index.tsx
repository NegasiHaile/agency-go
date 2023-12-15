import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Snackbar } from '@mui/material';
import styles from '../styles.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { updatePresignedUrl } from 'services/content';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
  p: 2,
};

export default function RegenerateModal({
  open,
  dialogOpenClose,
  link,
  updateLink,
}: any) {
  const [openCliboardMsg, setOpenCliboardMsg] = useState(false);

  const handleClose = () => {
    dialogOpenClose(false);
  };
  const onClick = () => {
    // window.electron.copyToClipboard(link);
    updateLink();
  };
  function truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
    }
    return str;
  }

  return (
    <Modal
      sx={{ backdropFilter: 'blur(4px)' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 0px',
          }}
        >
          <Typography> Regenerate Link </Typography>
          <Typography onClick={handleClose} sx={{ cursor: 'pointer' }}>
            X
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#292929' }} />

        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'start'}
          gap={'10px'}
        >
          <Typography marginTop={'20px'}>Link</Typography>
          <Box display={'flex'} alignItems={'center'} width={'100%'}>
            <input
              style={{ flex: 1, marginRight: '-31px' }}
              type="text"
              placeholder=""
              className={styles.inputWrap}
              readonly={'true'}
              value={truncateString(link, 30)}
            />
            <Snackbar
              open={openCliboardMsg}
              onClose={() => setOpenCliboardMsg(false)}
              autoHideDuration={1000}
              message="Copied to clipboard"
            />
            <ContentCopyIcon
              sx={{ marginRight: '15px', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(link);
                setOpenCliboardMsg(true);
              }}
            />
          </Box>
        </Box>

        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          gap={'8px'}
          padding={'20px 10px'}
        >
          <Button
            sx={{ color: '#fff', textTransform: 'capitalize' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ color: '#fff', textTransform: 'capitalize' }}
            onClick={onClick}
          >
            Regenerate
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
