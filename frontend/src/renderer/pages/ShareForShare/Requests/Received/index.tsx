import { Box } from '@mui/material';
import RequestCardWImage from 'renderer/components/RequestCardWImage';
import { arrGenerator } from 'renderer/utils';
import UserImg from 'renderer/assets/png/userImg.png';

const filterResult = {
  name: 'Joan Adams',
  userTag: '@u258408953',
  ofRanking: '93.00%',
  freeFans: '13.6k',
  img: UserImg,
  description: 'Love your content.',
};

export default function ReceivedRequests() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min-content, 300px))',
        gap: '16px',
        height: '100%',
      }}
    >
      {arrGenerator(6)
        .map(() => filterResult)
        .map(({ name, userTag, ofRanking, freeFans, img, description }) => (
          <RequestCardWImage
            key={name}
            name={name}
            userTag={userTag}
            ofRanking={ofRanking}
            freeFans={freeFans}
            creatorImg={img}
            description={description}
          />
        ))}
    </Box>
  );
}
