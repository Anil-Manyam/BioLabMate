import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/Logo.jpg';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const location = useLocation();
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Home', action: () => scrollToSection('hero') },
    { name: 'About', action: () => (window.location.href = '/about') },
    { name: 'Product', action: () => (window.location.href = '/product') },
    { name: 'Blog', action: () => (window.location.href = '/blog') },
    { name: 'Contact', action: () => scrollToSection('contact') },
  ];

  const serviceItems = [
    {
      name: 'Sustainability Calculator',
      action: () => {
        window.location.href = '/sustainability-calculator';
        setIsServiceDropdownOpen(false);
      },
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-1 flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img src={Logo} alt="Company Logo" className="h-10 w-auto" />
              </Link>
            </div>

            <div className="hidden md:flex space-x-10">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </button>

              <button
                onClick={() => (window.location.href = '/about')}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </button>

              <button
                onClick={() => (window.location.href = '/product')}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Product
              </button>


              <button
                onClick={() => (window.location.href = '/blog')}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Blog
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </button>
            </div>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-soft">
              <div className="px-4 py-4 space-y-2">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Home
                </button>

                <button
                  onClick={() => (window.location.href = '/about')}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  About
                </button>

                <button
                  onClick={() => (window.location.href = '/product')}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Product
                </button>

                <button
                  onClick={() => (window.location.href = '/blog')}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Blog
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
