import { NextPageContext } from 'next'

export const return404 = <T>({ res }: NextPageContext) => {
  if (res) {
    res.statusCode = 404
  }

  return { notFound: true } as unknown as T
}
