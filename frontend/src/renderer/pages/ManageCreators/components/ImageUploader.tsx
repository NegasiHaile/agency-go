import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import UploadHeadShot from '../../../assets/svg/UploadSvg';
import { useState } from 'react';

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

export default function ImageUpload({
  creatorImage,
  setCreatorImage,
  setValue,
}: any) {
  const handleImage = (e: any) => {
    if (e.target.files) {
      const file = e.target?.files[0];
      if (file) {
        setValue('creatorImage', file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setCreatorImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setValue('creatorImage', '');
      setCreatorImage('');
    }
  };
  return (
    <>
      {creatorImage ? (
        <>
          <img src={creatorImage} width={'100%'} height={'150px'} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              margin: '20px 0px',
            }}
          >
            <Button component="label">
              Change
              <VisuallyHiddenInput
                type="file"
                onChange={handleImage}
                sx={{ color: 'blue', textTransform: 'capitalize' }}
                // {...register('logo')}
              />
            </Button>
            <Button
              variant="contained"
              onClick={handleImage}
              sx={{ color: '#fff', textTransform: 'capitalize' }}
            >
              Remove
            </Button>
          </Box>
        </>
      ) : (
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
                Click to upload{' '}
              </Typography>
              <Typography color={'#fff'} fontSize={'15px'}>
                or drag and drop
              </Typography>
            </Box>
            <Typography fontSize={'12px'} color={'#fff'}>
              SVG, PNG, JPG or GIF (max. 800x400px)
            </Typography>
          </Box>
          <VisuallyHiddenInput
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e: any) => handleImage(e)}
          />
        </Button>
      )}
    </>
  );
}

// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import { Box, Typography } from '@mui/material';
// import UploadHeadShot from '../../../assets/svg/UploadSvg';
// import { useState } from 'react';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// export default function ImageUpload({handleChangeFile}:any) {
//   const [hfile, setFile] = useState<File | undefined>()
//   return (

//     <Button
//       component="label"
//       variant="contained"
//       sx={{
//         border: '1px solid #292929',
//         width: '100%',
//         background: 'transparent',
//         '&:hover': {
//           background: 'transparent',
//         },
//       }}
//     >
//       {hfile ?<>
//         <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           // margin: '10px auto',
//         }}
//       >
//         <img style={{
//   maxWidth: '150px',
//   maxHeight:'200px'
// }}    src={URL.createObjectURL(hfile)} alt="Displaying Image"/>
//       </Box></> :
//       <>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           margin: '10px auto',
//         }}
//       >
//         <UploadHeadShot />
//         <Box
//           display={'flex'}
//           alignItems={'center'}
//           textTransform={'capitalize'}
//           gap={1}
//         >
//           <Typography color={'#04A1FF'} fontWeight={600} fontSize={'16px'}>
//             Click to upload{' '}
//           </Typography>
//           <Typography color={'#fff'} fontSize={'15px'}>
//             or drag and drop
//           </Typography>
//         </Box>
//         <Typography fontSize={'12px'} color={'#fff'}>
//           SVG, PNG, JPG or GIF (max. 800x400px)
//         </Typography>
//       </Box>
//       </>
//       }
//       <VisuallyHiddenInput
//         type="file"
//         accept="image/png, image/gif, image/jpeg"

//         // @ts-ignore
//         onChange={(e) =>{ handleChangeFile(e.target.files[0]);setFile(e.target.files[0])}}
//       />
//     </Button>
//   );
// }
