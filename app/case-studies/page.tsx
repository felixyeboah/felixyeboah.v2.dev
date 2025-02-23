// Import MDX
import { getAllFilesFrontMatter } from '../libs/mdx';
import { ProjectHeader } from './project-header';
import { ProjectList } from './project-lists';

const CaseStudiesPage = async () => {
    const projects = await getAllFilesFrontMatter('project');

    return (
        <div>
            <ProjectHeader />
            <ProjectList projects={projects} />
        </div>
    );
};

export default CaseStudiesPage;
