import { Box, Typography, useTheme } from '@mui/material';
import Dashboard from 'renderer/components/Dashboard';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import PageTopbar from 'renderer/components/PageTopbar';

const links = [
  { id: 1, text: 'Invoicing', link: 'invoicing' },
  { id: 2, text: 'Payroll', link: 'payroll' },
  { id: 3, text: 'Book Keeping', link: 'book-keeping' },
];

export default function Accounting() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Dashboard>
      <section className={styles.wrapper}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            color: isDarkTheme ? '#fff' : '#000',
            height: '100%',
            zIndex: 30,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 50,
              height: '100vh',
              width: 200,
              zIndex: 10,
              padding: '10px',
            }}
          >
            <Typography sx={{ padding: '20px 0px ' }}>Accounting</Typography>
            {links.map(({ text, link }) => {
              return (
                <PageTopbar.Button
                  tabButton={true}
                  key={text}
                  color="secondary"
                  text={text}
                  isActiveLink={path.includes(link)}
                  isLink
                  onClick={() => navigate(`/accounting/${link}`)}
                />
              );
            })}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 315,
              background: '#292929',
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
