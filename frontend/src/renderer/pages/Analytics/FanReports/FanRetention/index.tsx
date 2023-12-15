import { ErrorOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import ArchiveAddSvg from 'renderer/assets/svg/ArchiveAddSvg';
import theme from 'renderer/styles/muiTheme';
import StatisticsCard from './StatisticsCard';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

const tabledata = [
  {
    id: 1,
    employee: 'Chrissy',
    group: 'D-Life Style',
    sales: '49.0%',
    messagesSent: '49.0%',
    PPVsSent: '49.0%',
    PPVsUnlocked: '49.0%',
    goldenRatio: '49.0%',
    unlockRatio: '49.0%',
    fansChatted: '49.0%',
    words: '49.0%',
    replyTime: '49.0%',
    scheduledHours: '49.0%',
  },
  {
    id: 1,
    employee: 'James',
    group: 'Spice Life',
    sales: '49.0%',
    messagesSent: '49.0%',
    PPVsSent: '49.0%',
    PPVsUnlocked: '49.0%',
    goldenRatio: '49.0%',
    unlockRatio: '49.0%',
    fansChatted: '49.0%',
    words: '49.0%',
    replyTime: '49.0%',
    scheduledHours: '49.0%',
  },
];

const statisticsSampleData = [
  {
    title: 'Total Chatter Sales',
    amount: '$12.00',
    icon: <ArchiveAddSvg />,
  },
  {
    title: 'Unlock Rate',
    amount: '12.8%',
    icon: <ArchiveAddSvg />,
  },
  {
    title: 'Average Reply Time',
    amount: '-',
    icon: <ArchiveAddSvg />,
  },
  {
    title: 'Scheduled Hours',
    amount: '-',
    icon: <ArchiveAddSvg />,
  },
];

const FanRetenrion = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        backgroundColor: isDarkTheme ? '#000' : '#fff',
        
        padding: '20px',
        gap: '20px',
        borderRadius:'16px'
      }}
    >
      <Box display="flex" justifyContent={'space-between'}>
        <Box display="flex">
          <Typography
            color={isDarkTheme ? '#fff' : '#000'}
            fontFamily="Arimo"
            fontSize="20px"
            fontWeight="600"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            Fan Retention
            <ErrorOutline
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: '16px',
              }}
            />
          </Typography>
        </Box>
      </Box>

      <TableContainer
        sx={{
          border: `1px solid ${theme.palette.primary.contrastText}`,
          borderRadius: '16px',
          marginTop: '32px',
        }}
      >
        <Table aria-label="simple table">
          <TableHead
            sx={{
              background: isDarkTheme ? '#ffffff33' : '#EAF1FF',
            }}
          >
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell align="right">NewFans</TableCell>
              <TableCell align="right">After 1</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">3</TableCell>
              <TableCell align="right">4</TableCell>
              <TableCell align="right">5</TableCell>
              <TableCell align="right">6</TableCell>
              <TableCell align="right">7</TableCell>
              <TableCell align="right">8</TableCell>
              <TableCell align="right">9</TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">11</TableCell>
              <TableCell align="right">Day12</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: 14, padding: '20px 10px' }}
                >
                  {row.employee}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ fontSize: 12 }}>
                  {row.group}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.sales}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.messagesSent}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.PPVsSent}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.PPVsUnlocked}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{  fontSize: 12 }}
                >
                  {row.goldenRatio}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{  fontSize: 12 }}
                >
                  {row.unlockRatio}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.fansChatted}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.words}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.replyTime}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.scheduledHours}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.PPVsSent}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>
                  {row.PPVsSent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FanRetenrion;
