import { Box, Stack } from '@mui/material';
import Dashboard from 'renderer/components/Dashboard';
import PageTopbar from 'renderer/components/PageTopbar';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import styles from './styles.module.css';

const links = [
  { text: 'Discover Creators', link: 'discover-creators' },
  { text: 'Invite Link', link: 'invite-link' },
  { text: 'Requests', link: 'requests' },
  { text: 'S4S Schedule', link: 'schedule' },
  { text: 'S4S Settings', link: 'settings' },
];

export default function ShareForShare() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  return (
    <Dashboard>
      <section className={styles.wrapper}>
        <PageTopbar>
          <Stack
            alignItems="center"
            direction="row"
            marginBottom="20px"
            width="100%"
            justifyContent="space-between"
          >
            <PageTopbar.HeaderText>Share For Share</PageTopbar.HeaderText>
          </Stack>
          <Stack flexDirection="row" sx={{ position: 'absolute', bottom: 0 }}>
            {links.map(({ link, text }) => (
              <PageTopbar.Button
                key={text}
                color="secondary"
                text={text}
                isActiveLink={path.includes(link)}
                isLink
                onClick={() => navigate(`/s4s/${link}`)}
              />
            ))}
          </Stack>
        </PageTopbar>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(min-content, 416px) 1fr',
            height: '100%',
          }}
        >
          <Outlet />
        </Box>
      </section>
    </Dashboard>
  );
}
