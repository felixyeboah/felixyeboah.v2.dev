// Import MDX
import { getAllFilesFrontMatter } from '../libs/mdx';
import { ProjectList } from './components/project-lists';

const CaseStudiesPage = async () => {
    const projects = await getAllFilesFrontMatter('project');

    return (
        <div>
            <header className="page-header flex flex-col items-center justify-center h-[50vh] bg-gray-300">
                <div className="w-3/5 space-y-0">
                    <h1 className="lg:text-[180px] text-center">
                        Case Studies
                    </h1>
                    <p className="text-xl font-medium">
                        Showcasing a diverse array of projects, each
                        meticulously designed to engage and delight users across
                        various platforms and devices. From sleek, minimalist
                        interfaces to dynamic, interactive web applications,
                        every work embodies a commitment to excellence and
                        innovation.
                    </p>
                </div>
            </header>
            <ProjectList projects={projects} />
        </div>
    );
};

export default CaseStudiesPage;
