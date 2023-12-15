import { ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import styles from './styles.module.css';

interface $Props {
  children: ReactNode | ReactNode[];
}

function PageTopbar({ children }: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Box
      component={'header'}
      className={styles.header}
      sx={{
        backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
      }}
    >
      {children}
    </Box>
  );
}

function HeaderText({ children }: $Props) {
  return (
    <Typography variant="h1" fontSize={'34px'} fontWeight={600} margin={0}>
      {children}
    </Typography>
  );
}

interface $ButtonProps {
  endIcon?: ReactNode | ReactNode[];
  startIconMenu?: ReactNode | ReactNode[];
  startIcon?: ReactNode | ReactNode[];
  onClick?: () => void;
  // startIconClick?: () => void;
  // endIconClick?: () => void;
  text: string;
  color?: 'primary' | 'secondary';
  isLink?: boolean;
  isActiveLink?: boolean;
  tabButton?: boolean;
  tabData?: any;
}

function ButtonElement({
  onClick,
  tabButton = false,
  text,
  color = 'primary',
  endIcon,
  isLink = false,
  isActiveLink = false,
}: $ButtonProps) {
  const getWidth = () => {
    let width = 'max-content';
    if (tabButton) {
      width = '200px';
    }
    return width;
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const getColor = () => {
    let color = isDarkTheme ? '#fff' : '#000';

    if (isActiveLink) {
      color = isDarkTheme ? '#fff !important' : '#fff !important';
    }

    return color;
  };
  const getBackgroundColor = () => {
    let backgroundColor = '';
    if (isLink) {
      backgroundColor = 'transparent !important';
    }
    if (isActiveLink) {
      backgroundColor = isDarkTheme ? '#fff !important' : '#000 !important';
    }
    if (isActiveLink && tabButton) {
      backgroundColor = `${theme.palette.primary.main}`;
    }
    return backgroundColor;
  };

  const getBorderRadius = () => {
    let borderRadius = '6px';
    if (isLink) {
      borderRadius = '0 !important';
    }
    if (isActiveLink) {
      borderRadius = '6px 6px 6px 6px !important';
    }
    return borderRadius;
  };

  const getActiveBorder = () => {
    if (isActiveLink && !tabButton) {
      return {
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          border: `2px solid ${theme.palette.primary.main}`,
        },
      };
    }
    return {};
  };

  return (
    <Button
      variant="contained"
      disableElevation={true}
      sx={{
        width: getWidth(),
        height: '32px',
        borderRadius: getBorderRadius(),
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        gap: '5px',
        backgroundColor: getBackgroundColor(),
        position: 'relative',
        ...getActiveBorder(),
        '&.MuiButtonBase-root:hover': {
          bgcolor: '#04A1FF',
        },
      }}
      endIcon={endIcon}
      onClick={onClick}
    >
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 500,
          color: getColor(),

          borderRadius: '10px',
          textTransform: 'none',
          textAlign: 'start',
        }}
      >
        {text}
      </Typography>
    </Button>
  );
}
function ButtonTabElement({
  onClick,
  tabButton = false,
  text,

  endIcon,
  isLink = false,
  isActiveLink = false,
}: $ButtonProps) {
  const getWidth = () => {
    let width = 'max-content';
    if (tabButton) {
      width = '200px';
    }
    return width;
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const getColor = () => {
    let color = isDarkTheme ? '#fff' : '#000';

    if (isActiveLink) {
      color = isDarkTheme ? '#fff !important' : '#000 !important';
    }

    return color;
  };
  const getTabBackgroundColor = () => {
    let backgroundColor = '';
    if (isLink) {
      backgroundColor = 'transparent !important';
    }
    if (isActiveLink) {
      backgroundColor = isDarkTheme ? '#000!important' : '#fff!important';
    }
    if (isActiveLink && tabButton) {
      backgroundColor = `${theme.palette.primary.main}`;
    }
    return backgroundColor;
  };

  const getTabBorderRadius = () => {
    let borderRadius = '3px';
    if (isLink) {
      borderRadius = '0 !important';
    }
    if (isActiveLink) {
      borderRadius = '3px 3px 0px 0px !important';
    }
    return borderRadius;
  };

  const getTabActiveBorder = () => {
    if (isActiveLink && !tabButton) {
      return {
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          border: `2px solid ${theme.palette.primary.main}`,
        },
      };
    }
    return {};
  };

  return (
    <Button
      variant="contained"
      disableElevation={true}
      sx={{
        width: getWidth(),
        height: '32px',
        borderRadius: getTabBorderRadius(),
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: getTabBackgroundColor(),
        position: 'relative',
        ...getTabActiveBorder(),
        '&.MuiButtonBase-root:hover': {
          bgcolor: '#04A1FF',
        },
      }}
      endIcon={endIcon}
      onClick={onClick}
    >
      <Typography
        sx={{
          fontSize: '10px',
          fontWeight: 500,
          color: getColor(),
          marginTop: '2px',
          borderRadius: '6px',
          textTransform: 'unset',
        }}
      >
        {text}
      </Typography>
    </Button>
  );
}

function ButtonTabWithIconsElement({
  onClick,
  // startIconClick,
  // endIconClick,
  startIconMenu,
  tabData,
  tabButton = false,
  text,
  startIcon,
  endIcon,
  isLink = false,
  isActiveLink = false,
}: $ButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDropdown, setOpenDropDown] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openDropIcon = Boolean(openDropdown);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const startIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenDropDown(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenDropDown(null)
  };

  const getWidth = () => {
    let width = 'max-content';
    if (tabButton) {
      width = '200px';
    }
    return width;
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const getColor = () => {
    let color = isDarkTheme ? '#fff' : '#000';

    if (isActiveLink) {
      color = isDarkTheme ? '#fff !important' : '#000 !important';
    }

    return color;
  };
  const getTabBackgroundColor = () => {
    let backgroundColor = '';
    if (isLink) {
      backgroundColor = 'transparent !important';
    }
    if (isActiveLink) {
      backgroundColor = isDarkTheme ? '#000!important' : '#fff!important';
    }
    if (isActiveLink && tabButton) {
      backgroundColor = `${theme.palette.primary.main}`;
    }
    return backgroundColor;
  };

  const getTabBorderRadius = () => {
    let borderRadius = '3px';
    if (isLink) {
      borderRadius = '0 !important';
    }
    if (isActiveLink) {
      borderRadius = '3px 3px 0px 0px !important';
    }
    return borderRadius;
  };

  const getTabActiveBorder = () => {
    if (isActiveLink && !tabButton) {
      return {
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          border: `2px solid ${theme.palette.primary.main}`,
        },
      };
    }
    return {};
  };

  return (
    <Button
      variant="contained"
      disableElevation={true}
      style={{
        width: getWidth(),
        height: '32px',
        borderRadius: getTabBorderRadius(),
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center !important',
        justifyContent: 'center',
        gap: '5px !important',
        backgroundColor: getTabBackgroundColor(),
        position: 'relative',
        ...getTabActiveBorder(),
        // '&.MuiButtonBase-root:hover': {
        //   bgcolor: '#04A1FF',
        // },
      }}
      // endIcon={endIcon}
      onClick={onClick}
    >
      <div
        onClick={startIconClick}
        style={{ marginTop: '7px', marginRight: '10px' }}
        id="start-icon"
        aria-controls={openDropIcon ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openDropIcon ? 'true' : undefined}
      >
        {startIcon}
      </div>
      <Menu
        id="menu"
        aria-labelledby="start-icon"
        anchorEl={openDropdown}
        open={openDropIcon}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {startIconMenu}
      </Menu>
      <div>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            color:'#fff',
            borderRadius: '6px',
            textTransform: 'capitalize',
          }}
        >
          {text}
        </Typography>
      </div>
      <div
        style={{ marginLeft: '20px',marginTop:"5px" }}
        onClick={handleClick}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {endIcon}
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {tabData.map((val: any) => {
          return (
            <MenuItem onClick={() => val.function()}>{val.title}</MenuItem>
          );
        })}
      </Menu>
    </Button>
  );
}

PageTopbar.HeaderText = HeaderText;
PageTopbar.Button = ButtonElement;
PageTopbar.TabButton = ButtonTabElement;
PageTopbar.TabButtonWithIcon = ButtonTabWithIconsElement;

export default PageTopbar;
