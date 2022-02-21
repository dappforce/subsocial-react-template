import numeral from 'numeral';
import slugify from 'slugify';
import {
  I18N_DAYJS_RELATIVE_TIME_KEY,
  RelativeTimeProps,
  relativeTimeUnits,
  SubDate,
  SubsocialDateLocaleProps
} from '@subsocial/utils';
import { t } from 'i18next';
import { config } from 'src/config';


export const copyText = (text: string) => {
  navigator.clipboard.writeText(text).then(() => console.log('copied'));
};

export const DateService =  {
  getDate(date: string | number) {
    return SubDate.formatDate(date);
  },

  updateLocale(lang: string) {
    const relativeTime = Object.assign({}, relativeTimeUnits);

    for (let key in relativeTimeUnits) {
      const unit = relativeTimeUnits[key as keyof RelativeTimeProps];

      relativeTime[key as keyof RelativeTimeProps] = t(
        `${I18N_DAYJS_RELATIVE_TIME_KEY}.${key}`,
        {
          unit,
        }
      );
    }

    const subDateLocale: SubsocialDateLocaleProps = {
      localeName: lang,
      relativeTime: relativeTime,
    };

    SubDate.updateLocale(subDateLocale);
  },
}

export const transformCount = (value: number): string => {
  return numeral(value).format('0,0a');
};

export const loadImgUrl = (cid: string) => {
  return cid
    ? `${config.ipfsNodeUrl}/ipfs/${cid}`
    : '';
};

const contractionText = (
  inputText: string | undefined,
  maxLimit: number
): string => {
  if (!inputText) {
    return '';
  }

  const maxLength = 60;

  const outputText =
    inputText.length < maxLimit
      ? inputText
      : inputText.slice(0, inputText.lastIndexOf(' ', maxLength));

  return outputText;
};

export enum TypeUrl {
  Space = 'Space',
  Account = 'Account',
  Post = 'Post',
  Comment = 'Comment',
}

interface UrlOptions {
  type: TypeUrl;
  title?: string;
  id?: string;
  subTitle?: string;
  subId?: string;
}

export const getUrl = (options: UrlOptions): string => {
  const { type, title, id, subTitle, subId } = options;
  let url = '/';
  const shortTitle = contractionText(title, 60);

  switch (type) {
    case TypeUrl.Space:
      url += shortTitle ? `@${shortTitle}` : id;
      return url;
    case TypeUrl.Account:
      url += `accounts/${id}`;
      return url;
    case TypeUrl.Post:
      url += shortTitle ? `@${shortTitle}` : id ? id : 'posts';
      break;
    case TypeUrl.Comment:
      url += shortTitle ? `@${shortTitle}` : id ? id : 'comments';
      break;
    default:
      break;
  }

  if (subTitle || subId) {
    const shortSubTitle = contractionText(subTitle, 60);

    const subUrl = slugify(`${shortSubTitle ? shortSubTitle : ''} ${subId}`, {
      replacement: '-',
      remove: /[*+~.,()'"!?:@#;]/g,
      lower: true,
      trim: true,
    });

    url += `/${subUrl}`;
  }

  return url;
};
