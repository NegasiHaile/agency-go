import { Box, Button, Stack, Typography } from '@mui/material';
import { InputWithLabel } from '../Wallet/Common/ModalComponents';
import ButtonEle from 'renderer/components/Button';
import ImageUpload from 'renderer/components/Settings/WhiteLabel/Imageuploader';
import UploadedImage from './UploadedImage';
import useFormWhiteLabel from './Hooks/useForm';
import { useState } from 'react';
import styled from '@emotion/styled';

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

function WhiteLabel() {
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    file,
    setFile,
    agencyLogo,
    setAgencyLogo,
  } = useFormWhiteLabel();
  const [whiteLabelData, setWhiteLabelData] = useState<any>(null);
  const handleOnChange = (name: string, value: string) => {
    setWhiteLabelData({ ...whiteLabelData, [name]: value });
  };
  const handleImageChange = (e: any) => {
    if (e.target.files) {
      const file = e.target?.files[0];
      if (file) {
        setValue('agencyLogo', file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          setAgencyLogo(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setValue('agencyLogo', '');
      setAgencyLogo('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form style={{ width: '100%' }} id="whiteLabel" onSubmit={handleSubmit}>
        <Stack
          spacing={3}
          sx={{
            marginInline: '30px',
            paddingTop: '30px',
            paddingBottom: '50px',
          }}
        >
          <Box
            sx={{
              border: '1px solid #292929',
              backgroundColor: '#0C0C0C',
              padding: '20px',
              borderRadius: '5px',
            }}
          >
            <Typography sx={{ mb: 2 }}>
              Upload your Company/Agency's Logo
            </Typography>
            {agencyLogo ? (
              <Box>
                <img src={agencyLogo} width={'100%'} height={'200px'} />
              </Box>
            ) : (
              <ImageUpload handleImageChange={handleImageChange} />
            )}
            {agencyLogo && <UploadedImage file={agencyLogo} />}
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
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
              </Button>
              <ButtonEle
                variant="contained"
                onClick={handleImageChange}
                className="btn"
              >
                Remove
              </ButtonEle>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <InputWithLabel
              label="Primary Color"
              inputIdentifierName="primaryColor"
              placeholder="Enter primary color"
              inputStyle={{
                border: '1px solid #292929',
                backgroundColor: '#0C0C0C',
              }}
              register={register as any}
              handleOnChange={handleOnChange}
              errors={errors}
            />
            <InputWithLabel
              label="Secondary Color"
              inputIdentifierName="secondaryColor"
              placeholder="Enter secondary color"
              inputStyle={{
                border: '1px solid #292929',
                backgroundColor: '#0C0C0C',
              }}
              register={register as any}
              handleOnChange={handleOnChange}
              errors={errors}
            />
          </Box>
          <InputWithLabel
            label="Company/Agency Name"
            inputIdentifierName="agencyName"
            placeholder="Enter agency name"
            inputStyle={{
              border: '1px solid #292929',
              backgroundColor: '#0C0C0C',
            }}
            register={register as any}
            handleOnChange={handleOnChange}
            errors={errors}
          />
          <InputWithLabel
            label="Company/Agency Email"
            inputIdentifierName="email"
            placeholder="Enter agency email"
            inputStyle={{
              border: '1px solid #292929',
              backgroundColor: '#0C0C0C',
            }}
            register={register as any}
            handleOnChange={handleOnChange}
            errors={errors}
          />
          <InputWithLabel
            label="Company/Agency Phone"
            inputIdentifierName="phone"
            placeholder="Enter agency phone"
            inputStyle={{
              border: '1px solid #292929',
              backgroundColor: '#0C0C0C',
            }}
            register={register as any}
            handleOnChange={handleOnChange}
            errors={errors}
          />
          <InputWithLabel
            label="Company/Agency Website"
            inputIdentifierName="websiteUrl"
            placeholder="Enter agency website"
            inputStyle={{
              border: '1px solid #292929',
              backgroundColor: '#0C0C0C',
            }}
            register={register as any}
            handleOnChange={handleOnChange}
            errors={errors}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <ButtonEle type="submit" className="btn">
              Save Changes
            </ButtonEle>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default WhiteLabel;
