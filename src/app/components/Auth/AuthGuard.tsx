'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;