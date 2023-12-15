import React, { useState, useEffect } from 'react';
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
  selectedGroup?: string;
}

export default function EditSubGroupModal({
  open,
  setOpen,
  selectedGroupId,
  showSubGroups,
  selectedGroup,
}: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  const [newGroupName, setNewGroupName] = useState(selectedGroup);

  useEffect(() => {
    setNewGroupName(selectedGroup);
  }, [selectedGroup]);

  const editHandler = () => {
    const payload = {
      name: newGroupName,
    };
    const endPoint = 'agency/updategroup/' + selectedGroupId;
    const options = {
      method: 'PATCH' as 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify(payload),
    };
    fetchReq(endPoint, options)
      .then((response) => response.json())
      .then((res) => {
        // refetch();
        showSubGroups();
      })
      .catch((err) => console.log(err));
    // reset();
    setNewGroupName('');
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
    <Overlay heading={'Edit Group'} open={open} handleClose={handleModalClose}>
      <Box
        sx={{
          backgroundColor: isDarkTheme ? '#4B4B4B' : '#fff',
        }}
      >
        <form
          className={styles.modalBody}
          id="editSubGroup"
          onSubmit={editHandler}
        >
          <Stack
            gap="10px"
            sx={{
              marginInline: '30px',
              padding: '20px 0px',
            }}
            className={styles.inputListWrapper}
          >
            <Typography>Group Name</Typography>
            <input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </Stack>
        </form>
      </Box>
      <ModalFooter
        addHandler={editHandler}
        cancelHandler={cancelHandler}
        addText="Save"
        id="editSubGroup"
      />
    </Overlay>
  );
}
