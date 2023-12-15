import { Box, Stack, Typography, useTheme } from '@mui/material';

interface $Props {
  tabButton: any;
  setActiveButton?: any;
  activeButton?: number | string;
}

export default function ButtonGroup({
  tabButton,
  setActiveButton,
  activeButton,
}: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box
      display="flex"
      border="1px solid "
      borderColor="primary.contrastText"
      width="fit-content"
      borderRadius="6px"
      sx={{   cursor:'pointer'}}
    >
      {tabButton.map((val: any) => {
        return (
          <Stack
            sx={
              val.id === activeButton
                ? {
                    padding: '8px 12px',
                    background: isDarkTheme ? '#292929' : '#EAF1FF',
                    color:isDarkTheme ? '#fff' : '#000',
                    borderRadius: '4px',
                   
                  }
                : { padding: '8px 12px',color:isDarkTheme ? '#fff' : '#000', borderRadius: '4px' }
            }
            onClick={() => setActiveButton(val.id)}
          >
            <Typography fontSize="14px">{val.title}</Typography>
          </Stack>
        );
      })}
    </Box>
  );
}
