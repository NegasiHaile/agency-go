import ButtonEle from 'renderer/components/Button';
import Input from 'renderer/components/Input';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './styles.module.css';
import fields from 'renderer/utils/formUtils';
import { Box, Link } from '@mui/material';
import fetchReq from 'utils/fetch';

const SetPassword = () => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(9, 'Password must be at least 9 characters'),
  }) as Yup.ObjectSchema<FieldValues>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const id = location.pathname.split('/').slice(-1).pop();
    const pass = data.password;
    const payload = {
      password: pass,
      newInvite:true
    };
    let endpoint = `employee/${id}`;
    let options = {
      method: 'PUT' as 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      // withAuth: true,
      body: JSON.stringify(payload),
    };

    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  };

  return (
    <>
      <Box className={styles.header}>
        <h1>INFLOWW LOGO</h1>
      </Box>
      <Box className={styles.resetpass}>
        <h1 className={styles.heading}>Set Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.setPasswordFields?.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              register={register}
              errors={errors}
            />
          ))}
          <ButtonEle className={styles.button} type="submit">
            Confirm
          </ButtonEle>
        </form>
      </Box>
      <Box className={styles.links}>
        <Link href="#">Terms of Service</Link>|
        <Link href="#">Privacy Policy</Link>|<Link href="#">DMCA</Link>|
        <Link href="#">2257 Disclosure Statement</Link>
      </Box>
    </>
  );
};

export default SetPassword;
