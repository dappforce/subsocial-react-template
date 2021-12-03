import { allowEmbedList, getEmbedUrl } from '../utils/embed'
import { EmbedProps } from '../../models/common/embed'

const Embed = ({ link, className }: EmbedProps) => {
    const embed = allowEmbedList.find(embed => link.includes(embed))
    const src = getEmbedUrl(link, embed)

    return <>
        {src && <div
            className={className}
            style={{ paddingBottom: '56.25%', position:'relative', display:'block', width: '100%'}}
        >
            <iframe
                width="100%"
                height="100%"
                src={src}
                frameBorder="0"
                loading='lazy'
                allow='autoplay; encrypted-media; picture-in-picture;'
                allowFullScreen
                title='Embedded'
                style={{ position:'absolute', top:0, left: 0}}
            />
        </div>}
    </>
}

export default Embed
