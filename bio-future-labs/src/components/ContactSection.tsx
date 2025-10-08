// import { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { MapPin, Phone, Mail, Send } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import ContactBackground from '@/assets/Contact_background.jpg';

// const ContactSection = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsSubmitting(true);
  
//   // API Base URL from environment variables
//   const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  
//   try {
//     const response = await fetch(`${API_BASE}/contact`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });
    
//     if (response.ok) {
//       const result = await response.json();
//       toast({
//         title: "Message sent successfully!",
//         description: "Thank you for your interest. We'll get back to you soon.",
//       });
//       setFormData({ name: '', email: '', message: '' });
//       console.log('Contact form submitted successfully:', result);
//     } else {
//       const error = await response.json();
//       throw new Error(error.detail || 'Failed to send message');
//     }
//   } catch (error) {
//     console.error('Contact form error:', error);
//     toast({
//       title: "Error sending message",
//       description: "Failed to send message. Please try again or contact us directly.",
//       variant: "destructive",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
//       {/* Background image on the right */}
//       <div className="absolute right-0 top-0 bottom-0 z-0 pointer-events-none">
//         <img
//           src={ContactBackground}
//           alt="Contact background"
//           className="h-4/5 w-auto object-contain opacity-80"
//           style={{ objectPosition: 'right', maxWidth: '70%', marginLeft: 'auto', marginTop: '-30px' }}
//         />
//       </div>
      
//       {/* Background decoration */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-16 right-8 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
//         <div className="absolute bottom-16 left-8 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 relative">
//             Get In Touch
//             <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full animate-pulse"></div>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//             Ready to join the sustainable revolution? Let's discuss how we can work together.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Company Info */}
//           <Card className="shadow-soft hover:shadow-hover transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-secondary/5">
//             <CardContent className="p-8">
//               <h3 className="text-2xl font-bold text-foreground mb-6">
//                 Company Information
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4 group">
//                   <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
//                     <MapPin size={24} />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-foreground mb-2 text-base group-hover:text-primary transition-colors duration-300">Address</h4>
//                     <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
//                       123 Innovation Drive<br />
//                       Sustainability Park<br />
//                       Green City, GC 12345
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4 group">
//                   <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
//                     <Phone size={24} />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-foreground mb-2 text-base group-hover:text-primary transition-colors duration-300">Phone</h4>
//                     <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">+1 (555) 123-4567</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4 group">
//                   <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
//                     <Mail size={24} />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-foreground mb-2 text-base group-hover:text-primary transition-colors duration-300">Email</h4>
//                     <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">info@biolabmate.com</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 p-6 bg-accent/30 rounded-2xl border border-border/50 hover:bg-accent/50 transition-all duration-300">
//                 <h4 className="font-semibold text-foreground mb-3 text-base">Business Hours</h4>
//                 <p className="text-muted-foreground leading-relaxed">
//                   Monday - Friday: 9:00 AM - 6:00 PM<br />
//                   Saturday: 10:00 AM - 4:00 PM<br />
//                   Sunday: Closed
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Contact Form */}
//           <Card className="shadow-soft hover:shadow-hover transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-secondary/5">
//             <CardContent className="p-8">
//               <h3 className="text-2xl font-bold text-foreground mb-6">
//                 Send us a Message
//               </h3>
              
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <Input
//                     name="name"
//                     placeholder="Your Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full h-12 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
//                   />
//                 </div>
                
//                 <div>
//                   <Input
//                     name="email"
//                     type="email"
//                     placeholder="Your Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full h-12 text-base focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
//                   />
//                 </div>
                
//                 <div>
//                   <Textarea
//                     name="message"
//                     placeholder="Your Message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={6}
//                     className="w-full resize-none text-base focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
//                   />
//                 </div>
                
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 text-base font-semibold transition-all duration-300 shadow-soft hover:shadow-hover hover:scale-105 hover:-translate-y-1"
//                 >
//                   {isSubmitting ? (
//                     "Sending..."
//                   ) : (
//                     <>
//                       <Send size={20} className="mr-2" />
//                       Send Message
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;


import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContactBackground from '@/assets/Contact_background.jpg';
import emailjs from '@emailjs/browser';

// EmailJS Configuration - Replace with your actual IDs from EmailJS dashboard
const EMAILJS_CONFIG = {
  SERVICE_ID: 'BioLabMate',    
  TEMPLATE_ID: 'template_spiiddk',  
  PUBLIC_KEY: 'f5uPR36gVoN7hNi8L'     
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    show: boolean;
  }>({ message: '', type: 'info', show: false });
  const { toast } = useToast();

  const sendEmailJS = async () => {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'BioLabMate Team',
        reply_to: formData.email,
        current_date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('✅ Email sent successfully:', result);
      return { success: true, result };
    } catch (error) {
      console.error('❌ EmailJS failed:', error);
      return { success: false, error };
    }
  };

  const saveToBackend = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('✅ Saved to database');
        return { success: true };
      } else {
        console.warn('⚠️ Backend save failed');
        return { success: false };
      }
    } catch (error) {
      console.error('❌ Backend error:', error);
      return { success: false };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: '', type: 'info', show: false });

    try {
      console.log('📤 Submitting contact form...');

      // Validate form
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setFeedback({
          message: 'Please fill in all fields.',
          type: 'error',
          show: true
        });
        return;
      }

      // Try both email and database save simultaneously
      const [emailResult, dbResult] = await Promise.all([
        sendEmailJS(),
        saveToBackend()
      ]);

      // Show toast and feedback based on results
      if (emailResult.success && dbResult.success) {
        toast({
          title: "Perfect! 🎉",
          description: "Your message has been sent and saved successfully. We'll get back to you soon!",
        });
        setFeedback({
          message: '🎉 Perfect! Your message has been sent and saved successfully.',
          type: 'success',
          show: true
        });
      } else if (emailResult.success) {
        toast({
          title: "Message sent! ✅",
          description: "Thank you for your interest. We'll get back to you soon.",
        });
        setFeedback({
          message: '✅ Great! Your message has been sent successfully.',
          type: 'success',
          show: true
        });
      } else if (dbResult.success) {
        toast({
          title: "Message received! 📝",
          description: "Your message has been saved. We'll get back to you soon.",
        });
        setFeedback({
          message: '📝 Your message has been received and saved.',
          type: 'success',
          show: true
        });
      } else {
        toast({
          title: "Error sending message",
          description: "There was an issue. Please try again or contact us directly at info@biolabmate.com",
          variant: "destructive",
        });
        setFeedback({
          message: '⚠️ There was an issue sending your message. Please try again or contact us directly.',
          type: 'error',
          show: true
        });
      }

      // Clear form only on success
      if (emailResult.success || dbResult.success) {
        setFormData({ name: '', email: '', message: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setFeedback(prev => ({ ...prev, show: false }));
        }, 5000);
      }

    } catch (error) {
      console.error('❌ Submission error:', error);
      toast({
        title: "Unexpected error",
        description: "Sorry, there was an unexpected error. Please try again.",
        variant: "destructive",
      });
      setFeedback({
        message: 'Sorry, there was an unexpected error. Please try again.',
        type: 'error',
        show: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Background image on the right */}
      <div className="absolute top-0 right-0 h-full w-full flex justify-end items-center pointer-events-none z-0">
        <img 
          src={ContactBackground}
          alt="Contact background"
          className="h-4/5 w-auto object-contain opacity-80"
          style={{ objectPosition: 'right', maxWidth: '70%', marginLeft: 'auto', marginTop: '-30px' }}
        />
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-0"></div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-slate-50 to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-50/50 to-transparent z-0"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to join the sustainable revolution? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Company Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      123 Innovation Drive<br />
                      Sustainability Park<br />
                      Green City, GC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-600">info@biolabmate.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              {/* EmailJS Setup Warning for Development */}
              {EMAILJS_CONFIG.SERVICE_ID.includes('xxxxxxx') && (
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-orange-800 font-medium">EmailJS Setup Required</p>
                      <p className="text-xs text-orange-600 mt-1">
                        Please update the EmailJS configuration with your actual Service ID, Template ID, and Public Key.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      rows={6}
                      className="w-full resize-none text-base focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>

                  {/* Feedback Message */}
                  {feedback.show && (
                    <div className={`p-4 rounded-lg border text-sm transition-all duration-300 ${
                      feedback.type === 'success' 
                        ? 'bg-green-50 text-green-800 border-green-200'
                        : feedback.type === 'error'
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {feedback.type === 'success' ? (
                          <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 mt-0.5 text-red-600" />
                        )}
                        <p>{feedback.message}</p>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;