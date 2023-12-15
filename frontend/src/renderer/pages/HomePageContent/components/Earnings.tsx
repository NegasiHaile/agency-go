import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Divider, Stack, Typography, useTheme, Grid } from '@mui/material';
import EarningsCard from 'renderer/components/EarningsCard';
import ButtonGroup from 'renderer/components/ButtonGroup';
import { ReactElement, useContext, useEffect, useState } from 'react';
import SubscriptionSvg from 'renderer/assets/svg/NewMessageSvg';
import NewMessageSvg from 'renderer/assets/svg/NewMessageSvg';
import ChatSvg from 'renderer/assets/svg/ChatSvg';
import WalletSvg from 'renderer/assets/svg/WalletSvg';
import PersonSvg from 'renderer/assets/svg/Person';
import StreamSvg from 'renderer/assets/svg/Stream';
import { TotalEarningsChart } from './Chart';
import useQuery from 'renderer/hooks/useQuery';
import { AuthContext } from 'renderer/contexts/AuthContext';

const initalEarnings = [
  {
    title: 'Subscriptions ($)',
    amount: 0,
    icon: <SubscriptionSvg />,
  },
  {
    title: 'Post ($)',
    amount: 0,
    icon: <ChatSvg />,
  },
  {
    title: 'Messages ($)',
    amount: 0,
    icon: <NewMessageSvg />,
  },
  {
    title: 'Tips ($)',
    amount: 0,
    icon: <WalletSvg />,
  },
  {
    title: 'Referrals ($)',
    amount: 0,
    icon: <PersonSvg />,
  },
  {
    title: 'Streams ($)',
    amount: 0,
    icon: <StreamSvg />,
  },
];

const timeButton = [
  { id: 'yesterday', title: 'Yesterday' },
  { id: 'today', title: 'Today' },
  { id: 'thisWeek', title: 'This Week' },
  { id: 'thisMonth', title: 'This Month' },
  { id: 'thisYear', title: 'This Year' }
];

export default function Earnings() {
  const { userData } = useContext(AuthContext);
  const [earningsData, setEarningsData] = useState<{
    title: string;
    amount: number;
    icon: ReactElement
  }[]>(initalEarnings);
  const [activeButton, setActiveButton] = useState('yesterday');
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const { data, isLoading } = useQuery({
    key: 'get-earnings',
    params: {
      agencyId: userData?.agency?._id,
    }
  });


  useEffect(() => {
    if (data && data.data && data.data[activeButton]) {
      setEarningsData([{
        title: 'Subscriptions ($)',
        amount: data.data[activeButton].subscriptions,
        icon: <SubscriptionSvg />,
      },
      {
        title: 'Post ($)',
        amount: data.data[activeButton].post,
        icon: <ChatSvg />,
      },
      {
        title: 'Messages ($)',
        amount: data.data[activeButton].messages,
        icon: <NewMessageSvg />,
      },
      {
        title: 'Tips ($)',
        amount: data.data[activeButton].tips,
        icon: <WalletSvg />,
      },
      {
        title: 'Referrals ($)',
        amount: data.data[activeButton].referrals,
        icon: <PersonSvg />,
      },
      {
        title: 'Streams ($)',
        amount: data.data[activeButton].streams,
        icon: <StreamSvg />,
      },]);
      setTotalEarnings(data.data[activeButton].total);
      setChartData(data.data[activeButton].chart);
    }
  }, [data, activeButton]);

  return (
    <Box
      padding="16px"
      sx={{
        borderRadius: '16px',
        backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
      }}
    >
      <Box marginBottom="10px" display="flex" justifyContent="space-between">
        <Typography fontWeight="600" fontSize="22px">
          Creators Earnings Overview
        </Typography>
        <ButtonGroup
          tabButton={timeButton}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      </Box>
      <Stack flexDirection="row" gap="20px">
        <Box
          padding={3}
          borderRadius={2}
          flex={3}
        >
          <Grid container spacing={1}>
            {earningsData.map((item) => (
              <Grid item md={4}>
                <EarningsCard
                  key={item.title}
                  title={item.title}
                  amount={item.amount.toString()}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          borderRadius="16px"
          // flex={2}
          sx={{
            padding: '18px',
            // minWidth: '250px',
            maxHeight: '260px',
            background: isDarkTheme? '#181818' : "#EAF1FF",
          }}
        >
          <Box
            sx={{
              marginBottom: 3,
            }}
          >
            <Stack flexDirection="row" alignItems="center" marginBottom={2}>
              <Typography>Total Earnings</Typography>
              <KeyboardArrowUp
                sx={{
                  color: theme.palette.primary.light,
                  marginLeft: '30px',
                  fontSize: '14px',
                }}
              />
              <Typography color={theme.palette.info.main} fontSize="14px">
                12.7%
              </Typography>
            </Stack>
            <Typography variant="h3" fontWeight="700" fontSize={'24px'}>
              ${totalEarnings.toFixed(2)}
            </Typography>
          </Box>
          <TotalEarningsChart data={chartData}/>
        </Box>
      </Stack>
    </Box>
  );
}
