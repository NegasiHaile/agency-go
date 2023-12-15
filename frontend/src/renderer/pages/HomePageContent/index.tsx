import Dashboard from 'renderer/components/Dashboard';
import ShiftTable from './components/ShiftTable';
import Earnings from './components/Earnings';
import ChatterSales from './components/ChatterSales';
import styles from './styles.modules.css';
import { useTheme } from '@mui/material';

export default function HomePage() {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  // Determine the class based on the theme
  const mode = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return (
    <Dashboard>
      <section className={`${styles.wrapper} ${mode}`}>
        <Earnings />
        <ChatterSales />
        <ShiftTable />
      </section>
    </Dashboard>
  );
}
