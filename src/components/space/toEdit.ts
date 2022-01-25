import Router from 'next/router';

export const toEdit = (id: string) => {
  Router.push(`/${id}/edit`);
};
