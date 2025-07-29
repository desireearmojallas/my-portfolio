import { useState, useRef, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Loader, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Types for form data
interface FormData {
  title: string;
    name: string;
  email: string;
  phone: string;
  message: string;
}

// Props for the component
interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Form status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form reference for EmailJS
  const formRef = useRef<HTMLFormElement>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setFormData({ title: '', name: '', email: '', phone: '', message: '' });

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
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
            className="w-12 h-12 mx-auto bg-gradient-to-r from-[#FBD1D9] to-[rgb(245,89,119)] 
            rounded-full flex items-center justify-center mb-4"
          >
            <Send className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-outfit font-semibold text-gray-800">
            Get In Touch
          </h3>
          <p className="text-gray-600 mt-2">
            I'd love to hear from you! Send me a message and I'll get back to you soon.
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
              Thanks for reaching out. I'll get back to you soon.
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
              Something went wrong. Please try again or email me directly.
            </p>
            <button
              onClick={() => setFormStatus('idle')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FBD1D9]"
            >
              Try Again
            </button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FBD1D9] focus:border-[#FBD1D9] outline-none transition text-gray-800"
                placeholder="Title"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FBD1D9] focus:border-[#FBD1D9] outline-none transition text-gray-800"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FBD1D9] focus:border-[#FBD1D9] outline-none transition text-gray-800"
                placeholder="Your email address"
              />
            </div>
            
            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FBD1D9] focus:border-[#FBD1D9] outline-none transition text-gray-800"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FBD1D9] focus:border-[#FBD1D9] outline-none transition resize-none text-gray-800"
                placeholder="Your message"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-[#FBD1D9] to-[rgb(245,89,119)] 
                      text-white rounded-lg font-medium shadow-md hover:shadow-lg
                      focus:outline-none focus:ring-4 focus:ring-[#FBD1D9]/30
                      flex items-center justify-center gap-2 cursor-pointer
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