import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, useTheme, Alert } from '@mui/material';
import Overlay from 'renderer/components/Settings/Wallet/Common/Modal';
import styles from 'renderer/components/Settings/Wallet/Common/Modal/styles.module.css';
import MultiSelectDropdown, {
  DropdownWithLabel,
  InputWithLabel,
  LabelText,
  ModalFooter,
} from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { Stack } from '@mui/system';
import { roleList, groupList, frequencyList, scheduleList } from './constant';
import fetchReq from 'utils/fetch';
import { useFormEmployee } from './hooks/useForm';
import { AuthContext } from 'renderer/contexts/AuthContext';

interface $Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  type: 'add' | 'edit';
  selectedEmployee?: any;
  selectedAgency?: any;
}

export default function AddEmployeeModal({
  open,
  setOpen,
  refetch,
  type,
  selectedEmployee,
  selectedAgency,
}: $Props) {
  const {
    assignCreator,
    handleSubmit,
    register,
    isLoading,
    selectedValues,
    setSelectedValues,
    setValue,
    setAgencyId,
    registrationError,
    setRegistrationError
  } = useFormEmployee(
    () => {
      setOpen(false);
      refetch();
    },
    type,
    selectedEmployee
  );
  const { userData } = useContext(AuthContext);
  const [agencyGroups, setAgencyGroups] = useState<
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
  const [creators, setCreators] = useState<
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
   
    handleSubmit(selectedAgency);
  };
  const cancelHandler = () => {
    setOpen(false);
    setSelectedValues([]);
    setValue('name', '');
    setValue('email', '');
    setValue('role', '');
    setValue('groupId','')
    setValue('payRate', 0);
    setValue('payInterval', '');
    setValue('commission', 0);
    setValue('shiftSchedular', '');
    setValue('assignCreator', []);
  };

  const handleModalClose = () => {
    cancelHandler();
    setRegistrationError(false);
    setOpen(false);
  };
  useEffect(() => {
    setAgencyId(selectedAgency.id)
    getAgencyGroups();
    getCreators();
    // 
  }, [selectedAgency]);
 
  // const getAgencie = () => {
  //   const endpoint = 'agency';
  //   let options = {
  //     method: 'GET' as 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     withAuth: true,
  //   };
  //   fetchReq(endpoint, options)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       setAgencyGroups([]);
  //       res.data.map((item: any) => {
  //         let tempData = {
  //           value: item._id,
  //           label: item.agencyName,
  //         };
  //         setAgencyGroups((previousData) => [...previousData, tempData]);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  const getAgencyGroups = () => {
    let endpoint = 'agency/showgroup/' + selectedAgency?.id;
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
        if (res) {
          setAgencyGroups([]);
          res.data.map((item: any) => {
            let tempData = {
              value: item._id,
              label: item.name,
            };
            setAgencyGroups((previousData) => [...previousData, tempData]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCreators = () => {
    const endpoint = `creators/${userData?.agency?._id}`;
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
        setCreators([]);
        res.data?.creators?.map((item: any) => {
          let tempdata = {
            value: item._id,
            label: item.creatorName,
          };
          setCreators((previousdata) => [...previousdata, tempdata]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

const handleAlert = () => {
  setRegistrationError(false);
}

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
      <Box padding={'10px 30px 0px 30px'} height={'8'}>
        
        
        {
         !!registrationError? 
        <Alert severity='error' onClose={handleAlert} >{registrationError??''} </Alert>
        :''
        }
      </Box>
        <form
          className={styles.modalBody}
          id="addEmployee"
          onSubmit={() => {
            setValue('agencyId', '00')
            handleSubmit()
          }
          }
        >
          <Stack
            gap="10px"
            sx={{
              marginInline: '30px',
              paddingTop: '10px',
              paddingBottom: '50px',
            }}
            className={styles.inputListWrapper}
          >
            <input value={selectedAgency._id} type="text" hidden />
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
                inputIdentifierName="groupId"
                options={agencyGroups}
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
              <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <InputWithLabel
                  label="$ Pay Rate"
                  inputIdentifierName="payRate"
                  placeholder="$ Enter Rate"
                  register={register as any}
                />
                <DropdownWithLabel
                  label="Pay Rate Frequency"
                  inputIdentifierName="payInterval"
                  options={frequencyList}
                  register={register as any}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box sx={{ width: '100%' }}>
                <InputWithLabel
                  label="Commission"
                  inputIdentifierName="commission"
                  placeholder="Commission"
                  register={register as any}
                />
                <LabelText label={'0.10%'} />
              </Box>
            </Box>

            <MultiSelectDropdown
              label="Assign Creator"
              inputIdentifierName="assignCreator"
              options={creators}
              selectedValues={selectedValues}
              setSelectedValues={(selected: any) => {
                if (selected.includes('')) {
                  selected = [];
                  setSelectedValues(() => [])
                }
                else { 
                  setSelectedValues(selected);
                }
                setValue('assignCreator', selected);
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
