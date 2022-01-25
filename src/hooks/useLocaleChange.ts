import { useRouter } from 'next/router';

export const useLocaleChange = () => {
  const router = useRouter();

  return (locale: string) => {
    router.replace(router.pathname, router.pathname, { locale });
  };
};
