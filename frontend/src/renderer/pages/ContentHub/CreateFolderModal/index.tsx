import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Switch, TextField, styled } from '@mui/material';
import { InputWithLabel } from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { useState } from 'react';
import styles from '../styles.module.css';
import { tr } from 'date-fns/locale';

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

export default function CreateFolderModal({
  open,
  dialogOpenClose,
  setFolder,
}: any) {
  const [foldername, setfoldername] = useState('');

  const handleClose = () => {
    dialogOpenClose(false);
  };

  const handleOnChange = (e: any) => {
    setfoldername(e.target.value);
  };
  const onClick = () => {
    // dialogClose(true)
    setFolder(foldername);
    dialogOpenClose(false);
  };
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
          <Typography> Create Folder</Typography>
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
          <Typography marginTop={'20px'}>Name Folder</Typography>
          <input
            type="text"
            placeholder=""
            onChange={handleOnChange}
            className={styles.inputWrap}
            value={foldername}
          />
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
            Create Folder
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
