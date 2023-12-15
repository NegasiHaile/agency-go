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
import fetchReq from 'utils/fetch';

interface $props {
  open: boolean;
  type: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}
const time = [
  {
    label: 'select a time',
    value: '',
  },
  {
    label: '1:00 AM',
    value: '1',
  },
  {
    label: '2:00 AM',
    value: '2',
  },
  {
    label: '3:00 AM',
    value: '3',
  },
  {
    label: '4:00 AM',
    value: '4',
  },
  {
    label: '5:00 AM',
    value: '5',
  },
  {
    label: '6:00 AM',
    value: '6',
  },
  {
    label: '7:00 AM',
    value: '7',
  },
  {
    label: '8:00 AM',
    value: '8',
  },
  {
    label: '9:00 AM',
    value: '9',
  },
  {
    label: '10:00 AM',
    value: '10',
  },
  {
    label: '11:00 AM',
    value: '11',
  },
  {
    label: '12:00 AM',
    value: '12',
  },
  {
    label: '1:00 PM',
    value: '13',
  },
  {
    label: '2:00 PM',
    value: '14',
  },
  {
    label: '3:00 PM',
    value: '15',
  },
  {
    label: '4:00 PM',
    value: '16',
  },
  {
    label: '5:00 PM',
    value: '17',
  },
  {
    value: '18',
    label: '6:00 PM',
  },
  {
    value: '19',
    label: '7:00 PM',
  },
  {
    value: '20',
    label: '8:00 PM',
  },
  {
    value: '21',
    label: '9:00 PM',
  },
  {
    value: '22',
    label: '10:00 PM',
  },
  {
    value: '23',
    label: '11:00 PM',
  },
  {
    value: '24',
    label: '12:00 PM',
  },
];
const dayListing = [
  {
    day: 'Sun',
    value: 'sunday',
  },
  {
    day: 'Mon',
    value: 'monday',
  },
  {
    day: 'Tue',
    value: 'tuesday',
  },
  {
    day: 'Wed',
    value: 'wednesday',
  },
  {
    day: 'Thu',
    value: 'thursday',
  },
  {
    day: 'Fri',
    value: 'friday',
  },
  {
    day: 'Sat',
    value: 'saturday',
  },
];
interface $dropdownlist {
  value: string;
  label: string;
}
interface $shiftData {
  employeeId?: string;
  creatorId?: string;
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  repeat: {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednessday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
  };
}

const AddShifts = ({ open, type, setOpen, refetch }: $props) => {
  const [employees, setEmployees] = useState<$dropdownlist[]>([]);
  const [creators, setCreators] = useState<$dropdownlist[]>([]);
  const [shiftData, setShiftData] = useState<$shiftData>({
    repeat: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednessday: false, // Note the typo here, it should be "wednesday"
      thursday: false,
      friday: false,
      saturday: false,
    },
    // Other properties here
  });
  const [today, setToday] = useState('');
  useEffect(() => {
    getCreators();
    getAllEmployees();
    let now = new Date();
    setToday(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
  }, []);
  const getCreators = () => {
    const endPoint = 'creators';
    const options = {
      method: 'GET' as 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endPoint, options)
      .then((responce) => responce.json())
      .then((res: any) => {
        setCreators([]);
        res.data.map((item: any) => {
          setCreators((previous: any) => [
            ...previous,
            { label: item.creatorName, value: item._id },
          ]);
        });
      })
      .catch((error) => console.log(error));
  };
  const getAllEmployees = () => {
    const endPoint = 'shifts/employees';
    const options = {
      method: 'GET' as 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endPoint, options)
      .then((responce) => responce.json())
      .then((res) => {
        setEmployees([]);
        res.data.map((item: any) => {
          setEmployees((previous: any) => [
            ...previous,
            { label: item.name, value: item._id },
          ]);
        });
      })
      .catch((err) => console.log(err));
  };

  const addHandler = () => {
    if (
      shiftData.creatorId &&
      shiftData.employeeId &&
      shiftData.endDate &&
      shiftData.startDate &&
      shiftData.startTime &&
      shiftData.endTime
    ) {
      const endPoint = 'shifts';
      const options = {
        method: 'POST' as 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withAuth: true,
        body: JSON.stringify(shiftData),
      };
      fetchReq(endPoint, options)
        .then((responce) => responce.json())
        .then((res) => {
          setShiftData({
            employeeId: '',
            creatorId: '',
            startTime: '',
            endTime: '',
            startDate: '',
            endDate: '',
            repeat: {
              sunday: false,
              monday: false,
              tuesday: false,
              wednessday: false,
              thursday: false,
              friday: false,
              saturday: false,
            },
          });
          refetch();
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const cancelHandler = () => {
    setShiftData({
      employeeId: '',
      creatorId: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      repeat: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednessday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
    });
    setOpen(false);
  };
  const handleModalClose = () => {
    setShiftData({
      employeeId: '',
      creatorId: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      repeat: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednessday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
    });
    setOpen(false);
  };
  const handleChange = (name: string, value: string) => {
    setShiftData((previous: any) => ({ ...previous, [name]: value }));
  };
  const makeSelection = (name: string, value: any) => {
    setShiftData((prevShiftData: any) => ({
      ...prevShiftData,
      repeat: {
        ...prevShiftData.repeat,
        [name]: !prevShiftData.repeat[name],
      },
    }));
  };


  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';


  return (
    <Overlay
      heading={type === 'add' ? 'Add Employee' : 'Edit Employee'}
      open={open}
      handleClose={handleModalClose}
    >
      <Box bgcolor={isDarkTheme ? '#292929' : '#fff'}>
        <form
          className={styles.modalBody}
          id="addEmployee"
          onSubmit={addHandler}
        >
          <Stack>
            <div>
              <div
                style={{
                  display: 'flex',
                  marginBottom: '5px',
                  marginLeft: '10px',
                }}
              >
                <DropdownWithLabel
                  label="Start Time"
                  inputIdentifierName="startTime"
                  options={time}
                  value={shiftData?.startTime}
                  handleOnChange={handleChange}
                />

                <div>
                  <label
                    htmlFor=""
                    style={{
                      marginTop: '3px',
                      marginLeft: '7px',
                    }}
                  >
                    Select start date
                  </label>
                  <div
                    style={{
                      marginTop: '3px',
                      marginLeft: '11px',
                      marginRight: '10px',
                    }}
                  >
                    <input
                      type="date"
                      value={shiftData?.startDate}
                      onChange={(e) => {
                        handleChange('startDate', e.target.value);
                      }}
                      min={today}
                      style={{
                        backgroundColor: isDarkTheme ? '#000' : '#EAF1FF',
                        color: isDarkTheme ? '#fff' : '#000',
                        marginLeft: '5px',
                        height: '45px',
                        paddingLeft: '5px',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  marginBottom: '5px',
                  marginLeft: '10px',
                }}
              >
                <DropdownWithLabel
                  label="End Time"
                  inputIdentifierName="endTime"
                  options={time}
                  handleOnChange={handleChange}
                  value={shiftData?.endTime}
                />
                <div>
                  <label
                    htmlFor=""
                    style={{
                      marginTop: '3px',
                      marginLeft: '11px',
                    }}
                  >
                    Select end date
                  </label>
                  <div
                    style={{
                      marginTop: '3px',
                      marginLeft: '7px',
                      marginRight: '10px',
                    }}
                  >
                    <input
                      type="date"
                      onChange={(e) => {
                        handleChange('endDate', e.target.value);
                      }}
                      min={shiftData.startDate}
                      value={shiftData?.endDate}
                      style={{
                        backgroundColor: isDarkTheme ? '#000' : '#EAF1FF',
                        color: isDarkTheme ? '#fff' : '#000',
                        marginLeft: '5px',
                        height: '45px',
                        paddingLeft: '5px',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: '5px',
                width: '96%',
                marginLeft: '10px',
              }}
            >
              <DropdownWithLabel
                label="employees"
                inputIdentifierName="employeeId"
                options={employees}
                handleOnChange={handleChange}
                value={shiftData?.employeeId}
              />
            </div>

            <div
              style={{
                display: 'flex',
                marginBottom: '5px',
                width: '96%',
                marginLeft: '10px',
              }}
            >
              <DropdownWithLabel
                label="creators"
                inputIdentifierName="creatorId"
                options={creators}
                handleOnChange={handleChange}
                value={shiftData?.creatorId}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px',
              }}
            >
              {dayListing.map((item: { day: string; value: string }) => (
                <div>
                  <input
                    type="checkbox"
                    name="daySelection"
                    onChange={(e) => makeSelection(item.value, e.target.value)}
                  />
                  <label htmlFor="">{item.day}</label>
                </div>
              ))}
            </div>
          </Stack>
        </form>
      </Box>
      <ModalFooter addHandler={addHandler} cancelHandler={cancelHandler} />
    </Overlay>
  );
};

export default AddShifts;
