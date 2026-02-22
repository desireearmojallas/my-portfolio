import { useState, useRef, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Loader, CheckCircle, AlertCircle } from 'lucide-react';
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

        <div className="text-center mb-8">
          <div
            className="w-14 h-14 mx-auto bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
            rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          >
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-outfit font-bold text-gray-800 mb-2">
            Let's Work Together
          </h3>
          <p className="text-gray-600 text-sm">
            Fill out the form below and I'll get back to you within 24 hours.
          </p>
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
            className="text-center py-6"
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
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FBD1D9] cursor-pointer"
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
                Project Type <span className="text-red-500">*</span>
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
                Name <span className="text-red-500">*</span>
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
                Email <span className="text-red-500">*</span>
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

            <input type="hidden" name="phone" value={formData.phone} />
            <input type="hidden" name="company" value={formData.company} />
            <input type="hidden" name="projectTimeline" value={formData.projectTimeline} />

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Message <span className="text-red-500">*</span>
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
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}