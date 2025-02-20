'use client';

import Tweet from '../tweet/tweet';

interface StaticTweetProps {
    id: string;
    tweets: Record<string, any>;
}

export default function StaticTweet({ id, tweets }: StaticTweetProps) {
    if (!id || !tweets || !tweets[id]) {
        return null;
    }
    return <Tweet tweet={tweets[id]} />;
}
