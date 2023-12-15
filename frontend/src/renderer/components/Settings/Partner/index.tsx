import { Box, Typography, useTheme } from '@mui/material';
import partnerImg from '../../../assets/png/Frame 97.png'
import styles from './styles.module.css';


function Partner() {
const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';



  return (
    <Box sx={{ textAlign: 'center', marginTop: '150px' }}>
      <Typography fontWeight={700} fontSize="53px">
        AgencyGO
      </Typography>
      <img
        src={partnerImg}
        className={styles.creatorImg}
        style={{ borderColor: isDarkTheme ? '#292929' : '#EAF1FF' }}
      />
    </Box>
  );
}

export default Partner;
