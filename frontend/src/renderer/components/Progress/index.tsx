import { Box } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#308fe8',
  },
}));

interface ContentHubStorageBarProps {
  percentage: number;
}

export default function ContentHubStorageBar(props: ContentHubStorageBarProps) {
  const { percentage } = props;

  return (
    <Box>
      <BorderLinearProgress variant="determinate" value={percentage} />
    </Box>
  );
}
