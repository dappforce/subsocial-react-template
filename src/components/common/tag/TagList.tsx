import Tag from './Tag'
import styles from './Tag.module.sass'
import { FC } from 'react'
import { TagListProps } from 'src/models/common/tags'

const TagList: FC<TagListProps> = ({ tags, className: inputClassName }) => {
    if (!tags || !tags.length) return null
    const className = inputClassName ? `${styles.tags} ${inputClassName}` : styles.tags

    return (
        <div className={className}>
            {tags.map(tag => <Tag label={tag} key={tag}/>)}
        </div>
    )
}

export default TagList
