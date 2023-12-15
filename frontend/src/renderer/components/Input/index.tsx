import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { TextField } from '@mui/material';
import styles from './styles.module.css';

interface $InputProps {
  label: string;
  name: keyof FieldValues;
  type: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export default function Input({
  label,
  name,
  type,
  register,
  errors,
}: $InputProps) {
  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <TextField
      sx={{color:'#fff'}}
        InputLabelProps={{ shrink: false }}
        InputProps={{ className: styles.input }}
        size="small"
        type={type}
        id={name}
       
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name)}
        aria-invalid={errors[name] ? 'true' : 'false'}
      />
      {errors[name]?.message && (
        <span className={styles.error}>{errors[name]?.message as string}</span>
      )}
    </fieldset>
  );
}
