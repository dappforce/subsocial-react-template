import { avatar, img } from '../assets'
import { NotificationsItemProps } from '../models/notifications'

export const users = [
    {
        id: '1',
        username: 'Savannah Nguyen',
        address: 'zxskwsbwsbwjksdddd',
        isFollowing: false
    }, {
        id: '2',
        username: 'Devon Lane',
        address: 'zxskwsb...wsbwjks',
        isFollowing: true
    }, {
        id: '3',
        username: 'Jerome Bell',
        address: 'zxskwsb...wsbwjks',
        isFollowing: false
    }, {
        id: '4',
        username: 'Jerome Bell',
        address: 'zxskwsb...wsbwjks',
        isFollowing: false
    }, {
        id: '5',
        username: 'Jerome Bell',
        address: 'zxskwsb...wsbwjks',
        isFollowing: false
    }, {
        id: '6',
        username: 'Jerome Bell',
        address: 'zxskwsb...wsbwjks',
        isFollowing: false
    }, {
        id: '7',
        username: 'Jerome Bell',
        address: 'zxskwsb...wsbwjks',
        isFollowing: false
    }
]

export const notifications: NotificationsItemProps[] = [
    {
        id: '1',
        ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
        image: img,
        ownerName: 'Jane Cooper',
        ownerImg: avatar,
        subject: 'First meme',
        action: 'commented on the post',
        spaceName: 'Subsocial',
        date: 'Sep 14, 2021 4:56 PM',
        link: '/'
    }, {
        id: '2',
        ownerName: 'Young Beef',
        ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
        ownerImg: avatar,
        subject: 'Introducing Sub ID: The One Stop Shop For All Your Substack fdwaf awfa wfa wf a awfaw awd awffwf',
        action: 'shared the post',
        spaceName: 'Subsocial',
        date: 'Sep 14, 2021 4:56 PM',
        link: '/'
    }, {
        id: '3',
        image: img,
        ownerName: 'Jane Cooper',
        ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
        ownerImg: avatar,
        subject: 'Young Beef',
        action: 'followed the account',
        spaceName: 'Subsocial',
        date: 'Sep 14, 2021 4:56 PM',
        link: '/'
    }, {
        id: '4',
        image: img,
        ownerName: 'Jane Cooper',
        ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
        ownerImg: avatar,
        subject: 'PolkaWarriors',
        action: 'followed the space',
        spaceName: 'Subsocial',
        date: 'Sep 14, 2021 4:56 PM',
        link: '/'
    }, {
        id: '5',
        image: img,
        ownerName: 'Jane Cooper',
        ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',

        ownerImg: avatar,
        subject: 'PolkaWarriors',
        action: 'created the space',
        spaceName: 'Subsocial',
        date: 'Sep 14, 2021 4:56 PM',
        link: '/'
    }, {
        id: '6',
        image: img,
        ownerName: 'Jane Cooper',
        ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',

        ownerImg: avatar,
        subject: 'Post',
        action: 'created the post',
        spaceName: 'Subsocial',
        date: 'Sep 14, 2021 4:56 PM',
        link: '/'
    },
]
