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
      <Box marginLeft="32px" marginRight="16px" marginTop="16px" height='100px'>
        {/* <UpdateButtons /> */}
        <FilterTag />
        <FilterGrid />
        {/* <TriggerButtons /> */}
       <SmartBar />
      </Box>
    </Wrapper>
    </>
  );
}

export default SmartTags;
