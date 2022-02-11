import { newLogger, nonEmptyArr, nonEmptyStr, notDef } from "@subsocial/utils";

const log = newLogger('URL helpers')

type Id = string;

export type Cid = string;

export type RoleId = string;

export type HasId = {
  id: Id;
};
export type HasHandle = {
  handle: string;
};
export type HasSpaceIdOrHandle = HasId | HasHandle;

export function slugifyHandle (slug?: string): string | undefined {

  if (slug && !slug.startsWith('@')) {
    slug = '@' + slug
  }

  return slug
}
export function stringifySubUrls (...subUrls: string[]): string {
  if (nonEmptyArr(subUrls)) {
    const res: string[] = [ '' ]
    subUrls.forEach(url => {
      if (nonEmptyStr(url)) {
        if (url.startsWith('/')) {
          url = url.substring(1) // Drop the first '/'
        }
        res.push(url)
      }
    })
    return res.join('/')
  }
  return ''
}

export function spaceIdForUrl(props: HasSpaceIdOrHandle): string {
  const id = (props as HasId).id;
  const handle = (props as HasHandle).handle;

  if (notDef(id) && notDef(handle)) {
    log.warn(`${spaceIdForUrl.name}: Both id and handle are undefined`);
    return '';
  }

  return slugifyHandle(handle) || id;
}

/** /[spaceId] */
 export function spaceUrl (space: HasSpaceIdOrHandle, ...subUrls: string[]): string {
   const idForUrl = spaceIdForUrl(space)
   const ending = stringifySubUrls(...subUrls)
   return '/' + idForUrl + ending
 }
