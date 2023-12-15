import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import userWhiteLabel from './useData';
import { useContext, useEffect, useState } from 'react';
import fetchReq from 'utils/fetch';
import { AuthContext } from 'renderer/contexts/AuthContext';

const useFormWhiteLabel = () => {
  const { whiteLables, setData, refetch, isError, isLoading } =
    userWhiteLabel();
  const { userData } = useContext(AuthContext);
  const [file, setFile] = useState<string | ArrayBuffer | null>('');
  const [agencyLogo, setAgencyLogo] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');

  const validationSchema = Yup.object().shape({
    agencyLogo: Yup.mixed(),
    primaryColor: Yup.string(),
    secondaryColor: Yup.string(),
    agencyName: Yup.string().required('Agency name is required'),
    email: Yup.string()
      .required('Agency email is required')
      .email('Email is invalid'),
    phone: Yup.string(),
    websiteUrl: Yup.string().required('Agency website is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (whiteLables) {
      setAgencyLogo(whiteLables?.agencyLogo);
      setValue('agencyName', whiteLables?.agencyName);
      setValue('email', whiteLables?.agencyDetails && whiteLables?.agencyDetails[0]?.email);
      // setValue('primaryColor', whiteLables.primaryColor);
      // setValue('secondaryColor', whiteLables.secondaryColor);
      setPrimaryColor(whiteLables?.primaryColor)
      setSecondaryColor(whiteLables?.secondaryColor)
      setValue('websiteUrl', whiteLables?.websiteUrl);
      setValue('phone', whiteLables?.phone);
      setValue('agencyLogo', whiteLables?.agencyLogo);
    }
  }, [whiteLables]);

  const onSubmit = (data: any) => {
    const formdataConvert = new FormData();
    {
      data.agencyLogo && formdataConvert.append('agencyLogo', data.agencyLogo);
    }
    {
      data.agencyName && formdataConvert.append('agencyName', data.agencyName);
    }
    {
      data.email && formdataConvert.append('email', data.email);
    }
    {
      primaryColor &&
        formdataConvert.append('primaryColor', primaryColor);
    }
    {
      secondaryColor &&
        formdataConvert.append('secondaryColor',secondaryColor);
    }
    {
      data.websiteUrl && formdataConvert.append('websiteUrl', data.websiteUrl);
    }
    {
      data.phone && formdataConvert.append('phone', data.phone);
    }
    let endpoint = `agency/update-agency/${userData?.agency?._id} `;
    let options = {
      method: 'PATCH' as 'PATCH',
      withAuth: true,
      body: formdataConvert,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        refetch();
        // setLoading(false);
      })
      .catch((error) => {
        // setError(true);
        // setLoading(false);
      });
  };

  return {
    setValue,
    file,
    setFile,
    register,
    setAgencyLogo,
    agencyLogo,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    setPrimaryColor,
    primaryColor,
    setSecondaryColor,
    secondaryColor
  };
};

export default useFormWhiteLabel;
