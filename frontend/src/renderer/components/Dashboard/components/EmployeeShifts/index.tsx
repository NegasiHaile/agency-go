import React, { useEffect, useState } from 'react';
import LeftChevronSquareSvg from 'renderer/assets/svg/leftChevronSquareSvg';
import RightChevronSquareSvg from 'renderer/assets/svg/rightChevronSquareSvg';
import AvatarSvg from 'renderer/assets/svg/AvatarSvg';
import classes from './styles.module.css';
import fetchReq from 'utils/fetch';
import { useTheme } from '@mui/material';


interface DateBoxProps {
  date: string;
}

interface TimeBoxItemProps {
  time: string;
  key: number;
}

interface ScheduleProps {
  name: string;
  slots: any[];
}
interface AvatarProps {
  name: string;
}
const dates = [
  'SUN-21',
  'MON-22',
  'TUE-23',
  'WED-24',
  'THU-25',
  'FRI-26',
  'SAT-27',
];

const times = [
  '18:00 PM - 19:00 PM',
  '',
  '11:00 AM - 12:00 PM',
  '18:00 PM - 19:00 PM',
  '18:00 PM - 19:00 PM',
  '13:00 PM - 14:00 PM',
  '15:00 PM - 16:00 PM',
];

const timeSlotsOfUsers = [
  {
    avatar: <AvatarSvg />,
    name: 'Sharad',
    slots: times,
  },
  {
    avatar: <AvatarSvg />,
    name: 'Mitchelle',
    slots: times,
  },
  {
    avatar: <AvatarSvg />,
    name: 'Dickson',
    slots: times,
  },
  {
    avatar: <AvatarSvg />,
    name: 'Tisha',
    slots: times,
  },
];
interface $shiftChart {
  employees: any[];
}
interface $listDay {
  day: string;
  date: number;
}
function AvatarWithName(props: AvatarProps) {
  const { name } = props;
  return (
    <div className={classes.avatarItem}>
      <AvatarSvg />
      <div className={classes.avatarText}>{name}</div>
    </div>
  );
}

function DateBox(props: any) {
  const { date } = props;

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';


  return (
    <div className={classes.dateBoxItem} 
    
    style={{ width: '120px' ,borderBottom: '2px solid', justifyContent:'center',display:'flex' }}>
      {date.day} <br /> {date.date}
    </div>
  );
}

function TimeBoxItem(props: any) {
  const { time, shift } = props;
  const [isTrue, setIsTrue] = useState(false);
  const [thisData, setThisData] = useState<any>({});
  useEffect(() => {
    shift.map((data: any) => {
      let start = new Date(data.startDate);
      let startDate = `${start.getFullYear()}-${start.getMonth() + 1}-${
        start.getDate() - 1
      }`;

      if (
        new Date(time.date) >= new Date(startDate) &&
        new Date(time.date) <= new Date(data.endDate)
      ) {
        if (data.repeat[time.day]) {
          setIsTrue(true);
          setThisData(data);
        }
      }
    });
  }, [shift]);

  return (
    <>
      {isTrue ? (
        <>
          <div
            className={classes.timeBoxItem}
            style={{ width: '120px' }}
          >
            {thisData.employee[0].name} <br />
            {thisData.startTime}:00 - {thisData.endTime}:00
          </div>
        </>
      ) : (
        <>
          {' '}
          <div
            className={classes.deactiveItemBox}
            style={{ width: '120px' }}
          >
            no-shifts
          </div>
        </>
      )}
    </>
  );
}

function Timeslots(props: any) {
  const { name, slots, days } = props;
  return (
    <div className={classes.timeBoxParentWrapper}>
      <div>
        <AvatarWithName name={name} />
      </div>

      <div
        className={classes.timeBoxItemsOuterWrapper}
        style={{ marginLeft: '60px' }}
      >
        {days.map((slot: any, index: number) => (
          <TimeBoxItem time={slot} shift={slots} key={index} />
        ))}
      </div>
    </div>
  );
}
function EmployeeShiftsBox({ employees }: $shiftChart) {
  const [daylist, setDaylist] = useState<any>([]);
  const createDayList = () => {
    let days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    let logdata = [];
    let now = new Date();
    let newDate = new Date();
    newDate.setDate(now.getDate() - now.getDay());
    setDaylist([]);
    for (let i = 0; i < 7; i++) {
      newDate.setDate(now.getDate() - now.getDay() + i);
      logdata.push({
        day: days[newDate.getDay()],
        date: ` ${newDate.getFullYear()}-${
          newDate.getMonth() + 1
        }-${newDate.getDate()}`,
      });
    }
    setDaylist(logdata);
  };
  useEffect(() => {
    createDayList();
  }, [employees]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper} style={{ marginLeft: '60px' }}>
        <div className={classes.leftSideWrapper}>
          <LeftChevronSquareSvg />
        </div>
        <div className={classes.dateBoxItemsWrapper}>
          {daylist.map((date: any, index: any) => (
            <DateBox date={date} key={index} />
          ))}
        </div>
        <div>
          <RightChevronSquareSvg />
        </div>
      </div>
      <div className={classes.slotWrapper}>
        {employees?.map(({ name, shifts }, index) => (
          <Timeslots name={name} slots={shifts} days={daylist} key={index} />
          // <>{name}</>
        ))}
      </div>
    </div>
  );
}

export default EmployeeShiftsBox;
