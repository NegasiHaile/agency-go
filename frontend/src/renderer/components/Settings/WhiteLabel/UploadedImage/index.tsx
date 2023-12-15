import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import CheckSvg from 'renderer/assets/svg/CheckSvg';
import ImageSvg from 'renderer/assets/svg/ImageSvg';
import LinearProgressBar from 'renderer/components/LinearProgressBar';

const UploadedImage = ({ file }: any) => {
  const [isShowProgress, setShowProgress] = useState(file ? true : false);
  setTimeout(() => {
    setShowProgress(false);
  }, 1000);
  return (
    <Box
      sx={{
        border: '1px solid #292929',
        borderRadius: '5px',
        padding: '20px',
        background: 'transparent',
        '&:hover': {
          background: 'transparent',
        },
        margin: '20px auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ImageSvg />
          <Box>
            <Typography sx={{ color: '#fff', fontSize: '14px' }}>
              {file?.name}
            </Typography>
            <Typography sx={{ color: '#AAAAAA', fontSize: '12px' }}>
              {(file?.size / 1024).toFixed(2)} KB
            </Typography>
          </Box>
        </Box>
        <CheckSvg />
      </Box>
      {isShowProgress && <LinearProgressBar />}
    </Box>
  );
};

export default UploadedImage;
