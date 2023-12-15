import { useTheme } from '@mui/material';
import classes from './styles.module.css';

function Preferences() {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <div className={classes.wrapper}>
      <div className={classes.prefernceWrapper}>
        <div className={classes.inputListWrapper}>
          <label className={classes.labellist}>Creator timezone</label>
          <div>
            <div className={classes.select_box}>
              <select
                className={classes.optionlist}
                style={{
                  backgroundColor: isDarkTheme ? '#121212' : '#fff',
                  color: isDarkTheme ? '#fff' : '#121212',
                }}
              >
                <option>UTC +1:00</option>
                <option>Test This Select</option>
              </select>
            </div>
          </div>
          <label className={classes.labellist}>My timezone</label>
          <div className={classes.select_box}>
            <select
              className={classes.optionlist}
              style={{
                backgroundColor: isDarkTheme ? '#121212' : '#fff',
                color: isDarkTheme ? '#fff' : '#121212',
              }}
            >
              <option>UTC +1:00</option>
              <option>Test This Select</option>
            </select>
          </div>
          <label className={classes.labellist}>Weekly reports</label>
          <div className={classes.select_box}>
            <select
              className={classes.optionlist}
              style={{
                backgroundColor: isDarkTheme ? '#121212' : '#fff',
                color: isDarkTheme ? '#fff' : '#121212',
              }}
            >
              <option>Sunday</option>
              <option>Monday</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;
