import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'renderer/contexts/AuthContext';
import useQuery from 'renderer/hooks/useQuery';
import { Creator } from 'renderer/types/creator';
import fetchReq from 'utils/fetch';

const useDataCreators = (preselected?: string | null) => {
  const { userData } = useContext(AuthContext);
  const agencyId = localStorage.getItem('AgencyId')
  const [creators, setCreators] = useState<Creator[]>([]);
  const [totalCreatorsCount, setTotalCreatorsCount]= useState<number>()
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(
    null
  );
  const { data, isLoading, refetch, setData,setCurrnetPage,currentPage ,paginationLimit} = useQuery({
    key: 'get-creator',
    params: userData?.agency?._id,
  });

  useEffect(() => {
    const creatorsRes =
      data?.data?.creators?.map((item: any) => ({
        ...item,
        id: item?._id,
      })) || [];
    const creators = creatorsRes as Creator[];
    setCreators(creatorsRes);
    setTotalCreatorsCount (data?.data?.totalDocument);
    if (preselected) {
      const selected = creators.find(c => c.id === preselected);
      if (selected) {
        setSelectedCreator(selected);
      }
    } else {
      const selected = creators.at(0);
      if (selected) {
        setSelectedCreator(selected);
      }
    }
  }, [data]);

  const handleSearch = (data: any) => {
    const queryString = Object.keys(data)
      .map((key) => `${key}=${(data[key])}`)
      .join('&');
    let endpoint = `creators/search/data?${queryString}&page=${currentPage}&limit=${paginationLimit}`;
    let options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        // setCreators(res?.data.data);
        setSelectedCreator(res?.data[0]._id);
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  };

  return {
    creators,
    isLoading,
    selectedCreator,
    setSelectedCreator,
    refetch,
    handleSearch,
    setCurrnetPage,
    currentPage,
    totalCreatorsCount,
  };
};

export default useDataCreators;
