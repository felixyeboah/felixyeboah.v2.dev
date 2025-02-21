import { getFileBySlug } from '@/app/libs/mdx';
import { getTweets } from '@/app/libs/tweets';

import { CaseStudyBody } from '../components/case-study-body';
import { CaseStudyHeader } from '../components/case-study-header';

const CaseStudiesPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const slug = (await params).slug;

    const post = await getFileBySlug(slug, 'project');
    const tweets =
        post.tweetIDs.length > 0 ? await getTweets(post.tweetIDs) : {};

    return (
        <div className="">
            <CaseStudyHeader post={post} />
            <CaseStudyBody post={post} tweets={tweets ?? {}} />
        </div>
    );
};

export default CaseStudiesPage;
