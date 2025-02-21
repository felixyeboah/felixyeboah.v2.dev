import { AboutHeader } from './components/about-header';
import { FunThings } from './components/fun-things';
import { PhotosSection } from './components/photos-section';

const AboutPage = () => {
    return (
        <div className="relative">
            <AboutHeader />
            <main className="container mx-auto lg:pt-44">
                <PhotosSection />
                <FunThings />
            </main>
        </div>
    );
};

export default AboutPage;
