import { useState } from 'react';
import AuthServices from 'services/auth';
import { TMutationService } from 'types';
import EmpoloyeeServices from 'services/employee';

interface IProps {
  key: TMutationService;
}

interface IOptionsMutate {
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
}

interface IResponse {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: any;
  mutate: (body: any, options?: IOptionsMutate) => void;
}

const useMutation = (props: IProps): IResponse => {
  const { key } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any>(null);

  const mutate = async (body: any, options?: IOptionsMutate) => {
    const { onSuccess, onError } = options || {};
    try {
      setLoading(true);
      let resp = {};
      if (key === 'signup') {
        resp = await AuthServices.signupRequest(body);
      }
      if (key === 'login') {
        resp = await AuthServices.loginRequest(body);
      }
      // if (key === 'create-employee') {
      //   resp = await EmpoloyeeServices.createEmployee(body);
      // }
      if (key === 'update-employee') {
        resp = await EmpoloyeeServices.updateEmployee(body);
      }
      if (key === 'activate-employee') {
        resp = await EmpoloyeeServices.activateEmployee(body);
      }
      if (key === 'deactivate-employee') {
        resp = await EmpoloyeeServices.dectivateEmployee(body);
      }
      setLoading(false);
      setSuccess(true);
      setError(false);
      setData(resp);
      
      if (onSuccess) {
        console.log('onSuccess',resp);
        
        onSuccess(resp);
      }
    } catch (err: any) {
      console.log('errr onError', err);
      
      setLoading(false);
      setError(true);
      setSuccess(false);
      if (onError) {
        onError(data);
      }
    }
  };

  return {
    isLoading: loading,
    isError: error,
    isSuccess: success,
    data,
    mutate,
  };
};

export default useMutation;
