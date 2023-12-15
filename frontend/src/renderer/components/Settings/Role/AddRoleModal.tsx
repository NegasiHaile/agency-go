import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import Overlay from 'renderer/components/Settings/Wallet/Common/Modal';
import styles from 'renderer/components/Settings/Wallet/Common/Modal/styles.module.css';
import {
  DropdownWithLabel,
  InputWithLabel,
  ModalFooter,
} from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { Stack } from '@mui/system';
interface $roleData {
  id?: string;
  rolename?: string;
  description?: string;
}
interface $props {
  type: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnSubmit?: (data: any, type: string) => void;
  value: $roleData | null;
}

const AddRoleModal = ({
  type,
  open,
  setOpen,
  handleOnSubmit = () => {},
  value,
}: $props) => {
  const [roleData, setRoleData] = useState<$roleData | null>(null);
  const handleModalClose = () => {
    setOpen(false);
  };
  const handleOnChange = (name: string, value: string) => {
    setRoleData({ ...roleData, [name]: value });
  };
  const handleSubmit = () => {
    if (roleData?.rolename && roleData?.description) {
      if (type === 'edit') roleData.id = value?.id;
      handleOnSubmit(roleData, type);
      setOpen(false);
    }
  };
  useEffect(() => {
    setRoleData({
      rolename: value?.rolename || '',
      description: value?.description || '',
    });
  }, [value]);

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Overlay
      heading={type === 'add' ? 'Add Employee' : 'Edit Employee'}
      open={open}
      handleClose={handleModalClose}
    >
      <Box
        className={styles.modal}
        sx={{
         
          backgroundColor: isDarkTheme ? '#292929' : '#fff',
        }}
      >
        <form
          className={styles.modalBody}
          id="addEmployee"
          onSubmit={handleSubmit}
        >
          <Stack
            gap="10px"
            sx={{
              marginInline: '30px',
              paddingTop: '30px',
              paddingBottom: '50px',
              backgroundColor: isDarkTheme ? '#292929' : '#fff',
            }}
            className={styles.inputListWrapper}
          >
            <InputWithLabel
              label="Role name"
              inputIdentifierName="rolename"
              placeholder="Enter Role name"
              value={roleData?.rolename}
              handleOnChange={handleOnChange}
            />
            <InputWithLabel
              label="Role description"
              inputIdentifierName="description"
              placeholder="Enter Role description"
              value={roleData?.description}
              handleOnChange={handleOnChange}
            />
          </Stack>
        </form>
      </Box>
      <ModalFooter
        addHandler={handleSubmit}
        cancelHandler={handleModalClose}
        addText="Add Role"
        id="addRole"
      />
    </Overlay>
  );
};
export default AddRoleModal;
