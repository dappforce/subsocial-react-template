import {PostContent} from "@subsocial/api/types";

export const getInitialPostValue = (
  post: PostContent | undefined
): {
  title?: string;
  body?: string;
  image?: string;
  link?: string;
  tags?: string[];
} => {
  if (post) {
    return {...post};
  }
  return {};
};
