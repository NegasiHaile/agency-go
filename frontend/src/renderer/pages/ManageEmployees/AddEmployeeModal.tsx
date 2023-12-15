import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import Overlay from 'renderer/components/Settings/Wallet/Common/Modal';
import styles from 'renderer/components/Settings/Wallet/Common/Modal/styles.module.css';
import MultiSelectDropdown, {
  DropdownWithLabel,
  InputWithLabel,
  LabelText,
  ModalFooter,
} from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { Stack } from '@mui/system';
import { roleList,groupList, frequencyList, scheduleList } from './constant';
import fetchReq from 'utils/fetch';
import { useFormEmployee } from './hooks/useForm';

interface $Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  type: 'add' | 'edit';
  selectedEmployee?: any;
}

export default function AddEmployeeModal({
  open,
  setOpen,
  refetch,
  type,
  selectedEmployee,
}: $Props) {
  const {
    assignCreator,
    handleSubmit,
    register,
    isLoading,
    selectedValues,
    setSelectedValues,
    setValue,
  } = useFormEmployee(
    () => {
      setOpen(false);
      refetch();
    },
    type,
    selectedEmployee
  );
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
  const [creators, setcreators] = useState<
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
    handleSubmit();
  };

  const cancelHandler = () => {
    setOpen(false);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAgencie();
    getCreators();
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
  const getCreators = () => {
    const endpoint = 'creators';
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
        console.log(res);
        setcreators([]);
        res.data.map((item: any) => {
          let tempdata = {
            value: item._id,
            label: item.creatorName,
          };
          setcreators((previousdata) => [...previousdata, tempdata]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Overlay
      heading={type === 'add' ? 'Add Employee' : 'Edit Employee'}
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
          id="addEmployee"
          onSubmit={handleSubmit}
        >
          <Stack
            gap="10px"
            sx={{
              marginInline: '30px',
              paddingTop: '31px',
              paddingBottom: '50px',
            }}
            className={styles.inputListWrapper}
          >
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <InputWithLabel
                label="Employee name"
                inputIdentifierName="name"
                placeholder="Enter name"
                register={register as any}
              />
              <InputWithLabel
                label="Email"
                inputIdentifierName="email"
                placeholder="Enter email"
                register={register as any}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <DropdownWithLabel
                label="Group"
                inputIdentifierName="agencyId"
                options={agencies}
                register={register as any}
              />
              <DropdownWithLabel
                label="Role"
                inputIdentifierName="role"
                options={roleList}
                register={register as any}
              />
            </Box>

            <Box>
              <LabelText label={'Pay Rate'} />
              <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <InputWithLabel
                  label=""
                  inputIdentifierName="payRate"
                  placeholder="Enter Rate"
                  register={register as any}
                />
                <DropdownWithLabel
                  label=""
                  inputIdentifierName="payInterval"
                  options={frequencyList}
                  register={register as any}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '20px'}}>
             
              <Box sx={{width:'100%'}}>
                <InputWithLabel
                  label="Commission"
                  inputIdentifierName="commission"
                  placeholder="Commission"
                  register={register as any}
                />
                <LabelText label={'0.10%'} />
              </Box>
              <DropdownWithLabel
                label="Shift Schedule"
                inputIdentifierName="shiftSchedular"
                options={scheduleList}
                register={register as any}
              />
            </Box>

            <MultiSelectDropdown
              label="Assign Creator"
              inputIdentifierName="assignCreator"
              options={creators}
              selectedValues={selectedValues}
              setSelectedValues={(selected: any) => {
                setValue('assignCreator', selected);
                setSelectedValues(selected);
              }}
            />
          </Stack>
        </form>
      </Box>
      <ModalFooter
        addHandler={addHandler}
        cancelHandler={cancelHandler}
        addText={type === 'add' ? 'Add Employee' : 'Edit Employee'}
        isLoading={isLoading}
        id="addEmployee"
      />
    </Overlay>
  );
}
