import Tag from './Tag'
import styles from './Tag.module.sass'
import { FC } from 'react'
import { TagListProps } from 'src/models/common/tags'

const TagList: FC<TagListProps> = ({tags, className}) => {
    if (!tags || !tags.length) return null
    const classname = className ? `${styles.tags} ${className}` : styles.tags

    return (
        <div className={classname}>
            {tags.map(tag => <Tag label={tag} key={tag}/>)}
        </div>
    )
}

export default TagList
