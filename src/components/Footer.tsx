import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Mail,
  Linkedin,
  Github,
  ArrowUp,
  Heart,
  Coffee,
  Sparkles,
} from "lucide-react";
import ContactForm from "./ContactForm";

// Custom Behance icon component to match Lucide styling
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="26" 
    height="26" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
);


export default function Footer() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-20 px-6 relative overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-x-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[rgb(251,108,133)]/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-[rgb(251,108,133)]/10 rounded-full animate-pulse-soft"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-[rgb(251,108,133)]/10 rounded-full animate-bounce-gentle"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Header with sparkle icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div
              className="w-16 h-16 mx-auto bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                          rounded-full flex items-center justify-center animate-float"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-outfit font-semibold mb-6">
            Ready to Start Your{" "}
            <span className="text-[rgb(251,108,133)]">Next Project?</span>
          </h3>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's transform your ideas into stunning designs and powerful applications. 
            Get a free consultation and see how I can help grow your business.
          </p>

          {/* Social Links - Grid Layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <motion.a
              href="mailto:business.desireearmojallas@gmail.com"
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex items-center justify-center space-x-3 text-[rgb(251,108,133)] hover:text-white 
                       transition-all duration-300 bg-white/5 px-6 py-3 rounded-full hover:bg-white/10"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium hidden sm:inline">Email</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/desireearmojallas"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex items-center justify-center space-x-3 text-[rgb(251,108,133)] hover:text-white 
                       transition-all duration-300 bg-white/5 px-6 py-3 rounded-full hover:bg-white/10"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium hidden sm:inline">LinkedIn</span>
            </motion.a>
            <motion.a
              href="https://www.github.com/desireearmojallas"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex items-center justify-center space-x-3 text-[rgb(251,108,133)] hover:text-white 
                       transition-all duration-300 bg-white/5 px-6 py-3 rounded-full hover:bg-white/10"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium hidden sm:inline">GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.behance.net/desireearmojallas"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex items-center justify-center space-x-3 text-[rgb(251,108,133)] hover:text-white 
                       transition-all duration-300 bg-white/5 px-6 py-3 rounded-full hover:bg-white/10"
            >
              <BehanceIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium hidden sm:inline">Behance</span>
            </motion.a>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsContactFormOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                     text-white rounded-full font-medium text-lg btn-glow mb-12
                     focus:outline-none focus:ring-4 focus:ring-[rgb(251,108,133)]/30
                     flex items-center gap-3 mx-auto cursor-pointer shadow-xl"
            type="button"
          >
            <Mail className="w-5 h-5" />
            Start Your Project
          </motion.button>

          {/* Copyright - Responsive */}
          <div className="border-t border-gray-700/50 pt-6 sm:pt-8">
            <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 flex-wrap px-2">
              © 2025 Desiree Armojallas. Made with
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[rgb(251,108,133)] fill-current animate-pulse-soft" />
              and lots of
              <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            </p>
          </div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <ContactForm onClose={() => setIsContactFormOpen(false)} />
        )}
      </AnimatePresence>
    </footer>
  );
}
