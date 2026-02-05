import { useState, useRef, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Loader, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Types for form data
interface FormData {
  inquiryType: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectTimeline: string;
  message: string;
}

// Props for the component
interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    inquiryType: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    projectTimeline: '',
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
          phone: '', 
          company: '', 
          projectTimeline: '', 
          message: '' 
        });

        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FBD1D9] cursor-pointer"
          aria-label="Close contact form"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div
            className="w-14 h-14 mx-auto bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
            rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          >
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-outfit font-bold text-gray-800 mb-2">
            Let's Build Something Amazing
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Ready to transform your ideas into reality? Let's discuss your project and see how I can help you achieve your goals.
          </p>
          
          {/* Quick value props */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Quick Response
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Free Consultation
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Professional Service
            </span>
          </div>
        </div>

        {formStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Message Sent Successfully!
            </h4>
            <p className="text-gray-600 mb-2">
              Thank you for reaching out! I've received your inquiry and will get back to you within 24 hours.
            </p>
            <p className="text-sm text-gray-500">
              I'm excited to learn more about your project!
            </p>
          </motion.div>
        ) : formStatus === 'error' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Oops!
            </h4>
            <p className="text-gray-600 mb-4">
              Something went wrong sending your message. Please try again or email me directly at hello@desireearmojallas.com
            </p>
            <button
              onClick={() => setFormStatus('idle')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FBD1D9]"
            >
              Try Again
            </button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {/* Inquiry Type */}
            <div>
              <label
                htmlFor="inquiryType"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                What can I help you with? <span className="text-red-500">*</span>
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800 bg-white"
              >
                <option value="">Select your project type...</option>
                <option value="design-project">Design Project (Branding, Graphics, UI/UX)</option>
                <option value="web-development">Web Development (Website, Web App)</option>
                <option value="mobile-app">Mobile App Development</option>
                <option value="full-project">Complete Project (Design + Development)</option>
                <option value="consultation">Free Consultation</option>
                <option value="interview">Interview Opportunity</option>
                <option value="other">Other (Please specify in message)</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800"
                placeholder="John Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800"
                placeholder="john@company.com"
              />
            </div>
            
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Company/Organization <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800"
                placeholder="Your Company Name"
              />
            </div>

            {/* Project Timeline */}
            <div>
              <label
                htmlFor="projectTimeline"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Project Timeline <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <select
                id="projectTimeline"
                name="projectTimeline"
                value={formData.projectTimeline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition text-gray-800 bg-white"
              >
                <option value="">Select timeline...</option>
                <option value="asap">ASAP (Rush project)</option>
                <option value="1-2weeks">1-2 weeks</option>
                <option value="1month">Within 1 month</option>
                <option value="2-3months">2-3 months</option>
                <option value="flexible">Flexible timeline</option>
                <option value="just-exploring">Just exploring options</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Project Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(251,108,133)] focus:border-[rgb(251,108,133)] outline-none transition resize-none text-gray-800"
                placeholder="Tell me about your project goals, requirements, budget range, or any questions you have. The more details you provide, the better I can help!"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Tip: Include your budget range, specific requirements, and any inspiration or examples
              </p>
            </div>

            {/* Trust indicators */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Usually responds within 24 hours
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Free initial consultation
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                      text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl
                      focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                      flex items-center justify-center gap-3 cursor-pointer
                      transition-all duration-300 hover:translate-y-[-2px]
                      disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Sending Your Message...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Start Your Project Today
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}