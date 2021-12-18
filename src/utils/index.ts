import numeral from 'numeral'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import relativeTime from 'dayjs/plugin/relativeTime'
import slugify from 'slugify'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

export const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => console.log('copied'))
}

export const getTime = (date: Date | number) => {
    dayjs.updateLocale('en', {
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%dm',
            h: 'an hour',
            hh: '%dh',
            d: 'a day',
            dd: '%dd',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years',
        }
    })

    const dateOfItem = dayjs(date)
    const days = dayjs().diff(dateOfItem, 'days')

    if (days < 7) return dateOfItem.fromNow()
    if (days > 365) return dateOfItem.format('d MMM YY')
    return dateOfItem.format('DD MMM')
}

export const transformCount = (value: number): string => {
    return numeral(value).format('0,0a')
}

export const loadImgUrl = (cid: string) => {
    return cid ? `https://app.subsocial.network/ipfs/ipfs/${cid}` : ''
}

const contractionText = (inputText: string | undefined, maxLimit: number): string => {
    if (!inputText) {
      return ''
    }

    const maxLength = 60

    const outputText = inputText.length < maxLimit
        ? inputText
        : inputText.slice(0, inputText.lastIndexOf(' ', maxLength));

    return outputText
};

export enum TypeUrl {
  Space = 'Space',
  Account = 'Account',
  Post = 'Post',
  Comment = 'Comment',
}

interface UrlOptions {
  type: TypeUrl,
  title?: string,
  id?: string,
  subTitle?: string,
  subId?: string,
}

export const getUrl = (options: UrlOptions): string => {
    const { type, title, id, subTitle, subId } = options;
    let url = '/';
    const shortTitle = contractionText(title, 60)

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
        const shortSubTitle = contractionText(subTitle, 60)

        const subUrl = slugify(
            `${shortSubTitle ? shortSubTitle : ''} ${subId}`,
            {
                replacement: '-',
                remove: /[*+~.,()'"!?:@#;]/g,
                lower: true,
                trim: true,
            },
        );

        url += `/${subUrl}`;
    }

    return url;
}
