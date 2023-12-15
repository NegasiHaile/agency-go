import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'renderer/contexts/AuthContext';
import useQuery from 'renderer/hooks/useQuery';

export interface ISelectedWhiteLabel {
  agencyLogo?: FileList;
  primaryColor?: string;
  secondaryColor?: string;
  agencyName?: string;
  agencyEmail?: string;
  agencyPhone?: string;
  agencyWebsite?: string;
}

const userWhiteLabel = () => {
  const { userData } = useContext(AuthContext);
  const [whiteLables, setWhiteLabels] = useState<any>({});
  const { data, refetch, setData, isLoading, isError } = useQuery({
    key: 'get-agencyById',
    params: { id: userData?.agency?._id },
  });

  useEffect(() => {
    if (data) {
      setWhiteLabels(data.data);
    }
  }, [data]);

  return {
    whiteLables,
    setData,
    refetch,
    isLoading,
    isError,
  };
};

export default userWhiteLabel;
