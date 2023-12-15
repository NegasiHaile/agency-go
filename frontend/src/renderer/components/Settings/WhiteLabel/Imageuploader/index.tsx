import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import UploadHeadShot from '../../../../assets/svg/UploadSvg';
import { useTranslation } from 'react-i18next';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type ImageUploadProps = {
  setAgencyLogo?: any;
  handleImageChange?: (e: any) => void;
};

export default function ImageUpload({
  setAgencyLogo,
  handleImageChange,
}: ImageUploadProps) {
  const { t } = useTranslation()
  return (
    <Button
      component="label"
      variant="contained"
      sx={{
        border: '1px solid #292929',
        width: '100%',
        background: 'transparent',
        '&:hover': {
          background: 'transparent',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '10px auto',
        }}
      >
        <UploadHeadShot />
        <Box
          display={'flex'}
          alignItems={'center'}
          textTransform={'capitalize'}
          gap={1}
        >
          <Typography color={'#04A1FF'} fontWeight={600} fontSize={'16px'}>
            {t("Click to upload")}
          </Typography>
          <Typography color={'#fff'} fontSize={'15px'}>
            {t("or drag and drop")}
          </Typography>
        </Box>
        <Typography fontSize={'12px'} color={'#fff'}>
          {t("SVG, PNG, JPG or GIF (max. 800x400px)")}
        </Typography>
      </Box>
      <VisuallyHiddenInput
        onChange={handleImageChange}
        type="file"
        accept="image/png, image/gif, image/jpeg"
      />
    </Button>
  );
}
