import React from 'react';
import AccountSvg from 'renderer/assets/svg/AccountSvg';
import ChevronSettingNav from 'renderer/assets/svg/ChevronSettingNav';
import classes from './styles.module.css';
import { Typography, useTheme } from '@mui/material';
import { t } from 'i18next';

interface NavTabsProps {
  isActive: boolean;
  handleOnChange: (value: string) => void;
  navItem: {
    label: string;
    value: string;
    icon: any;
  };
}

function NavTabs(props: NavTabsProps) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const { isActive, navItem, handleOnChange } = props;
  const { label, value, icon } = navItem;

  const getTextColor = () => {
    let color =
      (isActive && isDarkTheme) ||
      (!isActive && isDarkTheme) ||
      (isActive && !isDarkTheme)
        ? '#fff'
        : '#000';
    return color;
  };
  const getIconColor = () => {
    let color =
      (isActive && isDarkTheme) ||
      (!isActive && isDarkTheme) ||
      (isActive && !isDarkTheme)
        ? classes.navIconDark
        : classes.navIconLight;
    return color;
  };
  return (
    <div
      onClick={() => handleOnChange(value)}
      className={isActive ? classes.navActiveWrapper : classes.navWrapper}
    >
      <div className={classes.navIconTextWrap}>
        <div className={getIconColor()}>{icon}</div>
        <Typography
          className={classes.navText}
          style={{ color: getTextColor() }}
        >
          {t(`${label}`)}
        </Typography>
      </div>
      {isActive && (
        <div className={classes.chevronIcon}>
          <ChevronSettingNav />
        </div>
      )}
    </div>
  );
}

export default NavTabs;
