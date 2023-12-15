import React from 'react';
import classes from './styles.module.css';
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material';
interface PermissionBoxProps {
    parentKey: string;
    childKey: string;
    checked: boolean;
    radioValue: string;
    handleCheckboxChange: (parentKey: string, childKey: string) => void;
    handleRadioChange: (parentKey: string, childKey: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const PermissionBox: React.FC<PermissionBoxProps> = ({ parentKey, childKey, checked, radioValue, handleCheckboxChange, handleRadioChange }) => {
return (
    <div className={classes.permissionWrapperCss}>
        <div key={`${parentKey}-${childKey}`}>
      <FormControlLabel
        label={`Child ${childKey}`}
        control={
          <Checkbox
            checked={checked}
            onChange={() => handleCheckboxChange(parentKey, childKey)}
          />
        }
      />
      <RadioGroup
        row
        aria-label={`RadioGroup-${parentKey}-${childKey}`}
        name={`RadioGroup-${parentKey}-${childKey}`}
        value={radioValue}
        onChange={(event) => handleRadioChange(parentKey, childKey, event)}
      >
        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
        <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
        <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
      </RadioGroup>
    </div>
    </div>
)
}

export default PermissionBox;