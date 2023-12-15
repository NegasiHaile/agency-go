import { ReactNode, useEffect, useState } from 'react';
import classes from './styles.module.css';
import SideBar from './components/Sidebar';
import Header from './components/Header';
import Promotracker from '../../assets/png/Promotracker.png';
import PromoTacker from './components/PromoTacker';
import { Box } from '@mui/material';
interface $Props {
  children: ReactNode | ReactNode[];
}

function Dashboard({ children }: $Props) {
  const [open, setOpen] = useState<any>(false);
  const [modal, setModal] = useState<any>(false);
  const handleOpenModal = () => {
    setModal(true);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const isManager = window.location.pathname.startsWith('/manager-suite');
    if (!isManager) {
      window.electron.ipcRenderer.sendMessage('piev-dismiss');
    }
  }, []);
  return (
    <>
      <div className={classes.dashboardWrapper}>
        <Box>
          <SideBar />
        </Box>
        <div className={classes.secondChild}>
          <Header />
          <Box
            display="flex"
            sx={{ marginTop: '100px', paddingBottom: '50px' }}
          >
            {children}
          </Box>
        </div>
        <div
          style={{
            position: 'fixed',
            top: '33%',
            right: '0px',
            cursor: 'pointer',
          }}
        >
          <img
            style={{
              borderRadius: '20px 0px 0px 20px',
              position: 'absolute',
              top: '0px',
              right: '0px',
            }}
            width="50px"
            height="50px"
            src={Promotracker}
            onClick={handleOpen}
            alt="promoTracker"
          />
          <h3
            style={{
              display: open ? 'block' : 'none',
              cursor: 'pointer',
              backgroundColor: 'Gray',
              color: 'white',
              width: '203px',
              position: 'absolute',
              right: ' 0px',
              top: '38px',
              padding: '20px',
            }}
            onClick={handleOpenModal}
          >
            View Free Trails Link
          </h3>
        </div>
      </div>
      <PromoTacker open={modal} setOpen={setModal} userData="" />
    </>
  );
}

export default Dashboard;
