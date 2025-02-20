import { NewTweet } from '@/types/tweet';
import { format } from 'date-fns';
import Image from 'next/image';

import VideoPlayer from '../video-player';
import { LikeIcon, ReplyIcon, TwitterLogo } from './Icons';
import {
    ActionIcons,
    Avatar,
    ImageGrid,
    Name,
    SingleImageWrapper,
    TweetWrapper,
} from './tweet-styles';

interface Props {
    tweet: NewTweet;
}

/*
  Note: this is heavily inspired by https://github.com/leerob/leerob.io/blob/main/components/Tweet.js 
*/
const Tweet = (props: Props) => {
    const { tweet } = props;

    if (!tweet || !tweet.user?.id_str) {
        return null;
    }

    const {
        user,
        created_at,
        favorite_count,
        conversation_count,
        reply_count,
        mediaDetails,
        id_str: id,
        text,
        quoted_tweet,
    } = tweet;

    const authorURL = `https://twitter.com/${user.screen_name}`;
    const likeURL = `https://twitter.com/intent/like?tweet_id=${id}`;
    // const retweetURL = `https://twitter.com/intent/retweet?tweet_id=${id}`;
    const replyURL = `https://twitter.com/intent/tweet?in_reply_to=${id}`;
    const tweetURL = `https://twitter.com/${user.screen_name}/status/${id}`;
    const createdAt = new Date(created_at);

    const hasMedia = !!mediaDetails && mediaDetails.length > 0;

    return (
        <TweetWrapper>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Avatar
                        href={authorURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            alt={user.screen_name}
                            height={46}
                            width={46}
                            src={user.profile_image_url_https}
                        />
                    </Avatar>
                    <Name
                        href={authorURL}
                        className="author"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p style={{ lineHeight: '1.5' }}>{user.name}</p>
                        <p style={{ lineHeight: 'initial' }}>
                            @{user.screen_name}
                        </p>
                    </Name>
                </div>
                <a
                    href={tweetURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`@${user.screen_name}'s Twitter profile`}
                >
                    <TwitterLogo />
                </a>
            </div>
            <p
                style={{
                    whiteSpace: 'pre-wrap',
                }}
            >
                {text}
            </p>
            {hasMedia && mediaDetails.length > 1 ? (
                <ImageGrid>
                    {mediaDetails.map((m) => {
                        return (
                            <div
                                key={m.media_url_https}
                                style={{
                                    borderRadius: 'var(--border-radius-1)',
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    alt={text}
                                    layout="intrinsic"
                                    height={m.original_info.height}
                                    width={m.original_info.width}
                                    src={m.media_url_https}
                                />
                            </div>
                        );
                    })}
                </ImageGrid>
            ) : null}
            {hasMedia && mediaDetails.length === 1 ? (
                <SingleImageWrapper>
                    {mediaDetails.map((m) => {
                        if (m.type === 'video' && !!m.video_info) {
                            const lastVariant = m.video_info.variants.reduce(
                                (max, obj) => {
                                    return (obj.bitrate || 0) > max.bitrate
                                        ? obj
                                        : max;
                                },
                                { bitrate: 0 } as any,
                            );

                            const videoSrc = lastVariant.url;

                            if (
                                !videoSrc ||
                                lastVariant.content_type !== 'video/mp4'
                            )
                                return null;

                            return (
                                <VideoPlayer
                                    controls
                                    muted
                                    key={videoSrc}
                                    src={videoSrc}
                                    height={m.original_info.height}
                                    width={m.original_info.width}
                                    poster={m.media_url_https}
                                />
                            );
                        }

                        return (
                            <Image
                                key={m.media_url_https}
                                alt={text}
                                height={m.original_info.height}
                                width={m.original_info.width}
                                src={m.media_url_https}
                                className="rounded-sm"
                            />
                        );
                    })}
                </SingleImageWrapper>
            ) : null}
            {!!quoted_tweet ? <Tweet tweet={{ ...quoted_tweet }} /> : null}
            <div className="flex items-start flex-col gap-2">
                <a href={tweetURL} target="_blank" rel="noopener noreferrer">
                    <time
                        title={`Time Posted: ${createdAt.toUTCString()}`}
                        dateTime={createdAt.toISOString()}
                        suppressHydrationWarning
                    >
                        {format(createdAt, 'h:mm a - MMM d, y')}
                    </time>
                </a>
                <div className="flex">
                    <ActionIcons
                        href={replyURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ReplyIcon />
                        <span>{conversation_count || reply_count}</span>
                    </ActionIcons>
                    {/* <ActionIcons
            href={retweetURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RetweetIcon />
            <span>{public_metrics.retweet_count}</span>
          </ActionIcons> */}
                    <ActionIcons
                        href={likeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LikeIcon />
                        <span>{favorite_count}</span>
                    </ActionIcons>
                </div>
            </div>
        </TweetWrapper>
    );
};

export default Tweet;
