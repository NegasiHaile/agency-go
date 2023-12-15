import Checkbox from '@mui/material/Checkbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import LensIcon from '@mui/icons-material/Lens';
import { FormControlLabel, FormGroup, Typography } from '@mui/material';

export default function IconCheckboxes(title: any) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            icon={<LensIcon sx={{ color: '#fff' }} />}
            checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#B2E2FF' }} />}
          />
        }
        label={`${title.title}`}
      />
    </FormGroup>
  );
}
