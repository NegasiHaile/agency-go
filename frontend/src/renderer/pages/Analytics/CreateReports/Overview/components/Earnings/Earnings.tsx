import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import ArchiveAddSvg from 'renderer/assets/svg/ArchiveAddSvg';
import OnlyFansCircleBlue from 'renderer/assets/svg/OnlyFansCircleBlueSvg';
import theme from 'renderer/styles/muiTheme';
import WalletAddSvg from 'renderer/assets/svg/WalletAddSvg';
import UserAdd from 'renderer/assets/svg/UserAddSvg';
import SubtitleSvg from 'renderer/assets/svg/SubtitleSvg';
import styles from '../../styles.module.css';
import EarningsRecordCard from './EarningCard';
import NewMessageSvg from 'renderer/assets/svg/NewMessageSvg';
import SubscriptionSvg from 'renderer/assets/svg/NewMessageSvg';
import WalletSvg from 'renderer/assets/svg/WalletSvg';
import PersonSvg from 'renderer/assets/svg/Person';
import StreamSvg from 'renderer/assets/svg/Stream';
import ChatSvg from 'renderer/assets/svg/ChatSvg';

const earningsInitJson = [
  {
    title: 'Subscriptions ($)',
    amount: '44.44',
    icon: <SubscriptionSvg />,
  },
  {
    title: 'Post ($)',
    amount: '0.00',
    icon: <NewMessageSvg />,
  },
  {
    title: 'Messages ($)',
    amount: '432.00',
    icon: <ChatSvg />,
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

export default function Earnings() {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box
      padding="10px"
      sx={{
        borderRadius: '16px',
        backgroundColor: isDarkTheme ? '#000' : '#fff',
      }}
    >
      <Stack flexDirection="row" gap="10px">
        <Stack
          spacing={3}
          borderRadius="16px"
          sx={{
            padding: '30px',
            height: 'fit-content',
            border: `1px solid ${theme.palette.primary.contrastText}`,
            minWidth: '270px',
          }}
        >
          <OnlyFansCircleBlue />
          <Divider
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          />
          <Stack flexDirection="row" alignItems="center" gap="35px">
            <Typography color={isDarkTheme ? '#fff' : '#000'} fontSize={14}>
              Total Earnings
            </Typography>
            <Box display={'flex'}>
              <KeyboardArrowUp
                sx={{
                  color: theme.palette.primary.light,
                  fontSize: '14px',
                }}
              />
              <Typography color={theme.palette.primary.light} fontSize="14px">
                12.7%
              </Typography>
            </Box>
          </Stack>
          <Typography
            variant="h3"
            fontWeight="700"
            color={isDarkTheme ? '#fff' : '#000'}
          >
            $473.44
          </Typography>
        </Stack>
        <Box width="fit-content" className={styles.earningsContainer}>
          {earningsInitJson.map((item) => (
            <EarningsRecordCard
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
