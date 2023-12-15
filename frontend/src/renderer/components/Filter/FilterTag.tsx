import { Button, Typography } from '@mui/material';
import CloseCircleSvg from 'renderer/assets/svg/CloseCircleSvg';
import theme from 'renderer/styles/muiTheme';

interface $Props {
  label: string;
  onRemoveFilter: (id: string) => void;
}

export default function FilterTag({ label, onRemoveFilter }: $Props) {
  return (
    <Button
      onClick={() => onRemoveFilter(label)}
      sx={{
        background: theme.palette.primary.contrastText,
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        textTransform: 'unset',
        height: '32px',
      }}
    >
      <Typography variant="body2" color="#fff" fontSize="10px">
        {label}
      </Typography>
      <CloseCircleSvg />
    </Button>
  );
}
