import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Button, Typography } from '@mui/material';
import { deleteById, updateTimesheet } from 'services/attendance';
import { TimeSheetEdit } from '../Types/index.types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '10px',
  bgcolor: '#121212',
  color: '#fff',
  boxShadow: 24,
  p: 2,
};

export default function TimesheetEditModal({
  showEdit,
  handleClose,
  editData,
  getData,
}: TimeSheetEdit) {
  const [snakbarOpen, setSnackbarOpen] = useState(false);
  const [timeSheetData, setTimeSheetData] = useState(editData);

  const [totalHR, setTotalHR] = useState<string>('');
  const [totalMN, setTotalMN] = useState<string>('');
  const [totalSEC, setTotalSEC] = useState<string>('');
  const [breakHR, setBreakHR] = useState<string>('');
  const [breakMN, setBreakMN] = useState<string>('');
  const [breakSEC, setBreakSEC] = useState<string>('');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const updatetimeSheetData = async () => {
    let theHr = (hr: string) => +hr * 3600;
    let theMin = (min: string) => +min * 60;

    const payload = {
      totalHours: `${theHr(totalHR) + theMin(totalMN) + +totalSEC}`,
      breakHours: `${theHr(breakHR) + theMin(breakMN) + +breakSEC}`,
    };
    try {
      const response = await updateTimesheet(payload, editData._id);
      console.log('response', response);
      if (response.ack === 1) {
        setSnackbarOpen(true);
        handleClose();
        getData();
      }
    } catch (err) {}
  };

  useEffect(() => {
    try {
      setTimeSheetData(editData);
      const totalhrData = formatTime(editData.totalHours).split(':');
      setTotalHR(totalhrData[0]);
      setTotalMN(totalhrData[1]);
      setTotalSEC(totalhrData[2]);
      const breakhrData = formatTime(editData.breakHours).split(':');
      setBreakHR(breakhrData[0]);
      setBreakMN(breakhrData[1]);
      setBreakSEC(breakhrData[2]);
    } catch (err) {}
  }, [editData]);

  const deleteTimeline = async (timelineId: number) => {
    try {
      const response = await deleteById(timelineId);
      if (response.ack === 1) {
        handleClose();
        getData();
      }
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snakbarOpen}
        autoHideDuration={3000} // Adjust this duration as needed
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {'Time Sheet Updated Successfully'}
        </Alert>
      </Snackbar>
      <Modal
        sx={{ backdropFilter: 'blur(4px)' }}
        open={showEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <h2 style={{ textAlign: 'center' }}>Edit Timesheet Report</h2>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              padding: '0px 20px 15px 20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <label style={{ marginRight: 5, width: '30%' }}>
                Total Hours
              </label>
              <input
                placeholder="Total Hours"
                value={totalHR}
                name="totalHours"
                style={{ padding: 10, width: '20%', height: '20%' }}
                onChange={(e) => setTotalHR(e.target.value)}
              />
              <span style={{ fontSize: 30, fontWeight: 'bolder' }}>:</span>
              <input
                placeholder="Total Hours"
                value={totalMN}
                name="totalHours"
                style={{ padding: 10, width: '20%', height: '20%' }}
                onChange={(e) => setTotalMN(e.target.value)}
              />
              <span style={{ fontSize: 30, fontWeight: 'bolder' }}>:</span>
              <input
                placeholder="SS"
                name="totalHours"
                value={totalSEC}
                style={{ padding: 10, width: '20%', height: '20%' }}
                onChange={(e) => setTotalSEC(e.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',

                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <label style={{ marginRight: 5, width: '30%' }}>
                Break Hours
              </label>
              <input
                placeholder="HH"
                name="breakHours"
                value={breakHR}
                style={{ padding: 10, width: '20%', height: '20%' }}
                onChange={(e) => setBreakHR(e.target.value)}
              />
              <span style={{ fontSize: 30, fontWeight: 'bolder' }}>:</span>
              <input
                placeholder="MM"
                name="breakHours"
                value={breakMN}
                style={{ padding: 10, width: '20%', height: '20%' }}
                onChange={(e) => setBreakMN(e.target.value)}
              />
              <span style={{ fontSize: 30, fontWeight: 'bolder' }}>:</span>
              <input
                placeholder="SS"
                name="breakHours"
                value={breakSEC}
                style={{ padding: 10, width: '20%', height: '20%' }}
                onChange={(e) => setBreakSEC(e.target.value)}
              />
            </div>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0px 20px',
            }}
          >
            <div>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteTimeline(timeSheetData?._id)}
              >
                <Typography
                  style={{
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                >
                  Delete
                </Typography>
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={() => updatetimeSheetData()}
                sx={{ marginRight: 1 }}
              >
                <Typography
                  style={{
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                >
                  Save
                </Typography>
              </Button>

              <Button variant="contained" onClick={handleClose}>
                <Typography
                  style={{
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                >
                  Cancel
                </Typography>
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export const countryList = [
  {
    label: 'India',
    value: 'india',
  },
  {
    label: 'Nepal',
    value: 'nepal',
  },
];
