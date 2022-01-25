import { FC } from 'react';
import styles from './Layout.module.sass';
import { Container, ContainerProps } from '@mui/material';

const Layout: FC<ContainerProps> = ({
  children,
  className: inputClassName,
  ...props
}) => {
  const className = inputClassName
    ? `${styles.layout} ${inputClassName}`
    : styles.layout;

  return (
    <>
      <Container maxWidth={'md'} {...props} className={className}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
