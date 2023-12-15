import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Overlay from 'renderer/components/Settings/Wallet/Common/Modal';
import styles from 'renderer/components/Settings/Wallet/Common/Modal/styles.module.css';
import { ModalFooter } from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { Stack } from '@mui/system';
import fetchReq from 'utils/fetch';

interface $Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGroupId?: string;
  showSubGroups?: any;
}

export default function DeleteSubGroupModal({
  open,
  setOpen,
  selectedGroupId,
  showSubGroups,
}: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const deleteHandler = () => {
    const endPoint = 'agency/deletegroup/' + selectedGroupId;
    const options = {
      method: 'DELETE' as 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endPoint, options)
      .then((response) => response.json())
      .then((res) => {
        // refetch();
        showSubGroups();
      })
      .catch((err) => console.log(err));
    // reset();
    // setSelectedGroup('');
    // setGroupName("")
    setOpen(false);
  };

  const cancelHandler = () => {
    setOpen(false);
    // reset();
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <Overlay
      heading={'Delete Group'}
      open={open}
      handleClose={handleModalClose}
    >
      <Box
        sx={{
          backgroundColor: isDarkTheme ? '#4B4B4B' : '#fff',
        }}
      >
        <form
          className={styles.modalBody}
          id="deleteSubGroup"
          onSubmit={deleteHandler}
        >
          <Stack
            gap="10px"
            sx={{
              marginInline: '30px',
              padding: '10px 0px',
            }}
            className={styles.inputListWrapper}
          >
            <Typography>Are you sure to delete?</Typography>
          </Stack>
        </form>
      </Box>
      <ModalFooter
        addHandler={deleteHandler}
        cancelHandler={cancelHandler}
        addText="Delete"
        id="deleteSubGroup"
      />
    </Overlay>
  );
}
