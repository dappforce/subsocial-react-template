import { AppDispatch, AppStore, initializeStore } from 'src/store/app/store';
import { NextComponentType, NextPageContext } from 'next';
import { initSubsocialApi } from 'src/components/api';
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial';

export type NextContextWithRedux = {
  context: NextPageContext;
  subsocial: FlatSubsocialApi;
  dispatch: AppDispatch;
  reduxStore: AppStore;
};

type CbFn<Result extends {}> = (props: NextContextWithRedux) => Promise<Result>;

export const getInitialPropsWithRedux = async <ResultProps extends {} = {}>(
  component: NextComponentType<NextPageContext, ResultProps, ResultProps>,
  cb?: CbFn<ResultProps>
) =>
  (component.getInitialProps = async (context: NextPageContext) => {
    const reduxStore = initializeStore();
    let resultProps = {} as ResultProps;

    if (typeof cb === 'function') {
      const { dispatch } = reduxStore;
      const subsocial = await initSubsocialApi();

      resultProps = await cb({ context, subsocial, dispatch, reduxStore });
    }

    return {
      initialReduxState: reduxStore.getState(),
      ...resultProps,
    };
  });
