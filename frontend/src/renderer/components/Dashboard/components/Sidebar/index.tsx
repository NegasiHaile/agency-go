import React from 'react';

import HomeSvg from 'renderer/assets/svg/homeSvg';
import OnlyManagerSvg from 'renderer/assets/svg/onlyManager';
import AnalyticsSvg from 'renderer/assets/svg/analyticsSvg';
import GrowthSvg from 'renderer/assets/svg/growthSvg';
import S4sSvg from 'renderer/assets/svg/s4sSvg';
import CreatorSvg from 'renderer/assets/svg/creatorsSvg';
import EmployeSvg from 'renderer/assets/svg/employeSvg';
import BrandLogoSvg from 'renderer/assets/svg/brandLogoSvg';
import localisation from '../../../localisation.json';
import SidebarItem from './SidebarItem';
import classes from './styles.module.css';
import AccountingSvg from 'renderer/assets/svg/AccountingSvg';
import Message from 'renderer/assets/svg/messageSvg';
import ContentHubSvg from 'renderer/assets/svg/ContentHubSvg';
import { Drawer, IconButton, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import NewSideBar from './newSideBar';
import ChatSvg from 'renderer/assets/svg/ChatSvg';
import AntyBrowser from 'renderer/assets/svg/AnytBrowser';

const sideBarMenuConst = [
  {
    name: localisation.home,
    icon: <HomeSvg />,
    menu: [],
    link: '/home',
  },
  {
    name: localisation.manager,
    icon: <OnlyManagerSvg />,
    menu: [
      {
        label: 'Notifications',
        value: 'notifications',
        link: '/manager-suite/notifications',
      },
      {
        label: 'Messages',
        value: 'messages',
        link: '/manager-suite/messages',
      },
      {
        label: 'Collections',
        value: 'collections',
        link: '/manager-suite/collections',
      },
      {
        label: 'Vault',
        value: 'vault',
        link: '/manager-suite/vault',
      },
      {
        label: 'Queue',
        value: 'queue',
        link: '/manager-suite/queue',
      },
      {
        label: 'Statements',
        value: 'statements',
        link: '/manager-suite/statements',
      },
      {
        label: 'Statistics',
        value: 'statistics',
        link: '/manager-suite/statistics',
      },
      {
        label: 'My Profile',
        value: 'myprofile',
        link: '/manager-suite/myprofile',
      },
      {
        label: 'New Post',
        value: 'newpost',
        link: '/manager-suite/newpost',
      },
    ],
  },
  {
    name: localisation.content,
    icon: <ContentHubSvg />,
    menu: [],
    link: '/content-hub',
  },
  {
    name: localisation.browser,
    icon: <AntyBrowser />,
    menu: [],
    link: '/browser',
  },
  {
    name: localisation.analytics,
    icon: <AnalyticsSvg />,
    menu: [
      {
        label: 'Create Reports',
        value: 'createReports',
        link: '/analytics/create-reports',
      },
      {
        label: 'Chatter Reports',
        value: 'chatterReports',
        link: '/analytics/chatter-reports',
      },
      {
        label: 'Fan Reports',
        value: 'fanReports',
        link: '/analytics/fan-reports',
      },
    ],
  },
  {
    name: localisation.accounting,
    icon: <AccountingSvg />,
    menu: [
      {
        label: 'Invoicing',
        value: 'invoicing',
        link: '/accounting/invoicing',
      },
      {
        label: 'Payroll',
        value: 'payroll',
        link: '/accounting/payroll',
      },
      {
        label: 'Book Keeping',
        value: 'book-keeping',
        link: '/accounting/book-keeping',
      },
    ],
  },
  {
    name: localisation.growth,
    icon: <GrowthSvg />,
    menu: [
      {
        label: 'Smart Tags',
        value: 'smartTags',
        link: '/growth/smart-tags',
      },
      {
        label: 'Auto Follow',
        value: 'autoFollow',
        link: '/growth/auto-follow',
      },
      {
        label: 'Profile Promotion',
        value: 'profilePromotion',
        link: '/growth/profile-promotion',
      },
      {
        label: 'Trail Links',
        value: 'trialLinks',
        link: '/growth/trial-links',
      },
      {
        label: 'Tracking Links',
        value: 'trackingLinks',
        link: '/growth/tracking-links',
      },
      {
        label: 'Scrips',
        value: 'scripts',
        link: '/growth/scripts',
      },
      {
        label: 'Trial Links',
        value: 'trialLinks',
        link: '/growth/trial-links',
      },
    ],
  },
  // {
  //   name: localisation.s4s,
  //   icon: <S4sSvg />,
  //   menu: [
  //     {
  //       label: 'Discover Creators',
  //       value: 'discoverCreators',
  //       link: '/s4s/discover-creators',
  //     },
  //     {
  //       label: 'Invite Link',
  //       value: 'inviteLink',
  //       link: '/s4s/invite-link',
  //     },
  //     {
  //       label: 'Requests',
  //       value: 'requests',
  //       link: '/s4s/requests',
  //     },
  //     {
  //       label: 'S4S Schedule',
  //       value: 's4sSchedule',
  //       link: '/s4s/schedule',
  //     },
  //     {
  //       label: 'S4S Settings',
  //       value: 's4sSettings',
  //     },
  //   ],
  // },
  {
    name: localisation.creators,
    icon: <CreatorSvg />,
    menu: [],
    link: '/creators',
  },
  {
    name: 'Message',
    icon: <ChatSvg />,
    menu: [],
    link: '/chatmessage',
  },
  {
    name: localisation.employees,
    icon: <EmployeSvg />,
    menu: [
      {
        label: 'Manage Employees',
        value: 'manageEmployees',
        link: '/employees-manage-employees',
      },
      {
        label: 'Manage Shifts',
        value: 'manageShifts',
        link: '/employees-manage-shifts',
      },
    ],
  },
];

function BrandLogo() {
  return (
    <div className={classes.brandLogo}>
      <div className={classes.brandIcon}>
        <BrandLogoSvg />
      </div>
    </div>
  );
}

function SideBar() {
  const [currentNavItemHovered, setCurrentNavItemHovered] =
    React.useState<number>(-1);
  const handlePopoverOpen = (index: number) => {
    setCurrentNavItemHovered(index);
  };
  const [open, setOpen] = React.useState(false);

  const handlePopoverClose = () => {
    setCurrentNavItemHovered(-1);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  // Determine the class based on the theme
  const mode = isDarkTheme ? classes.darkTheme : classes.lightTheme;

  return (
    <div className={`${classes.sidebar} ${mode}`}>
      <BrandLogo />
      <MenuIcon
        onClick={open ? handleDrawerClose : handleDrawerOpen}
        sx={{ marginLeft: '22px', marginTop: '10px' ,color:'#fff'}}
      />
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            width: open ? '240px' : '64px', // Adjust width for the mini variant
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            overflowX: 'hidden',
            backgroundColor: isDarkTheme ? '#0C0C0C' : '#04a1ff',
          },
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: open ? '240px' : '64px', // Adjust width for the mini variant
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            overflowX: 'hidden',
            border: 'none',
            position: 'relative',
          },
        }}
      >
        <div className={classes.toolbar}>
          {/* <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {theme.direction === 'rtl' ? (
              open ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            ) : open ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
        </div>
        <div className={classes.sidebarNavWrapper}>
          {sideBarMenuConst.map(({ name, icon, menu, link }, index) => {
            return (
              <NewSideBar
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                name={name}
                icon={icon}
                menu={menu}
                currentNavItemHovered={currentNavItemHovered}
                index={index}
                link={link}
                key={name}
                open={open}
              />
            );
          })}
        </div>
      </Drawer>
    </div>
  );
}

export default SideBar;
