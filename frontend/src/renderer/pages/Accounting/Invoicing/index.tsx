import {useEffect, useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import SearchUsers from 'renderer/components/SearchUsers';
import InvoicingTopContainer from './InvoicingTopContainer';
import Payouts from './Payouts';
import Wrapper from './context/Wrapper';

import { API_URL } from 'config';

export default function Invoicing() {
  const [allUsers, setAllUsers] = useState<[]>([]);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data?.data);
        console.log('All users:', data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Wrapper>
      <Box display="flex" bgcolor={isDarkTheme ? '#121212' : '#EAF1FF'}>
      <Stack width={'25%'} bgcolor={isDarkTheme ? '#0C0C0C' : '#fff'}>
        <SearchUsers allUsers={allUsers} getUsers={getUsers} />
      </Stack>
      <Stack width={'75%'} display="flex"  padding={'10px'}>
        <InvoicingTopContainer allUsers={allUsers} />
        <Payouts />
      </Stack>
    </Box></Wrapper>
  );
}

export const randomNumber = (max:any, min:any) =>{
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const agencyCreatorSplit = () =>{
  const agency = randomNumber(45, 15);
  const creator = 100 - agency; // subtracting agency split from 100, so we can get the creator split.
  return `${agency}/${creator}`
}
