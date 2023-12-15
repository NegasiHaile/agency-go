import { Box } from '@mui/material';
import SearchUsers from 'renderer/components/SearchUsers';
import UpdateButtons from './components/UpdateButtons';
import FilterTag from './components/FilterTag';
import FilterGrid from './components/FilterGrid';
import TriggerButtons from './components/TriggerButtons';
import SmartBar from './components/SmartBar';
import Wrapper from './context/Wrapper';
import { useContext } from 'react';
import { MyContext } from './context/context';

function SmartTags() {

  const{submit} =useContext(MyContext)
  return (
    <>
    <Wrapper>
      <SearchUsers />
      <Box marginLeft="16px" height="75vh" sx={{overflowY:"scroll"}}>
        {/* <UpdateButtons /> */}
        <FilterTag />
        <Box sx={{display:'flex',flexDirection:"column",gap:'10px'}}>
        <FilterGrid />
        {/* <TriggerButtons /> */}
       <SmartBar />
       </Box>
      </Box>
    </Wrapper>
    </>
  );
}

export default SmartTags;
