import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='bg-secondary pt-16 md:pt-32 pb-6'>
      <div className="container mx-auto flex flex-col items-center justify-center gap-8">
        <h1 className='text-[50px] sm:text-[130px] md:text-[170px] lg:text-[205px] text-primary/20 font-bold leading-none text-center font-mono'>
          felix yeboah
        </h1>

        {/* Container for Nav and Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          {/* Navigation Links (Left) */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>

          {/* Copyright (Right) */}
          <div className="text-muted-foreground text-center md:text-right text-sm">
            © {new Date().getFullYear()} Felix Yeboah. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}; 