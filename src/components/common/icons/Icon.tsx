import { FC } from 'react'
import Image from 'next/image'
import { ImageProps } from 'next/dist/client/image'
import { myLoader } from 'src/utils'

const Icon: FC<ImageProps> = ({...props}) => {
    return <Image {...props} alt={'icon'} loader={myLoader}/>
}

export default Icon
