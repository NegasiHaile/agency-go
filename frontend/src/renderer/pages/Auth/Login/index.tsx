import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonBase } from '@mui/material';
import { useContext } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'renderer/assets/png/agency-go-logo.png';
import ButtonEle from 'renderer/components/Button';
import Input from 'renderer/components/Input';
import { AuthContext } from 'renderer/contexts/AuthContext';
import useMutation from 'renderer/hooks/useMutation';
import formUtils from 'renderer/utils/formUtils';
import fetchReq from 'utils/fetch';
import * as Yup from 'yup';
import styles from './styles.module.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const n = useNavigate();
  const { mutate: mutateLogin, isLoading } = useMutation({ key: 'login' });
  const navigate = useNavigate();
  const validationSchema: Yup.ObjectSchema<FieldValues> = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(9, 'Password must be at least 6 characters')
      .max(32, 'Password must not exceed 40 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let endpoint = 'login';
    let options = {
      method: 'POST' as 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.message == 'login successfully') {
          const twilionUrl = 'chat/chattoken';
          const authToken = res.token?.token;
          const agencyId = res.data?.agencyId;
          const userId = res.data?.Id;
          localStorage.setItem('Authorization', authToken);
          localStorage.setItem('AgencyId', agencyId);
          localStorage.setItem('UserId', userId);
          const twilioOptions = {
            withAuth: true,
            method: 'POST' as 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              email: data?.email,
            }),
          };
          fetchReq(twilionUrl, twilioOptions)
            .then((response) => response.json())
            .then((res) => {
              localStorage.setItem('TwilioToken', res.data);
              login();
              navigate('/home');
            })
            .catch((e) => {
              console.log('chat token error occoured', e);
            });
        } else {
          console.log('login error occoured: ', res.message);
        }
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
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
          autoComplete="off"
        >
          {formUtils.loginFields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              register={register}
              errors={errors}
              type={field.type}
            />
          ))}
          <div className={styles.forgotPasswordWrap}>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot Password
            </Link>
          </div>
          <ButtonEle
            color="primary"
            type="submit"
            className={styles.loginBtn}
            disabled={isLoading}
          >
            Login
          </ButtonEle>

          <ButtonEle
            color="primary"
            className={styles.loginBtn}
            onClick={() => n('/of-browser')}
          >
            OF Browser
          </ButtonEle>

          <div className={styles.createNewContainer}>
            <p className={styles.createNewText}>Don’t have an account?</p>
            <ButtonBase
              className={styles.createNewTextLink}
              onClick={() => {
                navigate('/register');
              }}
              type="button"
            >
              Create New Account
            </ButtonBase>
          </div>
        </form>
      </section>
    </main>
  );
}
