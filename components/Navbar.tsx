"use client";
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, FileText } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    
    if (element) {
      setMobileMenuOpen(false);
      const yOffset = 0;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
    { 
      name: 'Resume', 
      href: '/Ayush_Mehta_Resume.pdf', 
      isDownload: true,
      icon: <FileText size={16} className="mr-1" />
    },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12',
        isScrolled ? 'glass shadow-sm backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#home" 
          className="text-xl font-display font-semibold tracking-tighter text-primary"
        >
          AM
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              download={link.isDownload ? "Ayush_Mehta_Resume.pdf" : undefined}
              className="text-sm font-medium relative py-2 px-1 text-foreground hover:text-primary transition-colors duration-200 group flex items-center"
              onClick={(e) => handleScrollToSection(e, link.href.substring(1))}
            >
              {link.icon}
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-[72px] bg-background/90 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 p-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              download={link.isDownload ? "Ayush_Mehta_Resume.pdf" : undefined}
              className="text-xl font-medium text-foreground hover:text-primary transition-colors duration-200 flex items-center"
              onClick={(e) => handleScrollToSection(e, link.href.substring(1))}
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
