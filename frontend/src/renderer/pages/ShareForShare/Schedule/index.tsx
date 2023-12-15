import { Stack, Typography, Box, Divider } from '@mui/material';
import { useState } from 'react';
import SearchUsers from 'renderer/components/SearchUsers';
import { format } from 'date-fns';
import theme from 'renderer/styles/muiTheme';
import UserImg from 'renderer/assets/png/userImg.png';
import ScheduleCardWImage from 'renderer/components/ScheduleCardWImage';
import { arrGenerator } from 'renderer/utils';
import MiniCalendar from 'renderer/components/MiniCalendar';
import StatisticsDataBox from './StaticticsDataBox';

const filterResult = {
  name: 'Joan Adams',
  userTag: '@u258408953',
  ofRanking: '93.00%',
  freeFans: '13.6k',
  img: UserImg,
  description: 'Love your content.',
};

type Value = Date | null;

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  const formattedSelectedDate = format(
    selectedDate || new Date(),
    'dd MMMM, yyyy'
  );

  return (
    <>
      <SearchUsers />
      <Stack gap="22px" marginLeft="32px" marginRight="16px" marginTop="16px">
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#fff" fontSize="16px" fontWeight={500}>
            S4S Schedule
          </Typography>
          <Typography
            color={theme.palette.primary.main}
            fontSize="16px"
            fontWeight={500}
          >
            {formattedSelectedDate}
          </Typography>
        </Stack>
        <Stack direction={'row'} gap={'10px'}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(min-content, 300px))',
              gridRow: '16px',
              height: '100%',
              width: '100%',
            }}
          >
            {arrGenerator(2)
              .map(() => filterResult)
              .map(
                ({ name, userTag, ofRanking, freeFans, img, description }) => (
                  <ScheduleCardWImage
                    key={name}
                    name={name}
                    userTag={userTag}
                    ofRanking={ofRanking}
                    freeFans={freeFans}
                    creatorImg={img}
                    description={description}
                  />
                )
              )}
          </Box>
          <Divider
            orientation="vertical"
            sx={{ border: `1px solid ${theme.palette.secondary.light}` }}
          />
          <Stack sx={{ width: '100%' }} gap={'10px'}>
            <MiniCalendar date={selectedDate} setDate={setSelectedDate} />
            <Typography color={'#fff'} fontSize={'18px'} fontWeight={500}>
              Statistics
            </Typography>
            <StatisticsDataBox
              title={`Scheduled for ${formattedSelectedDate}`}
              amount={'2'}
            />
            <StatisticsDataBox title={`Total Growth`} amount={'150'} />
            <StatisticsDataBox
              title={`Completed Share for Shares`}
              amount={'150'}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
