import React, { useState } from 'react';
import classes from './styles.module.css';
import { Button, Divider } from '@mui/material';
import Home from './Sections';
import Sections from './Sections';
interface TabProps {
  handleTabChange: (name: string) => void;
}

interface ChildState {
  checked: boolean;
  radioValue: string;
}

interface ChildrenState {
  [childKey: string]: ChildState;
}

interface ParentState {
  [parentKey: string]: ChildrenState;
}
function RoleManager(props: TabProps) {
  const { handleTabChange } = props;
 

  return (
    <div>
      <div className={classes.navWrapper}>
        <div
          className={classes.homeText}
          onClick={() => handleTabChange('Role')}
        >
          Role management
        </div>
        <div>Manager </div>
      </div>
      <div className={classes.titleWrapper}>
        <div>
        <div className={classes.headingText}>
            Role Settings</div>
            <div className={classes.subHeadingTextCss}>
            Manage account permissions here.
            </div>
        </div>
        
        <Button variant="contained" sx={{ color: 'white' }}>
          Save Changes
        </Button>
      </div>
      <Divider sx={{color:'white',background:'white',marginBottom:'32px'}}/>
      <div className={classes.sectionWrapper}>
        <Sections/>
      </div>
    </div>
  );
}

export default RoleManager;
