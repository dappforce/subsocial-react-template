
export const allowEmbedList = [ 'vimeo', 'youtube', 'youtu.be', 'soundcloud' ]

export const getEmbedUrl = (url: string, embed: string | undefined) => {
    if (!embed) return

    const urls: Record<string, string> = {
        vimeo: `https://player.vimeo.com/video/${url.split('/').pop()}`,
        youtube: `https://www.youtube.com/embed/${url.split('=').pop()}`,
        'youtu.be': `https://www.youtube.com/embed/${url.split('/').pop()}`,
        soundcloud: `https://w.soundcloud.com/player/
      ?url=${url}&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`,
    }

    return urls[embed]
}
