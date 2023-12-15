import { Box, Button, Typography } from '@mui/material';
import theme from 'renderer/styles/muiTheme';

interface $Props {
  firstTitle: string;
  secondTitle: string;
  currentTag: string;
  onSwitchTag: (v: string) => void;
}

export default function SwitchTag({
  firstTitle,
  secondTitle,
  currentTag,
  onSwitchTag,
}: $Props) {
  const getBackground = (title: string) =>
    title === currentTag ? theme.palette.secondary.light : 'auto';

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.primary.contrastText}`,
        borderRadius: '4px',
        width: 'max-content',
      }}
    >
      <Button
        variant="text"
        sx={{
          background: getBackground(firstTitle),
          '&:hover': {
            background: getBackground(firstTitle),
            filter: 'brightness(0.9)',
          },
        }}
        onClick={() => onSwitchTag(firstTitle)}
      >
        <Typography fontWeight={600} fontSize="12px" color="#fff">
          {firstTitle}
        </Typography>
      </Button>
      <Button
        variant="text"
        sx={{
          background: getBackground(secondTitle),
          '&:hover': {
            background: getBackground(secondTitle),
            filter: 'brightness(0.9)',
          },
        }}
        onClick={() => onSwitchTag(secondTitle)}
      >
        <Typography fontWeight={600} fontSize="12px" color="#fff">
          {secondTitle}
        </Typography>
      </Button>
    </Box>
  );
}
