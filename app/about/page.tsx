import { AboutHeader } from './about-header';
import { FunThings } from './fun-things';
import { PhotosSection } from './photos-section';

const AboutPage = () => {
    return (
        <div className="relative">
            <AboutHeader />
            <main className="container mx-auto lg:pt-44">
                <PhotosSection />
                <FunThings />
                <section className="lg:py-32">
                    <div className="grid grid-cols-12">
                        <div className="col-span-7"></div>
                        <div className="col-span-4 col-start-8">
                            <h3 className="text-3xl underline underline-offset-8">
                                Why work with me?
                            </h3>

                            <div>
                                <div>
                                    <h5></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutPage;
