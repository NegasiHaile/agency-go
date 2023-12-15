import { Box, Divider, Typography } from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import CandleSvg from 'renderer/assets/svg/CandleSvg';
import Filter from 'renderer/components/Filter';
import { useState } from 'react';
import ArchiveAddSvg from 'renderer/assets/svg/ArchiveAddSvg';
import EarningsCard from 'renderer/components/EarningsCard';
import MultiNavLink from 'renderer/components/MultiNavLink';
import styles from './styles.module.css';
import ScanDetailsTable from './ScanDetailsTable';
import StatisticsCard from 'renderer/pages/Analytics/ChatterReports/Overview/components/ChattingStatistics/StatisticsCard';
import AutoFollowCard from './AutoFollowCard';

function Aside() {
  const [creatorSearch, setCreatorSearch] = useState('');
  const [linkStatus, setLinkStatus] = useState('New Followed');

  return (
    <aside className={styles.aside}>
      <Box
        sx={{
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <CandleSvg />
        <Typography fontWeight={600} fontSize="22px" textTransform={'none'} fontFamily={'Arimo'}>
          Filters
        </Typography>
      </Box>
      <Box padding="32px 16px 21px 16px">
        <Filter.FilterByCreator
          label="Fan's Name"
          placeholder="Enter fan's name"
          creatorSearch={creatorSearch}
          setCreatorSearch={setCreatorSearch}
        />
        <Divider
          sx={{
            background: theme.palette.primary.contrastText,
            marginTop: '11px',
          }}
        />
      </Box>
      <Box padding="32px 16px 21px 16px">
        <Filter.FilterByStatus
          title="Follow Type"
          status={linkStatus}
          options={['New Followed', 'Already Followed', 'False']}
          setStatus={setLinkStatus}
        />
        <Divider
          sx={{
            background: theme.palette.primary.contrastText,
            marginTop: '11px',
          }}
        />
      </Box>
    </aside>
  );
}

const steps = [
  { label: 'Growth', link: '/growth/smart-tags' },
  { label: 'Auto Follow', link: '/growth/auto-follow' },
  { label: 'Scan Details', link: '/growth/auto-follow-scan-details' },
];

const earningsInitJson = [
  {
    title: 'Expired Fans',
    amount: '0',
  },
  {
    title: 'Expired Fans Followed',
    amount: '0',
  },
  {
    title: 'Expired Fans Not Followed',
    amount: '4',
  },
  {
    title: 'No-Subscribe Fans',
    amount: '6',
  },
  {
    title: 'Fans With Paid Subscription',
    amount: '0',
  },
  {
    title: 'Freeloader Fans',
    amount: '0',
  },
];

function ScanDetails() {
  return (
    <>
      <Aside />
      <Box marginLeft="32px" marginRight="16px" marginTop="16px">
        <MultiNavLink steps={steps} />
        <Box
          display="grid"
          gap="16px"
          gridTemplateColumns="repeat(3, 1fr)"
          marginBottom="16px"
        >
          {earningsInitJson.map((item) => (
            <AutoFollowCard
              key={item.title}
              title={item.title}
              amount={item.amount}
            />
          ))}
        </Box>
        <ScanDetailsTable />
      </Box>
    </>
  );
}

export default ScanDetails;
