import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PageTopbar from 'renderer/components/PageTopbar';
import { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from 'renderer/contexts/AuthContext';
import { DropdownWithLabel, InputWithLabel } from 'renderer/components/Settings/Wallet/Common/ModalComponents';

export default function CreateConversationModal({ open, setOpen, getAllConversationList }: any) {
  const { userData } = useContext(AuthContext);
  const handleClose = () => setOpen(false);
  const { data } = useQuery({ key: 'get-employee' , params: {id: userData?.agency._id} });
  const theme = useTheme();
   const isDarkTheme = theme.palette.mode === 'dark';

  const [friendlyName, setFriendlyName] = useState('')
  const [toEmail, setToEmail] = useState('')

  const getOptions = () =>{
    if(data){
        const options = data?.data?.map((employee:any)=>{
            return {
                value: employee.email,
                label: employee.name
            }
         })
         return options
    }
    else return [] 
  }

  const handleNewParticipant = (sid: string) =>{
    const data = {
       username: toEmail
    }
    const endPoint = `chat/addparticipant/${sid}`
    const options = {
       method: 'POST' as 'POST',
       headers: {
         'content-type': 'application/json',
       },
       withAuth: true,
       body: JSON.stringify(data),
     };
     fetchReq(endPoint,options)
     .then(response=> response.json())
     .then(res=> {
        setFriendlyName('')
        setToEmail('')
        getAllConversationList()
        handleClose()
     })
     .catch(err=> console.log('error while creating conversation', err))
 }

  const handleNewConversation = () =>{
     const data = {
        friendlyName: friendlyName,
        userEmail: userData?.user.email
     }
     const endPoint = 'chat/conversation'
     const options = {
        method: 'POST' as 'POST',
        headers: {
          'content-type': 'application/json',
        },
        withAuth: true,
        body: JSON.stringify(data),
      };
      fetchReq(endPoint,options)
      .then(response=> response.json())
      .then(res=> {
        const sid = res?.conversation.sid
        handleNewParticipant(sid)
      })
      .catch(err=> console.log('error while creating conversation', err))
  }

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
            Create New Conversation
          </Box>
          <Box
            sx={{
              padding: '20px',

              background: isDarkTheme ? '#4B4B4B' : '#fff',
            }}
          >
            <DropdownWithLabel
            label="Select User"
            inputIdentifierName="user_email"
            options={getOptions()}
            handleOnChange={(name,value)=> setToEmail(value ||'')}
            />

            <InputWithLabel
              label="Conversation Name"
              inputIdentifierName="conversation_name"
              placeholder="Enter conversation name"
              handleOnChange={(name,value)=> setFriendlyName(value)}
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
              onClick={()=>{
                if(friendlyName && toEmail){
                  handleNewConversation()
                }
              }}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}