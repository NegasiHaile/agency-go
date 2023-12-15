import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Overlay from 'renderer/components/Settings/Wallet/Common/Modal';
import styles from 'renderer/components/Settings/Wallet/Common/Modal/styles.module.css';
import {
  // DropdownWithLabel,
  DropdownWithTreeLabel,
  // InputWithLabel,
  ModalFooter,
} from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { Stack } from '@mui/system';
import fetchReq from 'utils/fetch';
import { useFormAgencyGroup } from '../hooks/useForm';
import GroupTreeData from './GroupTreeData';

interface $Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAgency: any;
  subGroups: any;
  selectedGroup?: string;
  setSelectedGroup?: any;
  groupName?: string;
  setGroupName?: any;
  selectedGroupId?: string;
  setSelectedGroupId?: any;
  showSubGroups?: any;
  setSubGroups?: any;
}

export default function AddSubGroupModal({
  open,
  setOpen,
  selectedAgency,
  subGroups,
  selectedGroup,
  setSelectedGroup,
  groupName,
  setGroupName,
  selectedGroupId,
  setSelectedGroupId,
  showSubGroups,
  setSubGroups,
}: $Props) {
  const { reset } = useFormAgencyGroup();
  const [agencies, setagencies] = useState<
    {
      label: string;
      value: string;
    }[]
  >([
    {
      label: '',
      value: '',
    },
  ]);

  const addHandler = () => {
    const payload = {
      name: groupName,
      agencyId: selectedGroupId,
    };
    const endPoint = 'agency/addgroup/' + selectedAgency?.id;
    const options = {
      method: 'POST' as 'POST',
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
    reset();
    setSelectedGroup('');
    setGroupName('');
    setOpen(false);
  };

  const cancelHandler = () => {
    setOpen(false);
    reset();
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAgencie();
  }, []);

  const getAgencie = () => {
    const endpoint = 'agency';
    let options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        setagencies([]);
        console.log(res);
        res.data.map((item: any) => {
          let tempdata = {
            value: item._id,
            label: item.agencyName,
          };
          setagencies((previousdata) => [...previousdata, tempdata]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  useEffect(() => {
    const data = agencies.filter((val) => val.value == selectedAgency?.id);
    setagencies(data);
  }, [selectedAgency]);
  return (
    <Overlay heading={'Add Group'} open={open} handleClose={handleModalClose}>
      <Box
        sx={{
          backgroundColor: isDarkTheme ? '#4B4B4B' : '#fff',
        }}
      >
        <form
          className={styles.modalBody}
          id="addSubGroup"
          onSubmit={addHandler}
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
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={{
                borderRadius: '3px',
                border: '1px solid #aaa',
                padding: '12px',
                width: '100%',
                marginTop: '2px',
                boxSizing: 'border-box',
                backgroundColor: isDarkTheme ? '#000' : '#EAF1FF',
                color: isDarkTheme ? '#fff' : '#000',
              }}
            />
            {/* <InputWithLabel 
              label="Group name"
              inputIdentifierName="name"
              placeholder="Enter group name"
              // register={register as any}
              value={groupName && groupName}
              // handleOnChange={(e:any)=>console.log("",e)}
              handleOnChange={(e:any)=>setGroupName({["name"]: JSON.stringify(e)})}
            /> */}
            <DropdownWithTreeLabel
              label="Parent Group"
              inputIdentifierName="agencyId"
              options={
                <GroupTreeData
                  groupData={subGroups}
                  setSelectedGroup={setSelectedGroup}
                  setSelectedGroupId={setSelectedGroupId}
                  showSubGroups={showSubGroups}
                  setSubGroups={setSubGroups}
                />
              }
              value={selectedGroup}
              // register={register as any}
            />
          </Stack>
        </form>
      </Box>
      <ModalFooter
        addHandler={addHandler}
        cancelHandler={cancelHandler}
        addText="Save"
        id="addSubGroup"
      />
    </Overlay>
  );
}
