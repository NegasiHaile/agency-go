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
    sales: '$1350.00',
    messagesSent: '0',
    PPVsSent: '0',
    PPVsUnlocked: '0',
    goldenRatio: '450.00%',
    unlockRatio: '450.00%',
    fansChatted: '0',
    words: '1350',
    replyTime: '-',
    scheduledHours: '0 hours',
  },
  {
    id: 1,
    employee: 'James',
    group: 'Spice Life',
    sales: '$150.00',
    messagesSent: '13',
    PPVsSent: '1',
    PPVsUnlocked: '3',
    goldenRatio: '0.00%',
    unlockRatio: '0.00%',
    fansChatted: '3',
    words: '1350',
    replyTime: '-',
    scheduledHours: '2 hours',
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

const ChattingStatistics = () => {
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
            Chatting Statistics
            <ErrorOutline
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: '18px',
              }}
            />
          </Typography>

          <Checkbox defaultChecked sx={{ marginLeft: '10px' }} />
          <Typography
            color={isDarkTheme ? '#fff' : '#000'}
            fontSize="14px"
            display="flex"
            alignItems="center"
            gap="14px"
          >
            Show only employees with Chatter role
          </Typography>
        </Box>

        <Button
          variant="contained"
          endIcon={<SimCardDownloadOutlinedIcon />}
          sx={{
            height: '36px',
            color: '#fff',
            textTransform: 'capitalize',
          }}
        >
          Export
        </Button>
      </Box>

      <Box
        width="fit-content"
        display={'flex'}
        flexWrap={'wrap'}
        margin={'20px 0px'}
        gap={'20px'}
      >
        {statisticsSampleData.map((item) => (
          <StatisticsCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            amount={item.amount}
          />
        ))}
      </Box>
      <TableContainer
        sx={{
          border: `1px solid ${theme.palette.primary.contrastText}`,
          borderRadius: '16px',
        }}
      >
        <Table aria-label="simple table">
          <TableHead
            sx={{
              background: isDarkTheme ? '#ffffff33' : '#EAF1FF',
            }}
          >
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell align="right">Group</TableCell>
              <TableCell align="right">Sales</TableCell>
              <TableCell align="right">Messages Sent</TableCell>
              <TableCell align="right">PPVs Sent</TableCell>
              <TableCell align="right">PPVs Unlocked</TableCell>
              <TableCell align="right">Golden Ratio</TableCell>
              <TableCell align="right">Unlock Ratio</TableCell>
              <TableCell align="right">Fans Chatted</TableCell>
              <TableCell align="right">Words</TableCell>
              <TableCell align="right">Reply Time</TableCell>
              <TableCell align="right">Scheduled Hours</TableCell>
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
                  sx={{ color: '#37DE8F', fontSize: 12 }}
                >
                  {row.goldenRatio}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: '#37DE8F', fontSize: 12 }}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ChattingStatistics;
