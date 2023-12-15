import { FilterAltOutlined } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import CreatorCardWImage from 'renderer/components/CreatorCardWImage';
import SearchInput from 'renderer/components/SearchInput';
import SearchUsers from 'renderer/components/SearchUsers';
import theme from 'renderer/styles/muiTheme';
import { arrGenerator } from 'renderer/utils';
import UserImg from 'renderer/assets/png/userImg.png';

const filterResult = {
  name: 'Joan Adams',
  userTag: '@u258408953',
  ofRanking: '93.00%',
  freeFans: '13.6k',
  img: UserImg,
};

function DiscoverCreators() {
  const [search, setSearch] = useState('');

  const onSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <>
      <SearchUsers />
      <Stack gap="22px" marginLeft="32px" marginRight="16px" marginTop="16px">
        <Stack direction="row" gap="15px" alignItems="center">
          <SearchInput
            value={search}
            onUpdateSearch={onSearch}
            onSearch={() => {}}
            placeholder="Search by Campaign Name"
          />
          <Button
            sx={{
              color: '#fff',
              background: theme.palette.primary.main,
              fontSize: '12px',
              fontWeight: 500,
              height: '32px',
            }}
            startIcon={<FilterAltOutlined sx={{ color: '#fff' }} />}
          >
            Filter
          </Button>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(min-content, 300px))',
            gap: '16px',
            height: '100%',
          }}
        >
          {arrGenerator(6)
            .map(() => filterResult)
            .map(({ name, userTag, ofRanking, freeFans, img }) => (
              <CreatorCardWImage
                key={name}
                name={name}
                userTag={userTag}
                ofRanking={ofRanking}
                freeFans={freeFans}
                creatorImg={img}
              />
            ))}
        </Box>
      </Stack>
    </>
  );
}

export default DiscoverCreators;
