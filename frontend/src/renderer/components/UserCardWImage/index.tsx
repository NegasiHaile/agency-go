import Avatar from 'renderer/assets/svg/AvatarSvg';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

interface $Props {
  name: string;
  profileImage: string;
  notificationCount?: number;
  data?: any;
  id: string;
  messageCount?: number;
  selected: boolean;
  autoRelink: boolean;
  onClick?: ()=> void
}
export default function UserCardWImage({
  name,
  autoRelink,
  profileImage,
  data,
  id,
  notificationCount,
  messageCount,
  selected,
  onClick,
}: $Props) {
  // const [selected, setSelected] = useState(false);
  const cardClass = selected
    ? `${styles.card} ${styles.selected}`
    : styles.card;

  useEffect(() => {
    console.log('inner', selected);
  }, []);

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
 
  return (
    <Box
      // spacing={1}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      className={cardClass}
      onClick={ onClick}
    >
      {profileImage !== '' ? (
        <img
          src={profileImage}
          alt={name ? name.split(' ')[0] : 'No Name'}
          className={styles.image}
        />
      ) : (
        <Avatar />
      )}
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
      >
        <Typography
          variant="h3"
          fontSize={'18px'}
          sx={{ cursor: 'pointer' }}
          fontWeight={500}
        >
          {name}
        </Typography>
        <Box>
          {(!!notificationCount) && (
            <IconButton
              className={styles.icon}
              sx={{
                // backgroundColor: '#292929',
                borderRadius: '5px',
                marginRight: '10px',
              }}
            >
              <Typography fontSize={'14px'} fontWeight={400}>
                {notificationCount}
              </Typography>
              {/* <Message /> */}
            </IconButton>
          )}
          {messageCount !== 0 && (
            <IconButton
              className={styles.icon}
              sx={{
                background: isDarkTheme ? '#292929' : '#EAF1FF',
                borderRadius: '5px',
              }}
            >
              <Typography fontSize={'14px'} fontWeight={400}>
                {messageCount}
              </Typography>
              <NotificationsNoneIcon
                sx={{
                  color: '#AAAAAA',
                  width: '18px',
                  height: '18px',
                }}
              />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}