import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContactBackground from '@/assets/Contact_background.jpg';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent successfully!",
      description: "Thank you for your interest. We'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Background image on the right */}
      <div className="absolute right-0 top-0 bottom-0 z-0 pointer-events-none">
        <img
          src={ContactBackground}
          alt="Contact background"
          className="h-4/5 w-auto object-contain opacity-80"
          style={{ objectPosition: 'right', maxWidth: '70%', marginLeft: 'auto', marginTop: '-30px' }}
        />
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 right-8 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 left-8 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 relative">
            Get In Touch
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full animate-pulse"></div>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to join the sustainable revolution? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Company Info */}
          <Card className="shadow-soft hover:shadow-hover transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-secondary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Company Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-base group-hover:text-primary transition-colors duration-300">Address</h4>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      123 Innovation Drive<br />
                      Sustainability Park<br />
                      Green City, GC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-base group-hover:text-primary transition-colors duration-300">Phone</h4>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-base group-hover:text-primary transition-colors duration-300">Email</h4>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">info@biolabmate.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-accent/30 rounded-2xl border border-border/50 hover:bg-accent/50 transition-all duration-300">
                <h4 className="font-semibold text-foreground mb-3 text-base">Business Hours</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="shadow-soft hover:shadow-hover transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-secondary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-12 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-12 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full resize-none text-base focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 text-base font-semibold transition-all duration-300 shadow-soft hover:shadow-hover hover:scale-105 hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;