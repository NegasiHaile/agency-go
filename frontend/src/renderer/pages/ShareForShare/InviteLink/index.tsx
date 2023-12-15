import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentText from 'renderer/assets/svg/DocumentText';
import ImportSvg from 'renderer/assets/svg/ImportSvg';
import LinkSvg from 'renderer/assets/svg/LinkSvg';
import SearchUsers from 'renderer/components/SearchUsers';
import theme from 'renderer/styles/muiTheme';

interface $LinkMessage {
  title: string;
  icon: React.ReactNode;
}

function S4SLinkMessage({ title, icon }: $LinkMessage) {
  return (
    <Stack direction="row" gap="10px" alignItems="center">
      {icon}
      <Typography color="#fff" fontWeight={500} fontSize="12px">
        {title}
      </Typography>
    </Stack>
  );
}

export default function InviteLink() {
  const navigate = useNavigate();

  return (
    <>
      <SearchUsers />
      <Stack gap="22px" marginLeft="32px" marginRight="16px" marginTop="16px">
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
        >
          <Stack gap="10px" direction="row">
            <Typography
              fontWeight={400}
              fontSize="12px"
              color={theme.palette.secondary.contrastText}
              padding="5px"
              border={`1px solid ${theme.palette.secondary.light}`}
              borderRadius="3px"
            >
              To generate link, please create a post to use for incoming
              requests
            </Typography>
            <Button
              sx={{
                color: '#fff',
                fontSize: '12px',
                fontWeight: 500,
                height: '32px',
                background: theme.palette.primary.main,
                textTransform: 'unset !important',
              }}
              onClick={() => navigate('/s4s/invite-link-create-post')}
            >
              Create Post
            </Button>
          </Stack>
          <Stack marginTop="32px" gap="22px" marginLeft="16px">
            <S4SLinkMessage
              icon={<ImportSvg />}
              title="Invite others to Share for Share with you"
            />
            <S4SLinkMessage
              icon={<DocumentText />}
              title="Control who you Share for Share with by accepting or declining each request"
            />
            <S4SLinkMessage
              icon={<LinkSvg />}
              title="This link doubles as your affiliate link! New Creators that join AgencyGow while requesting an S4S with Ankur via this link will be considered a referral."
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
