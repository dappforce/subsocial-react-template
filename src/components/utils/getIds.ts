import BN from 'bn.js';
import {
  DEFAULT_FIRST_PAGE,
  DEFAULT_PAGE_SIZE,
} from 'src/config/ListData.config';
import { nonEmptyStr } from '@subsocial/utils';

const tryParseInt = (maybeNum: string | number, def: number): number => {
  if (typeof maybeNum === 'number') {
    return maybeNum;
  }
  try {
    return parseInt(maybeNum);
  } catch (err) {
    return def;
  }
};

export type PaginationQuery = {
  page?: number | string | string[];
  size?: number | string | string[];
};

export type ParsedPaginationQuery = {
  page: number;
  size: number;
};

export const parsePageQuery = (
  props: PaginationQuery
): ParsedPaginationQuery => {
  let { page = DEFAULT_FIRST_PAGE, size = DEFAULT_PAGE_SIZE } = props;

  if (nonEmptyStr(page)) {
    page = tryParseInt(page, DEFAULT_FIRST_PAGE);
  }

  if (nonEmptyStr(size)) {
    size = tryParseInt(size, DEFAULT_PAGE_SIZE);
  }

  return {
    page: page as number,
    size: size as number,
  };
};

export const getPageOfIds = <T = BN>(ids: T[], query: PaginationQuery): T[] => {
  const { page, size } = parsePageQuery(query);
  const offset = (page - 1) * size;
  const idsCount = ids.length;

  // If requested page is out of range of input array.
  if (offset >= idsCount) {
    return [];
  }

  let limit = offset + size;
  if (limit > idsCount) {
    limit = idsCount;
  }

  const pageOfIds = [];
  for (let i = offset; i < limit; i++) {
    pageOfIds.push(ids[i]);
  }

  return pageOfIds;
};
