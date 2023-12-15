import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import theme from 'renderer/styles/muiTheme';
import styles from './styles.module.css';
import SearchUsers from 'renderer/components/SearchUsers';

function ProfilePromotion() {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <>
      <SearchUsers />
      <Box marginLeft="32px" marginRight="16px" marginTop="16px">
        <Stack gap="12px">
          <Button
            variant="contained"
            sx={{
              background: theme.palette.primary.main,
              marginLeft: 'auto',
              height: '32px',
              textTransform: 'unset',
            }}
            startIcon={<Add sx={{ color: '#fff' }} />}
          >
            <Typography
              fontWeight={600}
              fontSize="14px"
              color="#fff"
              textTransform="unset"
            >
              Create Promotion
            </Typography>
          </Button>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${theme.palette.primary.contrastText}`}
            paddingBottom="32px"
          >
            <Stack gap="8px">
              <Typography fontSize="22px" fontWeight={700} fontFamily={'Arimo'}>
                Auto-activate campaign
              </Typography>
              <Typography fontSize="14px" fontWeight={600} fontFamily={'Arimo'}>
                Enable to automatically reactivate your promotions when they
                expire
              </Typography>
              <Box marginTop="10px">
                <Typography fontWeight={400} fontSize="14px" marginBottom="5px">
                  Offer Expiration
                </Typography>
                <Select
                  id="offer-expiration"
                  value={7}
                  onChange={() => {}}
                  sx={{
                    backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
                    width: '300px',
                    height: '42px',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },

                    input: {
                      backgroundColor: theme.palette.secondary.contrastText,
                    },
                  }}
                >
                  <MenuItem
                    value={7}
                    sx={{ fontWeight: 400, fontSize: '12px' }}
                  >
                    7 Days
                  </MenuItem>
                </Select>
              </Box>
            </Stack>
            <Switch />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${theme.palette.primary.contrastText}`}
            paddingBottom="32px"
          >
            <Stack gap="10px" >
              <Box marginTop="10px">
                <Typography fontWeight={400} fontSize="14px" marginBottom="5px">
                  Add Fans To List
                </Typography>
                <Select
                  id="offer-expiration"
                  value={7}
                  onChange={() => {}}
                  sx={{
                    backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
                    width: '300px',
                    height: '42px',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },
                  }}
                >
                  <MenuItem
                    value={7}
                    sx={{ fontWeight: 400, fontSize: '12px' }}
                  >
                    IFA Profile Promotion
                  </MenuItem>
                </Select>
              </Box>
            </Stack>
            <Switch />
          </Stack>
          <Stack gap="16px" marginTop={'16px'}>
            <Typography fontWeight={600} fontSize="14px">
              Campaign Insights
            </Typography>
            <Stack
              gap="16px"
              direction="row"
              justifyContent="space-between"
              sx={{ backgroundColor: theme.palette.primary.contrastText }}
              className={styles.campaign}
              paddingTop="30px"
              paddingBottom="12px"
              paddingX="16px"
            >
              <Typography fontWeight={600} fontSize="16px">
                Promo
              </Typography>
              <Typography fontWeight={600} fontSize="16px">
                Claims
              </Typography>
              <Typography fontWeight={600} fontSize="16px">
                Revenue
              </Typography>
              <Typography fontWeight={600} fontSize="16px">
                Operations
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default ProfilePromotion;
