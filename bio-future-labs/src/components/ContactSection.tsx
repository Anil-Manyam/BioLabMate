import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Sparkles, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContactBackground from '@/assets/Contact_background.jpg';
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  SERVICE_ID: 'BioLabMate',    
  TEMPLATE_ID: 'template_spiiddk',  
  PUBLIC_KEY: 'f5uPR36gVoN7hNi8L'     
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    show: boolean;
  }>({ message: '', type: 'info', show: false });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const sendEmailJS = async () => {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
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

      console.log('Email sent successfully:', result);
      return { success: true, result };
    } catch (error) {
      console.error('EmailJS failed:', error);
      return { success: false, error };
    }
  };

  const saveToBackend = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    
    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Saved to database');
        return { success: true };
      } else {
        console.warn('Backend save failed');
        return { success: false };
      }
    } catch (error) {
      console.error('Backend error:', error);
      return { success: false };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: '', type: 'info', show: false });

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
        setFeedback({
          message: 'Please fill in all fields.',
          type: 'error',
          show: true
        });
        return;
      }

      const [emailResult, dbResult] = await Promise.all([
        sendEmailJS(),
        saveToBackend()
      ]);

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
          title: "Message sent!",
          description: "Thank you for your interest. We'll get back to you soon.",
        });
        setFeedback({
          message: '✓ Great! Your message has been sent successfully.',
          type: 'success',
          show: true
        });
      } else if (dbResult.success) {
        toast({
          title: "Message received!",
          description: "Your message has been saved. We'll get back to you soon.",
        });
        setFeedback({
          message: '✓ Your message has been received and saved.',
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
          message: '⚠ There was an issue sending your message. Please try again or contact us directly.',
          type: 'error',
          show: true
        });
      }

      if (emailResult.success || dbResult.success) {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => {
          setFeedback(prev => ({ ...prev, show: false }));
        }, 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: ['123 Innovation Drive', 'Sustainability Park', 'Green City, GC 12345'],
      bgColor: 'bg-gradient-to-br from-emerald-100/60 to-teal-100/60',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      accentColor: 'from-emerald-400 to-teal-400'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: ['+1 (555) 123-4567'],
      bgColor: 'bg-gradient-to-br from-amber-100/60 to-yellow-100/60',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      accentColor: 'from-amber-400 to-yellow-400'
    },
    {
      icon: Mail,
      title: 'Email',
      content: ['info@biolabmate.com'],
      bgColor: 'bg-gradient-to-br from-rose-100/60 to-pink-100/60',
      iconColor: 'text-rose-600',
      borderColor: 'border-rose-200',
      accentColor: 'from-rose-400 to-pink-400'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/30 to-amber-50/20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
      </div>

      <div className="absolute top-20 right-10 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-amber-400 rounded-full opacity-50 animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-rose-300 rounded-full opacity-40 animate-pulse animation-delay-2000"></div>

      <div className="absolute top-0 right-0 h-full w-full flex justify-end items-center pointer-events-none z-0">
        <img 
          src={ContactBackground}
          alt="Contact background"
          className="h-4/5 w-auto object-contain opacity-30"
          style={{ objectPosition: 'right', maxWidth: '60%', marginLeft: 'auto', marginTop: '-30px' }}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center space-x-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-100/80 to-amber-100/80 border border-emerald-300/60 backdrop-blur-sm">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Let's Connect</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-emerald-700 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to join the sustainable revolution? Let's discuss how we can work together to make an impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/80 hover:border-emerald-200/60 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
                <h3 className="text-3xl font-bold text-slate-900">Contact Information</h3>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div 
                      key={index}
                      className="group/item p-5 rounded-2xl border border-white/60 bg-gradient-to-br from-white/50 to-white/20 hover:from-white/80 hover:to-white/40 transition-all duration-300 hover:border-white/80 transform hover:translate-x-1 hover:shadow-lg"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${info.bgColor} border ${info.borderColor} flex items-center justify-center group-hover/item:scale-110 transition-all duration-300 shadow-sm`}>
                          <Icon className={`h-6 w-6 ${info.iconColor}`} />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-slate-900 mb-1">{info.title}</h4>
                          <div className="space-y-0.5">
                            {info.content.map((line, i) => (
                              <p key={i} className="text-slate-600 text-sm">{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-emerald-100/50">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Business Hours</h4>
                <div className="space-y-2.5">
                  {[
                    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', time: 'Closed' }
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-emerald-50/60 to-amber-50/40 hover:from-emerald-100/60 hover:to-amber-100/40 transition-colors border border-white/60">
                      <span className="text-slate-700 text-sm font-medium">{schedule.day}</span>
                      <span className="font-semibold text-emerald-700">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col">
            <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/80 hover:border-emerald-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 flex-grow">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-rose-400 rounded-full"></div>
                <h3 className="text-3xl font-bold text-slate-900">Send us a Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
 
                <div className="group/field">
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 group-focus-within/field:text-emerald-700 transition-colors">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 text-base bg-white/80 border-2 border-emerald-100/60 text-slate-900 placeholder:text-slate-400 rounded-xl transition-all duration-300 focus:bg-white focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-200/60 hover:border-emerald-200/80 disabled:opacity-50 focus:shadow-lg shadow-sm"
                  />
                </div>
                <div className="group/field">
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 group-focus-within/field:text-emerald-700 transition-colors">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 text-base bg-white/80 border-2 border-emerald-100/60 text-slate-900 placeholder:text-slate-400 rounded-xl transition-all duration-300 focus:bg-white focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-200/60 hover:border-emerald-200/80 disabled:opacity-50 focus:shadow-lg shadow-sm"
                  />
                </div>

                <div className="group/field">
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 group-focus-within/field:text-amber-700 transition-colors">
                    Mobile Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 text-base bg-white/80 border-2 border-amber-100/60 text-slate-900 placeholder:text-slate-400 rounded-xl transition-all duration-300 focus:bg-white focus:border-amber-400/80 focus:ring-2 focus:ring-amber-200/60 hover:border-amber-200/80 disabled:opacity-50 focus:shadow-lg shadow-sm"
                  />
                </div>

                <div className="group/field">
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 group-focus-within/field:text-rose-700 transition-colors">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full resize-none text-base bg-white/80 border-2 border-rose-100/60 text-slate-900 placeholder:text-slate-400 rounded-xl transition-all duration-300 focus:bg-white focus:border-rose-400/80 focus:ring-2 focus:ring-rose-200/60 hover:border-rose-200/80 disabled:opacity-50 focus:shadow-lg shadow-sm"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group/btn"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
                {feedback.show && (
                  <div className={`p-4 rounded-xl border-2 text-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                    feedback.type === 'success' 
                      ? 'bg-emerald-100/80 text-emerald-900 border-emerald-400/60'
                      : feedback.type === 'error'
                      ? 'bg-rose-100/80 text-rose-900 border-rose-400/60'
                      : 'bg-blue-100/80 text-blue-900 border-blue-400/60'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {feedback.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 mt-0.5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 mt-0.5 text-rose-600 flex-shrink-0" />
                      )}
                      <p className="flex-1">{feedback.message}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default ContactSection;



