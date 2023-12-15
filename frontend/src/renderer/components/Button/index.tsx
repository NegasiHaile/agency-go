import { ButtonHTMLAttributes } from 'react';
import { Button } from '@mui/material';
import cslx from 'clsx';
import styles from './styles.module.css';

interface $Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary';
  variant?: 'contained' | 'text' | 'outlined';
}

export default function ButtonEle({
  children,
  type = 'button',
  color = 'primary',
  variant = 'contained',
  onClick,
  className,
  disabled,
}: $Props) {
  const getBackgroundColor = (): string =>
    ({
      primary: styles.primary,
    }[color]);

  return (
    // eslint-disable-next-line react/button-has-type
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cslx(getBackgroundColor(), className)}
    >
      {children}
    </Button>
  );
}
