import { ReactNode } from 'react';
import styles from './styles.module.css';

interface $Props {
  children: ReactNode | ReactNode[];
  className?: string;
}

export default function PageAside({ children, className = '' }: $Props) {
  return <aside className={`${styles.aside} ${className}`}>{children}</aside>;
}
