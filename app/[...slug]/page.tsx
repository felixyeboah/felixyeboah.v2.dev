import { getFileBySlug } from '../libs/mdx';
import { Header } from './header';

const MdxScreen = async ({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) => {
    const { slug } = await params;
    const path = slug.join('/');
    const page = await getFileBySlug(path as string, 'pages');

    const isDraft = Boolean(page?.frontMatter.draft);
    const isArchived = Boolean(page?.frontMatter.archived);

    console.log('page: ', page);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto">
                <Header page={page} />
            </div>
        </div>
    );
};

export default MdxScreen;
