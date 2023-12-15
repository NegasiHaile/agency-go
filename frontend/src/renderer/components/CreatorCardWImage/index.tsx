import { Button, Stack, Typography } from '@mui/material';
import AvatarSvg from 'renderer/assets/svg/AvatarSvg';
import theme from 'renderer/styles/muiTheme';
import RankTag from '../RankTag';
import styles from './styles.module.css';

interface $Props {
  name: string;
  userTag: string;
  ofRanking: string;
  freeFans: string;
  creatorImg: string;
}

export default function CreatorCardWImage({
  name,
  userTag,
  ofRanking,
  freeFans,
  creatorImg,
}: $Props) {
  return (
    <Stack gap="16px" alignItems="center">
      <Stack gap="16px">
        <Stack direction="row" gap="10px" alignItems="center">
          <AvatarSvg />
          <Stack>
            <Typography color="#fff" fontWeight={500} fontSize="16px">
              {name}
            </Typography>
            <Typography color="#fff" fontWeight={500} fontSize="10px">
              {userTag}
            </Typography>
          </Stack>
          <Typography
            color={theme.palette.info.main}
            fontSize="12px"
            fontWeight={500}
            marginLeft="auto"
          >
            Free
          </Typography>
        </Stack>
        <Stack direction="row" gap="10px">
          <RankTag title="OF Ranking:" amount={ofRanking} />
          <RankTag title="Free Fans" amount={freeFans} />
        </Stack>
        <img src={creatorImg} alt={name} className={styles.creatorImg} />
        <Button
          sx={{
            color: '#fff',
            background: theme.palette.primary.main,
            fontSize: '12px',
            fontWeight: 500,
            borderRadius: '4px',
            textTransform: 'unset !important',
          }}
        >
          Request Share for Share
        </Button>
      </Stack>
    </Stack>
  );
}
