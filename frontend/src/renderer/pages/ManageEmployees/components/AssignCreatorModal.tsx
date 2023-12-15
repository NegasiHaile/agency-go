import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PageTopbar from 'renderer/components/PageTopbar';
import { useState } from 'react';
import useQuery from 'renderer/hooks/useQuery';
import MultiSelect from 'renderer/components/Dropdown';
import fetchReq from 'utils/fetch';
import { useTheme } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#292929',
  color: '#000',
  boxShadow: 24,
  borderRadius: 2,
};

export default function AssignCreatorModal({
  open,
  setOpen,
  name,
  id,
  refetch,
}: any) {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isLoading, data } = useQuery({ key: 'get-creator' });

  const handleAssignCreator = (id: string) => {
    const payload = {
      assignCreator: selectedValues,
    };
    let endpoint = `employee/${id}`;
    let options = {
      method: 'PUT' as 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify(payload),
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        handleClose();
        refetch();
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              padding: '20px',
              borderRadius: '10px 10px 0px 0px',
              color: isDarkTheme ? '#fff' : '#000',
              background: isDarkTheme ? '#000' : '#EAF1FF',
            }}
          >
            Assign Creators for {name}
          </Box>
          <Box
            sx={{
              padding: '20px',

              background: isDarkTheme ? '#4B4B4B' : '#fff',
            }}
          >
            <MultiSelect
              multiple={true}
              creatorNames={data?.data}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </Box>
          <Box
            display={'flex'}
            justifyContent={'end'}
            gap={'10px'}
            sx={{
              padding: '10px 20px',
              borderRadius: '0px 0px 10px 10px',
              background: isDarkTheme ? '#000' : '#EAF1FF',
            }}
          >
            <PageTopbar.Button
              text="Cancel"
              color="secondary"
              onClick={handleClose}
            />
            <PageTopbar.Button
              color="primary"
              text="Confirm"
              onClick={() => handleAssignCreator(id)}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
