import numeral from 'numeral'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import relativeTime from 'dayjs/plugin/relativeTime'
import slugify from 'slugify'
import { isProdMode } from '../config/env'
import { PostId, SpaceId } from '@subsocial/types/substrate/interfaces'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

export const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => console.log('copied'))
}

export const myLoader = ({src, width, quality}: any) => {
    const BASE_URL = isProdMode ? 'https://dev-subsocial-react.codebridge.tech' : 'http://localhost:3000'
    return `${BASE_URL}/${src}?w=${width}&q=${quality || 75}`
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

export const getTitleUrl = (title: string, id: string | PostId) => {
    if (!title) return id

    return slugify(`${title} ${id}`, {
        replacement: '-',
        remove: /[*+~.()'"!?:@#]/g,
        lower: true,
        trim: true
    })
}

export const transformCount = (value: number): string => {
    return numeral(value).format('0,0a')
}

export const getSpaceUrl = (handle?: string, spaceId?: string | SpaceId, isComment = false) => {
  if (isComment) {
      return '/comments'
  }

  if (handle) {
      return `/@${handle}`
  }

  return `/${spaceId}`
}

export const loadImgUrl = (cid: string) => {
    return cid ? `https://app.subsocial.network/ipfs/ipfs/${cid}` : ''
}
