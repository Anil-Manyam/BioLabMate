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
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
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
    { name: 'About', action: () => window.location.href = '/about' },
    { name: 'Product', action: () => window.location.href = '/product' },
    { name: 'Blog', action: () => window.location.href = '/blog' },
    { name: 'Contact', action: () => scrollToSection('contact') },
  ];

  const serviceItems = [
    { 
      name: 'Sustainability Calculator', 
      action: () => {
        window.location.href = '/sustainability-calculator';
        setIsServiceDropdownOpen(false);
      }
    },
    // Add more service items here in the future
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Company Name */}
            <div className="flex-1 flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img src={Logo} alt="Company Logo" className="h-10 w-auto" />
                <span className="text-3xl font-bold text-white hover:text-primary-light transition-colors duration-300">BioLabMate</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-10">
              {/* Home */}
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </button>

              {/* About */}
              <button
                onClick={() => window.location.href = '/about'}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </button>

              {/* Product */}
              <button
                onClick={() => window.location.href = '/product'}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Product
              </button>
              
              {/* Service Dropdown */}
              <div className="relative" ref={serviceDropdownRef}>
                <button
                  onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                  onMouseEnter={() => setIsServiceDropdownOpen(true)}
                  className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1"
                >
                  Service
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isServiceDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl py-2 z-50"
                    onMouseLeave={() => setIsServiceDropdownOpen(false)}
                  >
                    {serviceItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.action();
                          setIsServiceDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog */}
              <button
                onClick={() => window.location.href = '/blog'}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Blog
              </button>

              {/* Contact */}
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium text-lg relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary-light after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-soft">
              <div className="px-4 py-4 space-y-2">
                {/* Home */}
                <button
                  onClick={() => scrollToSection('hero')}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Home
                </button>

                {/* About */}
                <button
                  onClick={() => window.location.href = '/about'}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  About
                </button>

                {/* Product */}
                <button
                  onClick={() => window.location.href = '/product'}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Product
                </button>
                
                {/* Mobile Service Section */}
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="px-4 py-2 text-white/70 text-sm font-medium">Service</div>
                  {serviceItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="block w-full text-left px-8 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                {/* Blog */}
                <button
                  onClick={() => window.location.href = '/blog'}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                >
                  Blog
                </button>

                {/* Contact */}
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