import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, Stack, useTheme } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './styles.module.css';

function Options(props: any) {
  const { menu, handlePopoverClose } = props;

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box onMouseLeave={handlePopoverClose} sx={{ borderRadius: '10px' }}>
      {menu.map((menuItem: any, index: any) => (
        <Box sx={{ width: '100%' }} className={classes.optionWrapper}>
          <NavLink
            to={menuItem.link || '#'}
            className={classes.optionItem}
            key={menuItem.label}
          >
            {menuItem.label}
          </NavLink>
          <div
            style={{
              width: '80%',
              height: '1px',
              backgroundColor: isDarkTheme
                ? 'rgba(255, 255, 255, 0.2)'
                : '#EAF1FF',
            }}
          ></div>
        </Box>
      ))}
    </Box>
  );
}
export default function SidebarItem(props: any) {
  const {
    name,
    icon,
    menu,
    link,
    index,
    currentNavItemHovered,
    handlePopoverOpen,
    handlePopoverClose,
  } = props;

  const currentElem = React.useRef(null);
  const open = currentNavItemHovered === index;
  const location = useLocation();

  const getActiveStatus = () => {
    return (
      link?.includes(location.pathname) ||
      menu?.some((el: any) => el.link?.includes(location.pathname)) ||
      location.pathname === link
    );
  };

  const isActive = getActiveStatus();

  const openPopOver = () => {
    if (Array.isArray(menu) && menu.length > 0) {
      handlePopoverOpen(index);
    } else {
      handlePopoverOpen(-1);
    }
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  // Determine the class based on the theme
  const activeClass = isDarkTheme
    ? classes.sidebarItemWrapperActiveDark
    : classes.sidebarItemWrapperActiveLight;

  const wrapperClass = isDarkTheme
    ? classes.sidebarItemWrapperDark
    : classes.sidebarItemWrapperLight;

  const getImageColor = () => {
    let color = '';
    if (open && !isDarkTheme) {
      color =
        'brightness(0) saturate(100%) invert(45%) sepia(77%) saturate(1638%) hue-rotate(176deg) brightness(99%) contrast(105%);';
    }
    return color;
  };

  const getTextColor = () => {
    let color = '#fff';
    if (open && !isDarkTheme) {
      color = '#04a1ff';
    } else if (isActive && !isDarkTheme) {
      color = '#04a1ff';
    }
    return color;
  };

  return (
    <div className={open || isActive ? activeClass : wrapperClass}>
      <NavLink to={link || '#'} className={classes.sidebarItemNav}>
        <Stack
          alignItems="center"
          
          sx={
            isDarkTheme
              ? {
                  '&:hover': {
                    filter:
                      'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(307deg) brightness(103%) contrast(101%)',
                  },
                }
              : {
                  '&:hover': {
                    filter:
                      'brightness(0) saturate(100%) invert(45%) sepia(77%) saturate(1638%) hue-rotate(176deg) brightness(99%) contrast(105%)',
                  },
                  cursor: 'pointer',
                }
          }
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={openPopOver}
          ref={currentElem}
          onMouseLeave={handlePopoverClose}
        >
          <Box
            className={
              isActive && !isDarkTheme ? classes.iconLight : classes.iconDark
            }
            sx={{ filter: getImageColor() }}
          >
            {icon}
          </Box>
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 600,
              marginTop: '4px',
              color: getTextColor(),
              textAlign: 'center',
            }}
          >
            {name}
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'cursor',
            }}
            open={open}
            elevation={20}
            anchorEl={currentElem.current}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 60,
              horizontal: -20,
            }}
            onClose={handlePopoverClose}
          >
            <Options menu={menu} handlePopoverClose={handlePopoverClose} />
          </Popover>
        </Stack>
      </NavLink>
    </div>
  );
}
