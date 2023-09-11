import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='bg-gradient-to-br from-violet-900 to-blue-700'>
      {children}
    </div>
  );
};

export default AuthLayout;
