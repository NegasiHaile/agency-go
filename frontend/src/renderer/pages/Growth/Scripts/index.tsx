import { useState } from 'react';
import SearchInput from 'renderer/components/SearchInput';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import { Add } from '@mui/icons-material';
import FileNotFound from 'renderer/assets/svg/FileNotFound';
import SearchUsers from 'renderer/components/SearchUsers';
import styles from './styles.module.css';
import DataNotFound from 'renderer/components/DataNotFound';

const tags = ['All tags', 'Tag 1'];

const headTags = ['Name', 'Text', 'Tags', 'Statistics', 'Operations'];

function Scripts() {
  const [search, setSearch] = useState('');
const theme = useTheme();
  const onSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <>
      <SearchUsers />
      <Box marginLeft="32px" marginRight="16px" marginTop="16px">
        <Stack gap="22px">
          <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
            <SearchInput
              value={search}
              onUpdateSearch={onSearch}
              onSearch={() => {}}
            />
            <Stack direction="row" gap="10px">
              <Button
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  marginLeft: 'auto',
                  height: '32px',
                  textTransform: 'unset',
                }}
              >
                <Typography
                  fontWeight={600}
                  fontSize="14px"
                  color={theme.palette.primary.main}
                  textTransform="unset"
                >
                  Reset
                </Typography>
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: theme.palette.primary.main,
                  marginLeft: 'auto',
                  height: '32px',
                  textTransform: 'unset',
                }}
              >
                <Typography
                  fontWeight={600}
                  fontSize="14px"
                  color="#fff"
                  textTransform="unset"
                >
                  Filter
                </Typography>
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" gap="16px" alignItems="center">
            <Button
              variant="text"
              sx={{
                borderColor: theme.palette.primary.main,
                height: '32px',
                textTransform: 'unset',
              }}
              startIcon={<Add sx={{ color: theme.palette.primary.main }} />}
            >
              <Typography
                fontWeight={600}
                fontSize="14px"
                fontFamily={'Arimo'}
                color={theme.palette.primary.main}
                textTransform="unset"
              >
                New Tag
              </Typography>
            </Button>
            {tags.map((tag) => (
              <Typography
                fontWeight={600}
                fontSize="11px"
                color="#fff"
                fontFamily={'Arimo'}
                textTransform="unset"
                padding="5px 7px"
                borderRadius="16px"
                sx={{ background: theme.palette.primary.main }}
              >
                {tag}
              </Typography>
            ))}
          </Stack>
          <Box
            sx={{
              borderRadius: '12px',
              border: `1px solid ${theme.palette.primary.contrastText}`,
            }}
          >
            <Stack
              gap="16px"
              direction="row"
              justifyContent="space-between"
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
              }}
              className={styles.campaign}
              paddingTop="30px"
              paddingBottom="12px"
              paddingX="16px"
            >
              {headTags.map((tag) => (
                <Typography fontWeight={600} fontSize="16px">
                  {tag}
                </Typography>
              ))}
            </Stack>
            <DataNotFound />
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default Scripts;
