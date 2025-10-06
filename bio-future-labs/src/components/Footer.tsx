import { Github, Linkedin, Twitter } from 'lucide-react';
import Logo from '@/assets/Logo1.jpg';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="Company Logo" className="h-6 w-auto" />
              <span className="text-2xl font-bold">BioLabMate</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              Pioneering sustainable materials through innovative seaweed-based biodegradable solutions for a cleaner tomorrow.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-background/80 hover:text-primary transition-colors">Home</a></li>
              <li><a href="/about" className="text-background/80 hover:text-primary transition-colors">About</a></li>
              <li><a href="#team" className="text-background/80 hover:text-primary transition-colors">Team</a></li>
              <li><a href="/blog" className="text-background/80 hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-background/80">
              <li>info@biolabmate.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Innovation Drive<br />Green City, GC 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 BioLabMate. All rights reserved. Built with sustainable innovation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;