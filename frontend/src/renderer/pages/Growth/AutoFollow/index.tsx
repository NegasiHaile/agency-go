import { Box, Button, Divider, Stack, Switch, Typography, useTheme } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import theme from 'renderer/styles/muiTheme';
import SettingSvg from 'renderer/assets/svg/SettingSvg';
import UserCircleAddSvg from 'renderer/assets/svg/UserCircleAddSvg';
import { useNavigate } from 'react-router-dom';
import SearchUsers from 'renderer/components/SearchUsers';

function AutoFollow() {
  const navigate = useNavigate();

  const onOpenScanDetails = () => navigate('/growth/auto-follow-scan-details');

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';


  return (
    <>
      <SearchUsers />
      <Box marginLeft="32px" marginRight="16px" marginTop="16px">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap="16px" alignItems="center">
            <Typography fontWeight={700} fontSize="22px" fontFamily={'Arimo'}>
              Expired Fans Overview
            </Typography>
            <ErrorOutline
              sx={{ color: theme.palette.secondary.contrastText }}
            />
          </Stack>

          <Box
            sx={{
              filter: isDarkTheme
                ? 'brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(13%) hue-rotate(81deg) brightness(106%) contrast(106%);'
                : 'brightness(0) saturate(100%) invert(0%) sepia(4%) saturate(7500%) hue-rotate(244deg) brightness(94%) contrast(103%);',
            }}
          >
            <SettingSvg />
          </Box>
        </Stack>
        <Stack
          direction="row"
          gap="16px"
          alignItems="center"
          marginY="32px"
          justifyContent="space-between"
        >
          <Typography fontWeight={600} fontSize="14px" fontFamily={'Arimo'}>
            Followed 0 expired fans for Joan Adams
          </Typography>
          <Button variant="text" onClick={onOpenScanDetails}>
            <Typography
              color={theme.palette.primary.main}
              fontWeight={600}
              fontSize="14px"
              textTransform={'none'}
            >
              Details
            </Typography>
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding="16px"
          borderRadius="4px"
          bgcolor={isDarkTheme ? '#292929' : '#EAF1FF'}
        >
          <Stack gap="16px" alignItems="start">
            <Stack
              direction="row"
              gap="16px"
              alignItems="flex-start"
              justifyContent="start"
            >
              <Typography fontWeight={600} fontSize="18px" fontFamily={'Arimo'}>
                Automatically follow expired fans
              </Typography>
              <ErrorOutline
                sx={{ color: theme.palette.secondary.contrastText }}
              />
            </Stack>
            <Typography fontWeight={600} fontSize="14px" fontFamily={'Arimo'}>
              Automatically follow expired fans every day without any additional
              effort. (Recommended)
            </Typography>
          </Stack>
          <Switch />
        </Stack>
        <Stack
          gap="5px"
          padding="16px"
          borderRadius="4px"
          marginTop="32px"
          sx={{ border: `1px solid ${theme.palette.primary.contrastText}` }}
        >
          <Typography fontWeight={600} fontSize="18px">
            Manually Follow Expired Fans
          </Typography>
          <Typography fontWeight={600} fontSize="14px">
            Search for expired fans and select which fans you wish to subscribe
            to.
          </Typography>
          <Stack direction="row" marginY="16px">
            <Button
              variant="contained"
              sx={{ background: theme.palette.primary.main, color: '#fff' }}
              startIcon={<UserCircleAddSvg />}
            >
              <Typography
                fontWeight={500}
                fontFamily={'Arimo'}
                fontSize="14px"
                padding="5px 10px"
                textTransform={'none'}
              >
                Search Expired Fans
              </Typography>
            </Button>
            <Button variant="text">
              <Typography
                fontWeight={600}
                fontSize="14px"
                color={theme.palette.secondary.contrastText}
                padding="5px 10px"
                fontFamily={'Arimo'}
                textTransform={'none'}
              >
                Show scan details
              </Typography>
            </Button>
          </Stack>
          <Typography fontWeight={400} fontSize="11px" fontFamily={'Arimo'}>
            Last scanned on Aug 26 2023, 06:30 am
          </Typography>
          <Divider sx={{ height: '1px', marginTop: '32px' }} />
        </Stack>
      </Box>
    </>
  );
}

export default AutoFollow;
