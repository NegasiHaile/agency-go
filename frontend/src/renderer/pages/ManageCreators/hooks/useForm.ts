import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import useMutation from 'renderer/hooks/useMutation';
import useQuery from 'renderer/hooks/useQuery';
import { ISelectedCreator } from './useData';
import fetchReq from 'utils/fetch';
import { AuthContext } from 'renderer/contexts/AuthContext';

const useFormCreator = (
  callback: () => void,
  type: 'add' | 'edit',
  selectedCreator: ISelectedCreator
) => {
  const [employeeOptions, setEmployeeOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const { userData, userDetail} = useContext(AuthContext);
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [creatorImage, setCreatorImage] = useState<any>('');
  const [creatorStatus,setCreatorStatus] = useState<any>(true)
  const { data: dataEmployeeRaw } = useQuery({
    key: 'get-employee',
    params: { id: localStorage.getItem('AgencyId') },
  });
  const { mutate: mutataCreate, isLoading: loadingCreate } = useMutation({
    key: 'create-creator',
  });
  const { mutate: mutateUpdate, isLoading: loadingUpdate } = useMutation({
    key: 'update-creator',
  });

  const validationSchema = Yup.object().shape({
    creatorImage: Yup.mixed(),
    creatorName: Yup.string() 
    .required('Name is required'),
    gender: Yup.string()
    .required('Gender is required'),
    email:Yup.string()
    .required("Email is required"),
    password:Yup.string()
    .required("password is required"),
    assignEmployee: Yup.array(),
    internalNotes: Yup.string(),
    autoRelink: Yup.boolean(),
    agencyComission: Yup.number().min(0).max(100),
    creatorComission: Yup.number().min(0).max(100),
    proxy: Yup.object({
      isAgencyProxy: Yup.boolean().optional(),
      proxyString: Yup.string().optional()
    }),
  });

  const { register, handleSubmit, reset, setValue, getValues, control } =
    useForm({
      resolver: yupResolver(validationSchema),
    });

  const onSubmit = (data: any) => {
    console.log('trying');
    if (type === 'add') {
      data.status= true
      data.assignEmployee= selectedValues
      const ofCredsObj = {
        email: data?.email,
        password: data?.password,
      };
      data.ofcreds=ofCredsObj
      const formdata = new FormData();
      {data.creatorImage &&
    formdata.append('creatorImage', data.creatorImage)}
    formdata.append('creatorName', data.creatorName);
    formdata.append('autoRelink',  data.autoRelink);
    formdata.append('gender', data.gender);
    formdata.append('ofcreds',JSON.stringify(data.ofcreds));
    formdata.append('internalNotes', data.internalNotes);
    formdata.append('status',data.status);
    formdata.append('agencyComission',data.agencyComission);
    formdata.append('creatorComission',data.creatorComission);
    formdata.append('agencyId',userData?.agency?._id);  
    formdata.append('assignEmployee',JSON.stringify(data.assignEmployee));  
      let endpoint = 'creators';
      let options = {
        method: 'POST' as 'POST',
        body: formdata,
        withAuth: true,
      };
      fetchReq(endpoint, options)
        .then((response) => response.json())
        .then((res) => {
          if (res.message == 'creator added successfully') {
            callback();
            setSelectedValues([]);
            setCreatorImage('')
            reset();
          }
        })
        .catch((err) => {
          console.log('Error occured: ', err);
          callback();
          setSelectedValues([]);
          setCreatorImage('')
          reset();
        });
    } else {
      data.status= creatorStatus
      data.agencyId= userData?.agency?._id
      data.assignEmployee= selectedValues
      const ofCredsObj = {
        email: data?.email,
        password: data?.password,
      };
      data.ofcreds=ofCredsObj
      const formdata = new FormData();
      formdata.append('creatorImage', data.creatorImage)
      formdata.append('creatorName', data.creatorName);
      formdata.append('autoRelink',  data.autoRelink);
      formdata.append('gender', data.gender);
      formdata.append('ofcreds',JSON.stringify(data.ofcreds));
      formdata.append('internalNotes', data.internalNotes);
      formdata.append('status',data.status);
      formdata.append('agencyComission',data.agencyComission);
      formdata.append('creatorComission',data.creatorComission);
      formdata.append('agencyId', data.agencyId);  
      formdata.append('assignEmployee',JSON.stringify(data.assignEmployee));
      let endpoint = `creators/${selectedCreator?.id}`;
      let options = {
        method: 'PATCH' as 'PATCH',
        // headers: {
        //   'content-type': 'application/json',
        // },
        body:  formdata,
        withAuth: true,
      };
      fetchReq(endpoint, options)
        .then((response) => response.json())
        .then((res) => {
          if (res.message == 'creator updated successfully') {
            callback();
            setSelectedValues([]);
            setCreatorImage('')
            reset();
          }
        })
        .catch((err) => {
          console.log('Error occured: ', err);
          callback();
            setSelectedValues([]);
            setCreatorImage('')
            reset();
        });
      // mutateUpdate(
      //   { ...data, id: selectedCreator?.id },
      //   {
      //     onSuccess: () => {
      //       callback();
      //       reset();
      //     },
      //   }
      // );
    }
  };

  useEffect(() => {
    if (selectedCreator && type === 'edit') {
      setValue('creatorName', selectedCreator?.creatorName);
      setValue('assignEmployee', selectedCreator?.assignEmployee);
      setValue('email',selectedCreator?.ofcreds?.email);
      setValue('password',selectedCreator?.ofcreds?.password);
      setValue('gender', selectedCreator?.gender);
      setValue('internalNotes', selectedCreator?.internalNotes);
      setValue('autoRelink', selectedCreator?.autoRelink);
      // setValue('isAgencyProxy', selectedCreator?.proxy);
      setValue('creatorImage',selectedCreator?.creatorImage);
      setValue('agencyComission', selectedCreator?.agencyComission);
      setValue('creatorComission',selectedCreator?.creatorComission);
      setSelectedValues(selectedCreator?.assignEmployee?.map((val) => val._id));
      setCreatorImage(selectedCreator?.creatorImage)
      setCreatorStatus(selectedCreator?.status)
      // setValue('creator', selectedCreator?.creator);
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCreator, type]);

  useEffect(() => {
    if (dataEmployeeRaw?.data) {
      const employeeRes = dataEmployeeRaw?.data?.employees.map((item: any) => {
        return {
          label: item?.name,
          // eslint-disable-next-line no-underscore-dangle
          value: item?._id,
        };
      });
      setEmployeeOptions(employeeRes);
    }
  }, [dataEmployeeRaw]);

  useEffect(()=>{
    if(userData==undefined){
      userDetail()
    }
  },[userData])

  const toggleAutoRelink = () => {
    setValue('autoRelink', !getValues('autoRelink'));
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    onSubmit,
    isLoading: loadingCreate || loadingUpdate,
    employeeOptions,
    control,
    setEmployeeOptions,
    toggleAutoRelink,
    // isAutoRelink: getValues('isAutoRelink'),
    isAutoRelink: true,
    setValue,
    selectedValues,
    setSelectedValues,
    creatorImage,
    setCreatorImage,
  };
};

export default useFormCreator;
