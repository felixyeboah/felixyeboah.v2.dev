import { getFileBySlug } from '@/app/libs/mdx';
import { getTweets } from '@/app/libs/tweets';

import { CaseStudyBody } from '../components/case-study-body';
import { CaseStudyHeader } from '../components/case-study-header';

interface PageProps {
    params: {
        slug: string;
    };
}

const CaseStudiesPage = async ({ params }: PageProps) => {
    const post = await getFileBySlug(params!.slug as string, 'project');
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
