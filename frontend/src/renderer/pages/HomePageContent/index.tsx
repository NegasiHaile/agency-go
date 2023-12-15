import React from 'react';
import Dashboard from 'renderer/components/Dashboard';
import ShiftTable from './components/ShiftTable';
import { ChartLine } from './components/Chart';
import Earnings from './components/Earnings';
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
        <ShiftTable />
        <ChartLine />
      </section>
    </Dashboard>
  );
}
