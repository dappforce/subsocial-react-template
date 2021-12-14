import React, { FC, ImgHTMLAttributes } from 'react'

const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ alt, ...props }) =>
    <img {...props} alt={alt}/>

export default Image
