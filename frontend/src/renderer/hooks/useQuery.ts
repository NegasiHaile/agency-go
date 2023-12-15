import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'renderer/contexts/AuthContext';
import { TQueryService } from 'types';
import fetchReq from 'utils/fetch';

interface IProps {
  key: TQueryService;
  params?: any;
  notInitialFetch?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

const useQuery = (props: IProps) => {
  const { userData } = useContext(AuthContext);

  const AgencyId = localStorage.getItem('AgencyId');
  const { key, params, notInitialFetch, onError, onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any>(null);
  const [currentPage, setCurrnetPage] = useState<number>(1);
  const [paginationLimit, setPaginationLimit] = useState<Number>(10);

  const fetch = async () => {
    setLoading(true);
    if (key === 'verify') {
      let endpoint = `verify`;
      let options = {
        method: 'GET' as 'GET',
        headers: {
          'content-type': 'application/json',
        },
        withAuth: true,
      }
      fetchReq(endpoint, options)
        .then((response) => response.json())
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          if (onError) onError();
        });
    }
    if (key === 'get-creator') {
      let endpoint = `creators/${AgencyId}?page=${currentPage}&limt=${paginationLimit}`;
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
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
        });
    }
    if (key === 'get-employee') {
      let endPoint = `employees/${params.id}?page=${currentPage}&limt=${paginationLimit}`;
      let options = {
        method: 'GET' as 'GET',
        headers: {
          'content-type': 'application/json',
        },
        withAuth: true,
      };
      fetchReq(endPoint, options)
        .then((response) => response.json())
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
    if (key === 'get-agencyById') {
      let endPoint = 'agency/' + params.id;
      let options = {
        method: 'GET' as 'GET',
        headers: {
          'content-type': 'application/json',
        },
        withAuth: true,
      };
      fetchReq(endPoint, options)
        .then((response) => response.json())
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
    if (key === 'get-earnings') {
      let endPoint = 'earnings/' + params.agencyId;
      let options = {
        method: 'GET' as 'GET',
        headers: {
          'content-type': 'application/json',
        },
        withAuth: true,
      };
      fetchReq(endPoint, options)
        .then((response) => response.json())
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }

    // window.electron.ipcRenderer.sendMessage(`${key}-request`, params);
    // window.electron.ipcRenderer.on(`${key}-response`, (res) => {
    //   setLoading(false);
    //   setSuccess(true);
    //   setError(false);
    //   setData(res);
    //   if (onSuccess) {
    //     onSuccess();
    //   }
    // });
    // window.electron.ipcRenderer.on(`${key}-error`, () => {
    //   setLoading(false);
    //   setError(true);
    //   setSuccess(false);
    //   if (onError) {
    //     onError();
    //   }
    // });
  };

  useEffect(() => {
    if (!notInitialFetch) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return {
    isLoading: loading,
    isError: error,
    isSuccess: success,
    data,
    refetch: fetch,
    setData: setData,
    setCurrnetPage,
    currentPage,
    paginationLimit,
    setPaginationLimit,
  };
};

export default useQuery;
