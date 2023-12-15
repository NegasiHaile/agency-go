import classes from './styles.module.css';
import PageTopbar from 'renderer/components/PageTopbar';
import {
  Box,
  Button,
  ButtonBase,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  title: string;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function SectionHeader(props: Props) {
  const { title, openModal } = props;
  return (
    // <header className={classes.header}>
    //   <h1 className={classes.headerText}>{title}</h1>
    //   <button onClick={()=>openModal(true)}>add shift</button>
    // </header>
    <div>
      <PageTopbar>
        <Stack
          alignItems="center"
          direction="row"
          marginBottom="20px"
          width="100%"
          justifyContent="space-between"
        >
          <PageTopbar.HeaderText>{title}</PageTopbar.HeaderText>
          <Box
            sx={{
              display: 'flex',
              marginLeft: 'auto',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <Button
              variant="contained"
              onClick={() => openModal(true)}
              endIcon={
                <AddIcon
                  sx={{ color: '#fff', marginTop: 0, fontSize: '14px' }}
                />
              }
            >
              <Typography
                style={{
                  textTransform: 'none',
                  color: '#fff',
                  fontSize: '14px',
                }}
              >
                Add Employee
              </Typography>
            </Button>
            {/* <PageTopbar.Button
              color="primary"
              text="Add Shift"
              onClick={() => openModal(true)}
              endIcon={
                <AddIcon
                  sx={{ color: '#fff', marginTop: 0, fontSize: '14px' }}
                />
              }
            /> */}
          </Box>
        </Stack>
      </PageTopbar>
    </div>
  );
}

export default SectionHeader;
