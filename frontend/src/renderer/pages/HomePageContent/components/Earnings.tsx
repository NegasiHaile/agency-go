import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import ArchiveAddSvg from 'renderer/assets/svg/ArchiveAddSvg';
import OnlyFansCircleBlue from 'renderer/assets/svg/OnlyFansCircleBlueSvg';
import theme from 'renderer/styles/muiTheme';
import WalletAddSvg from 'renderer/assets/svg/WalletAddSvg';
import UserAdd from 'renderer/assets/svg/UserAddSvg';
import SubtitleSvg from 'renderer/assets/svg/SubtitleSvg';
import EarningsCard from 'renderer/components/EarningsCard';
import styles from './styles.module.css';
import ButtonGroup from 'renderer/components/ButtonGroup';
import { useState } from 'react';
import SubscriptionSvg from 'renderer/assets/svg/NewMessageSvg';
import NewMessageSvg from 'renderer/assets/svg/NewMessageSvg';
import ChatSvg from 'renderer/assets/svg/ChatSvg';
import WalletSvg from 'renderer/assets/svg/WalletSvg';
import PersonSvg from 'renderer/assets/svg/Person';
import StreamSvg from 'renderer/assets/svg/Stream';

const earningsInitJson = [
  {
    title: 'Subscriptions ($)',
    amount: '44.44',
    icon: <SubscriptionSvg />,
  },
  {
    title: 'Post ($)',
    amount: '0.00',
    icon: <ChatSvg />,
  },
  {
    title: 'Messages ($)',
    amount: '432.00',
    icon: <NewMessageSvg />,
  },
  {
    title: 'Tips ($)',
    amount: '6.00',
    icon: <WalletSvg />,
  },
  {
    title: 'Referrals ($)',
    amount: '0.00',
    icon: <PersonSvg />,
  },
  {
    title: 'Streams ($)',
    amount: '0.00',
    icon: <StreamSvg />,
  },
];

const timeButton = [
  { id: 1, title: 'Yesterday' },
  { id: 2, title: 'Today' },
  { id: 3, title: 'This Week' },
  { id: 4, title: 'Today' },
  { id: 5, title: 'This Month' },
];

export default function Earnings() {
  const [activeButton, setActiveButton] = useState(1);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

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
        <Stack
          spacing={5}
          borderRadius="16px"
          sx={{
            padding: '32px',
            border: `1px solid ${theme.palette.primary.contrastText}`,
            minWidth: '250px',
          }}
        >
          <OnlyFansCircleBlue />
          <Divider
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          />
          <Stack flexDirection="row" alignItems="center">
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
          <Typography variant="h3" fontWeight="700" fontSize={'36px'}>
            $473.44
          </Typography>
        </Stack>
        <Box width="100%" className={styles.earningsContainer}>
          {earningsInitJson.map((item) => (
            <EarningsCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              amount={item.amount}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
