import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import Avatar from 'renderer/assets/svg/AvatarSvg';
import Activated from 'renderer/assets/svg/ActivatedSvg';
import DeactivatedSvg from 'renderer/assets/svg/DeactivatedSvg';
import OnlyFansSvg from 'renderer/assets/svg/OnlyFansSvg';
import styles from './styles.module.css';

const rows = [
  {
    name: 'Joan Adams',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: true,
  },
  {
    name: 'Chris Jean-Baptiste',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: true,
  },
  {
    name: 'Joan Adams',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: false,
  },
  {
    name: 'Joan Adams',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: true,
  },
  {
    name: 'Chris Jean-Baptiste',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: true,
  },
  {
    name: 'Joan Adams',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: false,
  },
  {
    name: 'Joan Adams',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: true,
  },
  {
    name: 'Chris Jean-Baptiste',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: true,
  },
];

export default function ShiftTable() {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  // Determine the class based on the theme
  const mode = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return (
    <Box
      className={mode}
      padding="16px"
      sx={{ backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff' }}
      borderRadius="16px"
    >
      <Box marginBottom="10px">
        <Typography fontSize={'22px'}>My Shifts</Typography>
      </Box>
      <Grid spacing={2} container>
        {rows.map((d, i) => {
          return (
            <Grid md={4} key={i} item>
              <Box
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  border: 'solid 1px',
                  borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
                }}
              >
                <div
                  style={{
                    // background: '#292929',
                    background: isDarkTheme? '#181818' : "#EAF1FF",
                    overflow: 'auto',
                    padding: '14px',
                    borderRadius: 'inherit',
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  <Grid
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    container
                  >
                    <Grid item>
                      <Typography fontSize={16}>{d.name}</Typography>
                      <Typography fontSize={14} color={'green'}>
                        Online
                      </Typography>
                      <Typography fontSize={14} color={'green'}>
                        GMT +1
                      </Typography>
                    </Grid>
                    <Grid textAlign={'right'} item>
                      <Avatar width={50} height={50} />
                    </Grid>
                  </Grid>
                </div>
                <div
                  style={{
                    padding: '14px',
                  }}
                >
                  <Grid
                    justifyContent={'center'}
                    alignContent={'center'}
                    alignItems={'center'}
                    container
                    className={styles.myShiftsDetails}
                  >
                    <Grid xs={4} item>
                      <Typography fontSize={14}>Group</Typography>
                      <Typography fontSize={14}>D Life Agency</Typography>
                    </Grid>
                    <Grid xs={3} item>
                      <Typography fontSize={14}>Hours</Typography>
                      <Typography fontSize={14}>5</Typography>
                    </Grid>
                    <Grid xs={5} item>
                      <Typography fontSize={14}>Schedule</Typography>
                      <Typography fontSize={14}>9:00 AM - 10:00 PM</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
