import { Modal, useTheme } from '@mui/material';
import React, { ReactNode } from 'react';
import classes from './styles.module.css';
import { Box } from '@mui/system';

interface OverlayProps {
  heading: string;
  children: ReactNode | ReactNode[];
  open: boolean;
  handleClose: () => void;
  style?: any;
}

function Overlay(props: OverlayProps) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  const { heading, children, open, handleClose, style } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        paddingTop: '20px',
        overflow: 'scroll',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div className={classes.innerWrapper} style={style}>
        <Box
          className={classes.modalHeader}
          sx={{
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
          }}
        >
          {heading}
        </Box>
        {children}
      </div>
    </Modal>
  );
}

export default Overlay;
