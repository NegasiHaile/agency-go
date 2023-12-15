import {
  useTheme,
  Stack,
  Box
} from '@mui/material';

import fetchReq from 'utils/fetch';
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from 'renderer/contexts/AuthContext';
import SearchUsers from 'renderer/components/SearchUsers';
import CreatorPromotion from './creatorPromotion'
import CreatorsList from './creatorList'
import { TextFields } from '@mui/icons-material';
function ProfilePromotion() {

  const [creators, setCreators] = useState<[]>([])
  const [agencyPromotions, setAgencyPromotions] = useState<any>([])
  const [agencyCreators, setAgencyCreators] = useState()

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  useEffect(() => {
    getCreators();
    getPromotions()
  }, []);

  const user = useContext(AuthContext)

  const getCreators = () => {
    const agencyId = user.userData.agency._id;
    console.log('agencyId', agencyId)
    const endPoint = `creators/${agencyId}`;
    const options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endPoint, options)
      .then((response) => response.json())
      .then((res) => {
        setAgencyCreators(res.data.creators);
      })
      .catch((error) => console.log(error));
  };
  const getPromotions = () => {
    const agencyId = user.userData.agency._id;
    const endPoint = `promotion/agency/${agencyId}`;
    const options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };

    fetchReq(endPoint, options)
      .then((response) => response.json())
      .then((res) => {
        setAgencyPromotions(res.data)
      })
      .catch((error) => console.log(error));
  };

  const getCreatorPromotions = (creatorId: string) => {
    return agencyPromotions.filter((promotion: { creatorId: string; }) => promotion?.creatorId === creatorId)
  }

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <Box width='40%'>
          <Box>
            <TextFields/>
            <label htmlFor=""></label>
          </Box>
         <CreatorsList/>
        </Box>
        <Box width='60%'>
          <CreatorPromotion />
        </Box>
      </Stack>
    </>
  );
}

export default ProfilePromotion;
