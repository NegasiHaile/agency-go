import React, { useState } from 'react';
import { Stack, IconButton, Typography, MenuItem, Menu } from '@mui/material';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListIcon from '@mui/icons-material/List';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function GridSelectionItem() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Stack direction="row" alignItems="center">
        <IconButton onClick={handleMenuClick}>
          <GridViewOutlinedIcon  />
          <KeyboardArrowDownOutlinedIcon
            sx={{ fontSize: 18 }}
          />
        </IconButton>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiPaper-root': {
          
            width:'190px'
          },
        }}
      >
        <MenuItem sx={{ justifyContent: 'space-between' }}>
          <Typography>Grid</Typography>
          <GridViewOutlinedIcon />
        </MenuItem>

        <MenuItem sx={{ justifyContent: 'space-between' }}>
          <Typography>Large Grid</Typography>
          <ViewModuleIcon  />
        </MenuItem>

        <MenuItem sx={{ justifyContent: 'space-between' }}>
          <Typography> List</Typography>
          <ListIcon  />
        </MenuItem>

        <MenuItem sx={{ justifyContent: 'space-between' }}>
          <Typography>Large List</Typography>
          <ViewListIcon  />
        </MenuItem>
      </Menu>
    </div>
  );
}
