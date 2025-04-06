export default function Home() {

    return (
        <div className="bg-[#232323] bg-cover bg-center relative min-h-screen">
            <div className="absolute inset-0 backdrop-blur-md"></div>
            <main className='relative z-10 flex flex-col justify-between min-h-screen'>
                <div></div>
                <div className="absolute inset-x-0 bottom-0 h-[158px] border-t border-b border-[#393939] flex z-10 bg-[#232323]">
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                    <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                    <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>

                    <div className="flex-1 border-r border-[#393939] relative p-6 flex flex-col justify-end">
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                        <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                        <div className="text-white/80 text-sm leading-relaxed">
                            Designing for a<br />connected world.
                        </div>
                    </div>
                    <div className="flex-1 border-r border-[#393939] relative p-4">
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                        <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                    </div>
                    <div className="flex-1 border-r border-[#393939] relative p-4">
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                        <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                    </div>
                    <div className="flex-1 relative p-4">
                    </div>
                </div>
            </main>
        </div>
    );
}
