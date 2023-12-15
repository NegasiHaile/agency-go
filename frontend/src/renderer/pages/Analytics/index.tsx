import { Box, Typography, useTheme } from '@mui/material';
import Dashboard from 'renderer/components/Dashboard';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';
import PageTopbar from 'renderer/components/PageTopbar';

const links = [
  { id: 1, text: 'Creator Reports', link: 'create-reports' },
  { id: 2, text: 'Chatter Reports', link: 'chatter-reports' },
  { id: 3, text: 'Fan Reports', link: 'fan-reports' },
];

export default function ShareForShare() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const handleClick = (val: any) => {
    navigate(val.link);
    setActiveTab(val.id);
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Dashboard>
      <section className={styles.wrapper}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            color: '#fff',
            height: '100%',
          }}
        >
          <Box
            sx={{
              bgcolor: isDarkTheme ? '#0C0C0C' : '#fff',
              position: 'absolute',
              top: 0,
              height: '100vh',
              width: 223,
              marginTop: '60px',
              padding: '10px',
            }}
          >
            <Typography
              sx={{ padding: '20px 0px ' }}
              color={isDarkTheme ? '#fff' : '#000'}
            
            >
              Analytics
            </Typography>
            {links.map(({ text, link }) => {
              return (
                <PageTopbar.Button
                  tabButton={true}
                  key={text}
                  color="secondary"
                  text={text}
                  isActiveLink={path.includes(link)}
                  isLink
                  onClick={() => navigate(`/analytics/${link}`)}
                />
              );
            })}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 315,
              background: isDarkTheme ? '#292929' : '#EAF1FF',
              height: 'fit-content',
              borderRadius: '16px',
              width: 'calc(100vw - 355px)',
              marginBottom: '100px',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </section>
    </Dashboard>
  );
}
