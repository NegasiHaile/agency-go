import AffiliateSvg from 'renderer/assets/svg/affiliatesSvg';
import InfoSvg from 'renderer/assets/svg/infoSvg';
import NetworkSvg from 'renderer/assets/svg/networkSvg';
import BellSvg from 'renderer/assets/svg/bellSvg';
import ShieldSvg from 'renderer/assets/svg/shieldSvg';
import AvatarSvg from 'renderer/assets/svg/AvatarSvg';
import LeftChevronSvg from 'renderer/assets/svg/leftChevronSvg';
import RightChevronSvg from 'renderer/assets/svg/rightChevronSvg';
import { NavLink } from 'react-router-dom';
import {
  Box,
  ButtonBase,
  Divider,
  List,
  ListItem,
  Popover,
  Switch,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import localisation from '../../../localisation.json';
import classes from './styles.module.css';
import { AuthContext } from 'renderer/contexts/AuthContext';
import darkTheme from 'renderer/styles/MuiThemeDark';
import lightTheme from 'renderer/styles/muiTheme';

const navigationItemsConst = [
  {
    name: localisation.version,
    icon: <InfoSvg />,
  },
  {
    name: localisation.utc,
    icon: <InfoSvg />,
  },
  // {
  //   name: localisation.affiliates,
  //   icon: <AffiliateSvg />,
  // },
  {
    name: localisation.networkReport,
    icon: <NetworkSvg />,
  },
  {
    name: '',
    icon: <BellSvg />,
    link: '/notification',
  },
  {
    name: '',
    icon: <ShieldSvg />,
    link: '/settings',
  },
];

function NavigationItem(props: any) {
const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';


  const { name, icon, link } = props;
  const renderNavItem = () => (
    <div className={classes.navItem}>
      {/* <div className={classes.navItemText}>{name}</div> */}
      <Typography sx={{ fontWeight: '600', fontSize: '14px' }}>
        {name}
      </Typography>

      <div className={isDarkTheme ? classes.navIcon : `${classes.navIcon} ${classes.navIconLight}`}>
        {icon}
      </div>
    </div>
  );

  if (link) {
    return (
      <NavLink to={link} className={classes.navLink}>
        {renderNavItem()}
      </NavLink>
    );
  }
  return renderNavItem();
}

function Header() {
  const currentElem = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const { logout } = useContext(AuthContext);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);




  const handleLogout: () => void = () => {
    logout();
  };

  // function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    const theme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    setToggleDarkMode(!toggleDarkMode);
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event("storage",));
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <div className={classes.navbar}  style={{backgroundColor:isDarkTheme?'#0C0C0C':'#fff'}}>
      <div className={classes.start}>
        {/* <LeftChevronSvg />
        <RightChevronSvg /> */}
      </div>

      <div className={classes.endWrapper}>
        <div className={classes.middle} />
        <div className={classes.end}>
          {navigationItemsConst.map(({ name, icon, link }) => {
            return (
              <NavigationItem name={name} icon={icon} link={link} key={name} />
            );
          })}
          <div className={classes.navItem}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '20px',
              }}
            >
              <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
                Dark
              </Typography>
              <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
              <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
                Light
              </Typography>
            </Box>
            <ButtonBase
              type="button"
              onClick={() => setShow(!show)}
              aria-label="User Menu"
            >
              <div
                className={classes.navIcon}
                aria-haspopup="true"
                aria-expanded={show}
                ref={currentElem}
              >
                <AvatarSvg />
              </div>
            </ButtonBase>

            <Popover
              id="user-menu-popover"
              open={show}
              anchorEl={currentElem.current}
              onClose={() => setShow(false)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div className={classes.popoverUser}>
                <List sx={{ gap: '16px' }}>
                  <ListItem>
                    <Typography fontSize={13} color="#AAAAAA" fontWeight={600}>
                      Help and Support
                    </Typography>
                  </ListItem>
                  <Divider color="#292929" />
                  <ListItem>
                    <ButtonBase onClick={handleLogout}>
                      <Typography
                        fontSize={13}
                        color="#FF0000"
                        fontWeight={600}
                      >
                        Logout
                      </Typography>
                    </ButtonBase>
                  </ListItem>
                </List>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
