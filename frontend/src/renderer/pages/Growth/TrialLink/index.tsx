import { useState } from 'react';
import SearchInput from 'renderer/components/SearchInput';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import { Add } from '@mui/icons-material';
import SearchUsers from 'renderer/components/SearchUsers';
import styles from './styles.module.css';

function TrialLinks() {
  const [search, setSearch] = useState('');

  const onSearch = (value: string) => {
    setSearch(value);
  };
const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <>
      <SearchUsers />
      <Box marginLeft="32px" marginRight="16px" marginTop="16px">
        <Stack gap="22px">
          <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
            <Box sx={{flexGrow:1}}>
              <SearchInput
                value={search}
                onUpdateSearch={onSearch}
                onSearch={() => {}}
                placeholder="Search by Campaign Name"
               
              />
            </Box>
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
                fontSize="12px"
                color="#fff"
                textTransform="unset"
              >
                Create Link
              </Typography>
            </Button>
          </Stack>
          <Stack gap="10px">
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

export default TrialLinks;
