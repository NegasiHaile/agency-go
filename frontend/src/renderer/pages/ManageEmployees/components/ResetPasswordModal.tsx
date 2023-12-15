import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import fetchReq from 'utils/fetch';
import PageTopbar from 'renderer/components/PageTopbar';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#292929',
  color: '#000',
  boxShadow: 24,
  borderRadius: 2,
};

export default function ResetPasswordModal({ open, setOpen, email, id }: any) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleResetPassword = (id: string) => {
    let endpoint = `email/reset-password/${id}`;
    let options = {
      method: 'POST' as 'POST',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              padding: '20px',
              borderRadius: '10px 10px 0px 0px',
            }}
          >
            Confirm Password Reset
          </Box>
          <Box
            sx={{
              padding: '20px',
              background: '#4B4B4B',
            }}
          >
            <Typography sx={{ color: 'lightgray' }}>
              Are you sure you want to reset the password of
            </Typography>
            <Typography>{email}</Typography>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'end'}
            gap={'10px'}
            sx={{
              padding: '10px 20px',
              borderRadius: '0px 0px 10px 10px',
            }}
          >
            <PageTopbar.Button
              text="Cancel"
              color="secondary"
              onClick={handleClose}
            />
            <PageTopbar.Button
              color="primary"
              text="Confirmed"
              onClick={() => handleResetPassword(id)}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
