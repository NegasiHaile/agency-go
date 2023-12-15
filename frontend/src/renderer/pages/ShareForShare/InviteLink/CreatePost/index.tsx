import { IconButton, Stack, TextField, Typography } from '@mui/material';
import AddFromVaultSvg from 'renderer/assets/svg/AddFromVaultSvg';
import AddImageSvg from 'renderer/assets/svg/AddImageSvg';
import MultiNavLink from 'renderer/components/MultiNavLink';
import SearchUsers from 'renderer/components/SearchUsers';
import theme from 'renderer/styles/muiTheme';

const steps = [
  { label: 'Invite Link', link: '/s4s/invite-link' },
  { label: 'Create Post', link: '/s4s/invite-link-create-post' },
];

export default function CreatePost() {
  return (
    <>
      <SearchUsers />
      <Stack gap="22px" marginLeft="32px" marginRight="16px" marginTop="16px">
        <MultiNavLink steps={steps} />
        <Typography color="#fff" fontWeight={500} fontSize="14px">
          Creators can request a Share for Share with{' '}
          <Typography
            component="span"
            color={theme.palette.primary.main}
            fontWeight={500}
            fontSize="12px"
          >
            Joan Adams
          </Typography>{' '}
          via this link
        </Typography>
        <Stack
          borderRadius="8px"
          border={`1px solid ${theme.palette.secondary.light}`}
          padding="16px"
          gap="10px"
        >
          <Stack direction="row" gap={0}>
            <Typography color="#fff" fontWeight={500} fontSize="14px">
              Guidelines
            </Typography>
            <Typography color="#04A1FF" fontWeight={500} fontSize="14px">
              *
            </Typography>
          </Stack>
          <Typography
            fontWeight={400}
            fontSize="12px"
            color={theme.palette.secondary.contrastText}
          >
            Please write in the third person and @id your account. We will
            automatically insert #ad at the end of each post
          </Typography>
          <TextField
            maxRows={5}
            minRows={5}
            placeholder="/"
            id="create-post"
            multiline
            inputProps={{ maxLength: 5000 }}
            sx={{
              borderRadius: '3px',
              textarea: {
                border: `1px solid ${theme.palette.secondary.light}`,
                padding: '12px',
                color: theme.palette.secondary.contrastText,
              },
              '.MuiInputBase-root': {
                padding: 0,
              },
            }}
          />
          <Typography variant="h5">Select Media Files</Typography>
          <Stack direction="row" gap="20px">
            <IconButton sx={{ padding: '0px !important' }}>
              <AddImageSvg />
            </IconButton>
            <IconButton>
              <AddFromVaultSvg />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
