import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useMutation from 'renderer/hooks/useMutation';
import * as Yup from 'yup';
import refetch, { ISelectedEmployee } from './useData';
import fetchReq from 'utils/fetch';

export const useFormEmployee = (
  callback: () => void,
  type: 'add' | 'edit',
  selectedEmployee: ISelectedEmployee
) => {
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [groupOptions, setGroupOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [assignCreator, setAssignCreator] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const { mutate: mutataCreate, isLoading: loadingCreate } = useMutation({
    key: 'create-employee',
  });
  const { mutate: mutateUpdate, isLoading: loadingUpdate } = useMutation({
    key: 'update-employee',
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    role: Yup.string().required('Role is required'),
    agencyId: Yup.string().required('Group is required'),
    assignCreator: Yup.array(),
    payRate: Yup.number().required('Pay rate is required'),
    payInterval: Yup.string().required('Pay Interval is required'),
    commission: Yup.number().min(0).max(100),
    shiftSchedular: Yup.string(),
  });

  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // window.electron.ipcRenderer
    //   .invoke('get-store', 'agency')
    //   .then((res) => {
    //     const result = {
    //       label: res?.agencyName || '',
    //       // eslint-disable-next-line no-underscore-dangle
    //       value: res?._id || '',
    //     };
    //     return setGroupOptions([result]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const onSubmit = (data: any) => {
    if (type === 'add') {
      addEmployee(data);
    } else {
      editEmployee({ ...data, id: selectedEmployee?.id });
      mutateUpdate(
        { ...data, id: selectedEmployee?.id },
        {
          onSuccess: () => {
            callback();
            reset();
            refetch();
          },
        }
      );
    }
  };

  const addEmployee = (data: any) => {
    const endPoint = 'employee/' + data.agencyId;
    const twilioEndPoint = 'chat/user';
    const options = {
      method: 'POST' as 'POST',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify(data),
    };
    const twilioOptions = {
      method: 'POST' as 'POST',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify({
        email: data.email,
      }),
    };
    fetchReq(endPoint, options)
      .then((response) => {
        response.json();
        callback();
        reset();
        setSelectedValues([]);
      })
      .then((_res) => {
        fetchReq(twilioEndPoint, twilioOptions)
          .then((response) => response.json())
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const editEmployee = (data: any) => {
    const endPoint = 'employee/' + data.id;
    const options = {
      method: 'PUT' as 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify(data),
    };
    fetchReq(endPoint, options)
      .then((responce) => responce.json())
      .then((res) => {
        refetch();
        setSelectedValues([]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (selectedEmployee && type === 'edit') {
      setValue('name', selectedEmployee?.name);
      setValue('email', selectedEmployee?.email);
      setValue('role', selectedEmployee?.role);
      setValue('agencyId', selectedEmployee?.agencyId);
      setSelectedValues(
        selectedEmployee?.assignedCreatorsForDropdown.map((val) => val.id)
      );
    } else {
      setSelectedValues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee, type]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    groupOptions,
    assignCreator,
    isLoading: loadingCreate || loadingUpdate,
    selectedValues,
    setSelectedValues,
    setValue,
  };
};

// export default useFormEmployee;
export const useFormAgencyGroup = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    agencyId: Yup.string().required('Agency id is required'),
  });

  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    const payload = {
      name: groupName,
      agencyId: selectedGroup,
    };
    const endPoint = 'agency/addgroup/' + data.agencyId;
    const options = {
      method: 'POST' as 'POST',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify(payload),
    };
    fetchReq(endPoint, options)
      .then((responce) => responce.json())
      .then((res) => {
        refetch();
      })
      .catch((err) => console.log(err));
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    setSelectedGroup,
    selectedGroup,
    groupName,
    setGroupName,
    selectedGroupId,
    setSelectedGroupId,
  };
};
