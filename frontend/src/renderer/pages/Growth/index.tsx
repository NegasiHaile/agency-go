import { Box, Stack, useTheme } from '@mui/material';
import Dashboard from 'renderer/components/Dashboard';
import PageTopbar from 'renderer/components/PageTopbar';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import styles from './styles.module.css';
import AddScriptsBtns from './Scripts/components/AddScriptsBtns';

const links = [
  { text: 'Smart Tags', link: 'smart-tags' },
  { text: 'Auto Follow', link: 'auto-follow' },
  { text: 'Profile Promotion', link: 'profile-promotion' },
  { text: 'Trial Links', link: 'trial-links' },
  { text: 'Tracking Links', link: 'tracking-links' },
  { text: 'Scripts', link: 'scripts' },
];

export default function Growth() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const isScriptsPage = path.includes('scripts');

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Dashboard>
      <section className={styles.wrapper}>
          <Box className={styles.topbarwrapper}  sx={{
        backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
      }}>
          <Stack
          sx={{position:'sticky',left:'0'}}
            alignItems="center"
            direction="row"
            marginBottom="20px"
            width="100%"
            justifyContent="space-between"
          >
            <PageTopbar.HeaderText>Growth</PageTopbar.HeaderText>
            {isScriptsPage && <AddScriptsBtns />}
          </Stack>
          <Stack flexDirection="row" sx={{  }}>
            {links.map(({ link, text }) => (
              <PageTopbar.TabButton
                key={text}
                color="secondary"
                text={text}
                isActiveLink={path.includes(link)}
                isLink
                onClick={() => navigate(`/growth/${link}`)}
              />
            ))}
          </Stack>
          </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(min-content, 380px) 1fr',
            height: '88vh',
            backgroundColor: isDarkTheme ? '#000' : '#fff',
          }}
        >
          <Outlet />
        </Box>
      </section>
    </Dashboard>
  );
}
