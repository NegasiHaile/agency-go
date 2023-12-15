import classes from './styles.module.css';
import React, { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Stack } from '@mui/material';

interface RenderCheckboxProps {
  parentKey: string;
  childKey: string;
  checked: boolean;
  radioValue: string;
  handleCheckboxChange: (parentKey: string, childKey: string) => void;
  handleRadioChange: (parentKey: string, childKey: string, event: ChangeEvent<HTMLInputElement>) => void;
}



const RenderCheckbox: React.FC<RenderCheckboxProps> = ({ parentKey, childKey, checked, radioValue, handleCheckboxChange, handleRadioChange }) => (
  <div key={`${parentKey}-${childKey}`}>
    <Box sx={{padding:"12px",borderBottom:'1px solid #292929'}} className={classes.childBox}>
    <Stack direction="row" justifyContent="space-between" flexDirection="row" sx={{pl:'30px'}} >
    <FormControlLabel
      label={`${childKey}`}
      control={
        <Checkbox
        style={{
            color:'#04A1FF',
            borderColor: 'white', // Change the border color
            borderRadius: '12px' // Change the border radius
          }}
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
      <FormControlLabel value="option1" control={<Radio  sx={{color:'white'}}/>} label="Allow access" sx={{fontSize:'10px'}}/>
      <FormControlLabel value="option2" control={<Radio sx={{color:'white'}} />} label="If granted permission"sx={{fontSize:'10px'}}/>
      <FormControlLabel value="option3" control={<Radio  sx={{color:'white'}}/>} label="Deny access" sx={{fontSize:'10px'}} />
    </RadioGroup>
    </Stack>
    </Box>
    
  </div>
);

interface RenderSectionProps {
  parentKey: string;
  children: { [childKey: string]: { checked: boolean; radioValue: string } };
  handleCheckboxChange: (parentKey: string, childKey: string) => void;
  handleRadioChange: (parentKey: string, childKey: string, event: ChangeEvent<HTMLInputElement>) => void;
}

const RenderSection: React.FC<RenderSectionProps> = ({ parentKey, children, handleCheckboxChange, handleRadioChange }) => (
  <div key={parentKey} className={classes.sectionWrapperCss}>
    <FormControlLabel
      label={`${parentKey}`}
      sx={{
        marginLeft:'12px',
        padding:'12px 0px',

     
      }}
      control={
        <Checkbox
        style={{
          color:'#04A1FF',
          borderColor: 'white', // Change the border color
          borderRadius: '12px' // Change the border radius
        }}
          checked={Object.values(children).every(child => child.checked)}
          indeterminate={Object.values(children).some(child => child.checked) && !Object.values(children).every(child => child.checked)}
          onChange={() => { }}
        />
      }
    />
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {Object.entries(children).map(([childKey, { checked, radioValue }]) =>
        <RenderCheckbox
          key={`${parentKey}-${childKey}`}
          parentKey={parentKey}
          childKey={childKey}
          checked={checked}
          radioValue={radioValue}
          handleCheckboxChange={handleCheckboxChange}
          handleRadioChange={handleRadioChange}
        />
      )}
    </Box>
  </div>
);

const Sections: React.FC = () => {
  const [checkboxes, setCheckboxes] = useState({
    ["Home"]:{
      ["Home Page"]:{ checked: false, radioValue: 'option1' } 
    },
   ["OnlyFans Manager"]: { ["New posts"]: { 
    checked: false, radioValue: 'option1' },
     Notification: { checked: false, radioValue: 'option1' } ,
    ["Download valut content"]:{ checked: false, radioValue: 'option1' },
    ["Queue"]:{ checked: false, radioValue: 'option1' },
    ["Collections"]:{ checked: false, radioValue: 'option1' } ,
    ["Statement"]:{ checked: false, radioValue: 'option1' } ,
    ["Statstics"]:{ checked: false, radioValue: 'option1' } ,
    ["My Profile"]:{ checked: false, radioValue: 'option1' } ,
    ["OF Settings"]:{ checked: false, radioValue: 'option1' } 
    },
    ["Analytics"]: { ["Creater Report"]: { checked: false, radioValue: 'option1' }, ["Chatter Report"]: { checked: false, radioValue: 'option1' },
    ["Fans Report"]:{ checked: false, radioValue: 'option1' }  },
    ["Accounting"]: { ["Invoicing"]: { checked: false, radioValue: 'option1' }, ["Payroll"]: { checked: false, radioValue: 'option1' }, ["Book Keeping"]:{ checked: false, radioValue: 'option1' }  },
    ["Growth"]:{
      ["Smart Tags"]:{ checked: false, radioValue: 'option1' } ,
      ["Auto Follow"]:{ checked: false, radioValue: 'option1' } ,
      ["Profile Promotion"]:{ checked: false, radioValue: 'option1' } ,
      ["Trail Links"]:{ checked: false, radioValue: 'option1' } ,
      ["Scripts"]:{ checked: false, radioValue: 'option1' } 
    },
    ["Creator"]:{
      ["Manage Creator"]:{ checked: false, radioValue: 'option1' } 
    },
    ["Employees"]:{
      ["Manage Employees"]:{ checked: false, radioValue: 'option1' } ,
      ["Shift Schedule"]:{ checked: false, radioValue: 'option1' },
      ["Shift Scheduling"]:{ checked: false, radioValue: 'option1' }  ,
      ["Shift Records"]:{ checked: false, radioValue: 'option1' } 
    },
    ["Affiliates"]:{
      ["Affiliates"]:{ checked: false, radioValue: 'option1' } ,
    },
    ["Settings"]:{
      ["Billings"]:{ checked: false, radioValue: 'option1' } ,
      ["Wallet"]:{ checked: false, radioValue: 'option1' } ,
      ["Role Settings"]:{ checked: false, radioValue: 'option1' } ,
      ["Sales Settings"]:{ checked: false, radioValue: 'option1' } ,
      ["About Agency Go"]:{ checked: false, radioValue: 'option1' } ,
      ["Partners"]:{ checked: false, radioValue: 'option1' } ,
    }
  });

  const handleCheckboxChange = (parentKey: string, childKey: string) => {
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [parentKey]: {
        ...prevCheckboxes[parentKey],
        [childKey]: {
          ...prevCheckboxes[parentKey][childKey],
          checked: !prevCheckboxes[parentKey][childKey].checked
        }
      }
    }));
  };

  const handleRadioChange = (parentKey: string, childKey: string, event: ChangeEvent<HTMLInputElement>) => {
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [parentKey]: {
        ...prevCheckboxes[parentKey],
        [childKey]: {
          ...prevCheckboxes[parentKey][childKey],
          radioValue: event.target.value
        }
      }
    }));
  };

  return (
    <div>
               <div className={classes.cardWrapper}>
           <div className={classes.cardHeader}>
             <div className={classes.cardHeaderText}>
                     Section
                 </div>
                 <div className={classes.cardHeaderText}>
                     Subsection
                 </div>
                 <div className={classes.cardHeaderText}>
                     Data Access
                 </div>
             </div>
             <div>
                 {/* <PermissionBox/> */}
             </div>
         </div>
      {Object.entries(checkboxes).map(([parentKey, children]) =>
        <RenderSection
          key={parentKey}
          parentKey={parentKey}
          children={children}
          handleCheckboxChange={handleCheckboxChange}
          handleRadioChange={handleRadioChange}
        />
      )}
    </div>
  );
}

export default Sections;
