import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import formUtils from 'renderer/utils/formUtils';
import Input from 'renderer/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonEle from 'renderer/components/Button';
import { useNavigate } from 'react-router-dom';
import Logo from 'renderer/assets/png/agency-go-logo.png';
import useMutation from 'renderer/hooks/useMutation';
import { ButtonBase } from '@mui/material';
import styles from '../Login/styles.module.css';
import { AuthContext } from 'renderer/contexts/AuthContext';
import { useContext } from 'react';

export default function Register() {
  const { login } = useContext(AuthContext);
  const { mutate: mutateRegister, isLoading } = useMutation({ key: 'signup' });
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(9, 'Password must be at least 9 characters'),
    agencyName: Yup.string().required('Agency name is required'),
    numberOfCreators: Yup.number().required('Number of creators is required'),
    agencyWebsite: Yup.string().required('Agency website is required'),
    agencyMediaSocial: Yup.string(),
  }) as Yup.ObjectSchema<FieldValues>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> =  (data) => {
    
    mutateRegister(data, {
      onSuccess: async (res) => {
       await  
       localStorage.setItem('Authorization', res.token?.token);
       localStorage.setItem('AgencyId', res.data?.agencyId);
       localStorage.setItem('UserId', res.data?.Id);
       login();
        navigate('/home');
      },
      onError:(err)=>{
        console.log('err', err)
      }
    });
    // login();
    // navigate('/home');
  };

  return (
    <main className={styles.loginWrap}>
      <section className={styles.login}>
        <img src={Logo} className={styles.logo} alt="only-manage" />
        <h1 className={styles.introHeader}>Manage your creators and profits</h1>
        <p className={styles.introDescription}>
          Welcome back! Please enter your details.
        </p>
        <form
          style={{
            width: '100%',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {formUtils.registerFields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              register={register}
              errors={errors}
              type={field.type}
            />
          ))}
          <ButtonEle
            color="primary"
            type="submit"
            className={styles.loginBtn}
            disabled={isLoading}
          >
            Register
          </ButtonEle>
          <div className={styles.createNewContainer}>
            <p className={styles.createNewText}>Already have an account?</p>
            <ButtonBase
              className={styles.createNewTextLink}
              onClick={() => navigate('/login')}
            >
              Login
            </ButtonBase>
          </div>
        </form>
      </section>
    </main>
  );
}
