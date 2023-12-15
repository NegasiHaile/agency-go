import { Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { KeyboardArrowRight } from '@mui/icons-material';

interface $Props {
  steps: {
    label: string;
    link: string;
  }[];
}

export default function MultiNavLink({ steps }: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="max-content"
      marginBottom="16px"
    >
      {steps.map(({ label, link }, index) => (
        <Stack key={label} flexDirection="row" alignItems="center" spacing={2}>
          <Link to={link} style={{ textDecoration: 'none' }}>
            <Typography
              color={isDarkTheme ? '#fff' : '#000'}
              fontSize="11px"
              fontWeight={500}
              sx={{
                textDecoration:
                  steps.length - 1 !== index ? 'underline' : 'inherit',
              }}
            >
              {label}
            </Typography>
          </Link>
          {steps.length - 1 !== index && (
            <KeyboardArrowRight
              sx={{ color: '#292929', marginTop: '0 !important' }}
            />
          )}
        </Stack>
      ))}
    </Stack>
  );
}
