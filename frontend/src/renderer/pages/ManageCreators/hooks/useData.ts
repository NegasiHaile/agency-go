import { useEffect, useState } from 'react';
import useQuery from 'renderer/hooks/useQuery';
import fetchReq from 'utils/fetch';

export interface IOfManagerCred {
  email: string;
  password: string;
}

export interface IProxyCreds {
  hostname: string;
  password: string;
  port: number;
  protocol: string;
  username: string;
}

export interface IProxyUser {
  user_pass: string;
  username: string;
}

export interface ICreatorProxy {
  creds: IProxyCreds;
  proxyUser: IProxyUser;
}

export interface ICreatorList {
  _id: ICreatorList | null;
  creatorName: string;
  imageSrc: string;
  gender: string;
  internalNotes: string;
  assignEmployee: string[];
  activated: boolean;
  autoRelink: boolean;
  id: string;
  status: boolean;
  ofcreds: IOfManagerCred;
  proxy: ICreatorProxy;
}

export interface ISelectedCreator {
  creatorName: string;
  gender: string;
  id: string;
  internalNotes: string;
  autoRelink: boolean;
  assignEmployee: any[];
  proxy: boolean;
  agency: string;
  creator: string;
  status: boolean;
}

const useDataCreators = () => {
  const agencyId = localStorage.getItem('AgencyId');
  const [creators, setCreators] = useState<ICreatorList[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<ICreatorList | null>(
    null
  );
  const { data, isLoading, refetch, setData } = useQuery({
    key: 'get-creator',
    params: agencyId,
  });

  useEffect(() => {
    const creatorsRes =
      data?.data?.map((item: any) => ({
        ...item,
        id: item?._id,
      })) || [];
    setCreators(creatorsRes);
  }, [data]);

  const handleSearch = (data: any) => {
    const queryString = Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join('&');

    let endpoint = `creators/search?agencyId=${agencyId}&${queryString}`;

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
        setCreators(res?.data);
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
  };
};

export default useDataCreators;
