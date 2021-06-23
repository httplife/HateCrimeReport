import { TwitterTimelineEmbed } from 'react-twitter-embed'

export default function Tweets() {
    return <TwitterTimelineEmbed sourceType='profile' screenName='saurabhnemade' options={{ height: 400 }} />
}
