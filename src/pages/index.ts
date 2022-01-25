import HomePage from '../components/home/HomePage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default HomePage;

export async function getServerSideProps({ query, locale }: any) {
  if (query.tab) {
    return {
      props: {
        router: {
          query,
        },
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
