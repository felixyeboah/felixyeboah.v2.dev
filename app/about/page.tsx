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
                <section className="lg:py-48">
                    <div className="grid grid-cols-12">
                        <div className="col-span-7"></div>
                        <div className="col-span-4 col-start-8"></div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutPage;
