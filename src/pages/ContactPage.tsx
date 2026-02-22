import { useState, useRef, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';

// Custom Behance icon
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
);

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    inquiryType: '',
    name: '',
    email: '',
    message: ''
  });
  
  // Form status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form reference for EmailJS
  const formRef = useRef<HTMLFormElement>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      const result = await emailjs.sendForm(
        'service_fsc4j13', 
        'template_ev2e26i',
        formRef.current!,
        'tJTPqoKGDHsim2m8B'
      );

      if (result.text === 'OK') {
        setFormStatus('success');
        // Reset form after success
        setFormData({ 
          inquiryType: '',
          name: '', 
          email: '', 
          message: '' 
        });

        // Reset status after 5 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "hello@desireearmojallas.com",
      link: "mailto:hello@desireearmojallas.com",
      color: "bg-gray-800"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: "LinkedIn",
      value: "Connect with me",
      link: "https://www.linkedin.com/in/desireearmojallas",
      color: "bg-gray-800"
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub",
      value: "Check my code",
      link: "https://github.com/desireearmojallas",
      color: "bg-gray-800"
    },
    {
      icon: <BehanceIcon className="w-6 h-6" />,
      title: "Behance",
      value: "View my designs",
      link: "https://www.behance.net/desireearmojallas",
      color: "bg-gray-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-outfit font-bold text-gray-900 mb-6"
          >
            Let's Create{' '}
            <span className="text-[rgb(251,108,133)]">
              Something Amazing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto font-light"
          >
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-gray-500 mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Based in the Philippines</span>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {formStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-green-50 rounded-2xl border border-green-200"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Message Sent!
              </h4>
              <p className="text-gray-600">
                I'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : formStatus === 'error' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-red-50 rounded-2xl border border-red-200"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Something Went Wrong
              </h4>
              <p className="text-gray-600 mb-4">
                Please try again or email me directly.
              </p>
              <button
                onClick={() => setFormStatus('idle')}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white font-medium transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Project Type */}
              <div>
                <label
                  htmlFor="inquiryType"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Project Type <span className="text-[rgb(251,108,133)]">*</span>
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800 bg-white"
                >
                  <option value="">Select project type...</option>
                  <option value="design-project">Design (Branding, Graphics, UI/UX)</option>
                  <option value="web-development">Web Development (Website, Web App)</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="full-project">Design + Development</option>
                  <option value="consultation">Consultation</option>
                  <option value="interview">Interview</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Name <span className="text-[rgb(251,108,133)]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email <span className="text-[rgb(251,108,133)]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800"
                  placeholder="you@email.com"
                />
              </div>

              {/* Hidden fields for EmailJS template compatibility */}
              <input type="hidden" name="phone" value="" />
              <input type="hidden" name="company" value="" />
              <input type="hidden" name="projectTimeline" value="" />

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message <span className="text-[rgb(251,108,133)]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition resize-none text-gray-800"
                  placeholder="Briefly describe what you need and your goals."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(255,130,150)] 
                        text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl
                        flex items-center justify-center gap-3 cursor-pointer
                        transition-all duration-300 hover:translate-y-[-2px]
                        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
