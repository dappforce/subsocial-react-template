import HomePage from '../components/home/HomePage';

export default HomePage;

export async function getServerSideProps({ query }: any) {
  if (query.tab) {
      return {
          props: {
              router: {
                  query
              },
          },
      };
  }

  return { props: {}}
}
