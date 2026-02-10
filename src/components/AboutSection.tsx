import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile, clientFeedback } from '../config/cloudinaryAssets';
import { 
  ArrowRight,
  Eye,
  Palette,
  Code,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import useResponsive from '../hooks/useResponsive';

interface AboutSectionProps {
  role: 'designer' | 'developer';
}

export default function AboutSection({ role }: AboutSectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isMobile, isMdAndDown } = useResponsive();
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Toggle to show/hide Beyond Design section (set to true to re-enable)
  const SHOW_BEYOND_DESIGN = false;

  // Dynamic content based on selected role
  const roleContent = {
    designer: {
      title: "End-to-End Experience Architect",
      subtitle: "with Deep Design Expertise",
      description: "...and you can call me Des. I design complete digital experiences that drive real business results. But here's what makes me different: I also build them. This means your designs aren't just beautiful—they're technically feasible and optimized for performance.",
      highlight: "Design-focused, development-informed",
      processEmphasis: "design and user experience",
      callout: "🎨 Design-focused with development expertise — I create beautiful designs that actually work in code",
      serviceOrder: ['Graphic Design', 'Design + Code Combo', 'Social Media Management', 'Web Development', 'Mobile Apps'],
      highlightedServices: ['Graphic Design', 'Design + Code Combo']
    },
    developer: {
      title: "End-to-End Experience Architect", 
      subtitle: "with Full-Stack Development Power",
      description: "...and you can call me Des. I build scalable, high-performance applications that solve real business problems. But here's my edge: I also design them. This means your applications aren't just functional—they're beautiful, intuitive, and user-centered.",
      highlight: "Development-focused, design-enhanced",
      processEmphasis: "technical architecture and development",
      callout: "💻 Development-focused with design sensibility — I build functional apps that users actually love",
      serviceOrder: ['Web Development', 'Mobile Apps', 'Design + Code Combo', 'Social Media Management', 'Graphic Design'],
      highlightedServices: ['Web Development', 'Design + Code Combo']
    }
  };

  const currentContent = roleContent[role];

  const craftSteps = [
    {
      title: "Strategize",
      description: role === 'designer' 
        ? "Deep user research and design strategy to create experiences that resonate with your audience."
        : "Deep technical analysis and architecture planning to build solutions that scale with your business.",
      icon: Eye,
      gradient: "from-pink-50 to-rose-50"
    },
    {
      title: role === 'designer' ? "Design" : "Architect", 
      description: role === 'designer'
        ? "Craft user experiences that balance aesthetic excellence with conversion optimization and technical feasibility."
        : "Design system architecture that balances performance, scalability, and beautiful user interfaces.",
      icon: role === 'designer' ? Palette : Code,
      gradient: "from-rose-50 to-pink-50"
    },
    {
      title: role === 'designer' ? "Prototype" : "Develop",
      description: role === 'designer'
        ? "Build interactive prototypes and design systems that developers can implement flawlessly."
        : "Build scalable, high-performance solutions using modern technologies and design best practices.",
      icon: role === 'designer' ? Sparkles : Code,
      gradient: "from-pink-50 to-purple-50"
    },
    {
      title: "Deliver",
      description: role === 'designer'
        ? "Launch pixel-perfect designs with ongoing optimization and seamless developer handoff."
        : "Deploy complete solutions with beautiful interfaces and ongoing optimization for maximum business impact.",
      icon: Sparkles,
      gradient: "from-purple-50 to-pink-50"
    }
  ];

  const interests = [
    { title: "Photography", description: "Capturing moments through light and composition", emoji: "📸" },
    { title: "Music", description: "Exploring rhythm and melody in creative work", emoji: "🎵" },
    { title: "Code", description: "Building interactive prototypes and experiments", emoji: "💻" },
    { title: "Reading", description: "Design theory, tech trends, and inspiring stories", emoji: "📚" },
    { title: "Travel", description: "Experiencing global design and culture", emoji: "✈️" }
  ];

  // Suppress unused parameter warning
  console.log('About section for role:', role);

  return (
    <section className="section-padding bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Subtle background elements matching your theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-100/40 to-rose-100/40 rounded-full blur-3xl animate-pulse-soft"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl animate-float"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Introduction - Heading First, Then Photo + Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-32 lg:mb-40"
        >
          {/* Main Heading First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="text-center mb-24 lg:mb-32"
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-outfit font-light text-gray-800 mb-6 leading-[1.2]"
            >
              {currentContent.title}{' '}
              <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                {currentContent.subtitle}
              </span>
            </h1>

            {/* Photo + Name Below */}
          <div className="flex flex-col items-center gap-8 lg:gap-12">
            {/* Professional Photo - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img
                src={profile.formal}
                alt="Desiree Armojallas - Software Developer & UX/UI Designer"
                className="w-72 h-96 md:w-80 md:h-[420px] lg:w-96 lg:h-[500px] rounded-3xl object-cover shadow-2xl shadow-pink-500/30 [mask-image:radial-gradient(ellipse_at_center,black_95%,transparent_100%)]"
              />
            </motion.div>

            {/* Name Introduction - Below Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-light text-gray-700 mb-3">
                I'm{' '}
                <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                  Desiree Armojallas
                </span>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-500 font-light tracking-wide">
                Based in the Philippines PH
              </p>
            </motion.div>
          </div>
        </motion.div>
            
            {/* Description under heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-6 max-w-3xl mx-auto text-center"
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                {currentContent.description}
              </p>
              
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                When design and technology work as one, extraordinary results happen.
              </p>
            </motion.div>
          </motion.div>

          

        {/* My Craft Section - Apple card design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                       rounded-2xl flex items-center justify-center shadow-lg animate-float"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-4">
              My Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From {currentContent.processEmphasis} to final delivery — a proven approach that delivers results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
                className="group relative h-full cursor-pointer"
              >
                <div className={`gradient-card border border-pink-100/50 rounded-2xl p-8 h-full 
                               transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-pink-500/10 
                               hover:-translate-y-2 bg-gradient-to-br ${step.gradient}`}>
                  <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 
                                group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <step.icon className="w-7 h-7 text-[rgb(251,108,133)]" />
                  </div>
                  
                  <h3 className="text-xl font-outfit font-semibold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Apple-style hover indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: activeCard === index ? "100%" : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-0.5 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] mt-4 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Beyond Design Section - Temporarily hidden (toggle SHOW_BEYOND_DESIGN to re-enable) */}
        {SHOW_BEYOND_DESIGN && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-6">
                Beyond Design
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Outside of work, I'm constantly exploring creativity in motion — from coding small UI experiments 
                to composing music and capturing moments through photography. These projects keep my perspective 
                fresh, grounded, and always learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group"
                >
                  <div className="gradient-card border border-pink-100/50 rounded-xl p-6 h-full 
                                hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 
                                bg-gradient-to-br from-white to-pink-50/30">
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {interest.emoji}
                    </div>
                    
                    <h3 className="text-lg font-outfit font-semibold text-gray-800 mb-2">
                      {interest.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Client Testimonials - Premium Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Client Feedback
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Authentic recommendations from professionals I've worked with
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 
                          shadow-xl hover:shadow-2xl transition-all duration-300">
              
              {/* LinkedIn Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#0077B5] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">in</span>
                </div>
                <div>
                  <h3 className="font-outfit font-semibold text-gray-800 text-lg">LinkedIn Recommendation</h3>
                  <p className="text-gray-500 text-sm">Professional endorsement</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-xl leading-relaxed mb-8 italic">
                "It gives me the utmost pleasure to recommend Desiree because we have worked together on the social media content for our company. She is able to take my concepts and turn them into creative, functional designs that speak to our intended audience."
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200/50">
                <img 
                  src={clientFeedback.jochelleTumulak} 
                  alt="Jochelle Tumulak"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-outfit font-semibold text-gray-800">Jochelle Tumulak</p>
                  <p className="text-gray-600 text-sm">Naval Architect and Marine Engineer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Service Tiers - Premium Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              What I Deliver
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              {role === 'designer' 
                ? "End-to-end solutions that transform your brand vision into tangible results"
                : "High-performance digital experiences built to scale your business"
              }
            </motion.p>
          </div>

          {/* Core Services - Interactive Cards */}
          {(() => {
            // Define core premium services
            const coreServices = [
              {
                title: "Graphic Design",
                icon: "🎨",
                tagline: "Elevate your brand with designs that convert and captivate.",
                categories: "Branding • Social Media • Print • Marketing",
                perfect_for: "Brands seeking cohesive visual identity that drives recognition and trust",
                highlight: role === 'designer'
              },
              {
                title: "Design + Code Combo",
                icon: "⚡",
                tagline: "Seamless execution from concept to launch, no handoff friction.",
                categories: "Websites • Apps • Landing Pages • Full-Stack",
                perfect_for: "Businesses wanting pixel-perfect implementation and faster time-to-market",
                highlight: true
              },
              {
                title: "Web Development",
                icon: "💻",
                tagline: "Scalable, high-performance websites built for growth.",
                categories: "Custom Sites • E-commerce • Web Apps • CMS",
                perfect_for: "Companies needing robust digital platforms that handle real-world scale",
                highlight: role === 'developer'
              }
            ];

            // Touch handlers for mobile swipe
            const handleTouchStart = (e: React.TouchEvent) => {
              touchStartX.current = e.touches[0].clientX;
            };

            const handleTouchMove = (e: React.TouchEvent) => {
              touchEndX.current = e.touches[0].clientX;
            };

            const handleTouchEnd = () => {
              if (touchStartX.current - touchEndX.current > 75) {
                // Swipe left
                setCurrentSlide(prev => Math.min(prev + 1, coreServices.length - 1));
              }
              if (touchStartX.current - touchEndX.current < -75) {
                // Swipe right
                setCurrentSlide(prev => Math.max(prev - 1, 0));
              }
            };

            const toggleExpanded = (index: number) => {
              setExpandedService(expandedService === index ? null : index);
            };

            // Desktop/Tablet Grid View
            if (!isMdAndDown) {
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {coreServices.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      viewport={{ once: true }}
                      onClick={() => toggleExpanded(index)}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className={`relative rounded-2xl p-8 border transition-all duration-300 flex flex-col cursor-pointer ${
                        service.highlight 
                          ? 'bg-gradient-to-br from-[rgb(251,108,133)]/5 to-[rgb(245,89,119)]/5 border-[rgb(251,108,133)]/30 shadow-xl' 
                          : 'bg-white/60 backdrop-blur-sm border-gray-200/50 hover:shadow-2xl'
                      } ${expandedService === index ? 'shadow-2xl ring-2 ring-[rgb(251,108,133)]/20' : ''}`}
                    >
                      {service.highlight && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                                         text-white px-4 py-1 rounded-full text-xs font-medium shadow-md">
                            Popular Choice
                          </span>
                        </div>
                      )}
                      
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h3 className="text-2xl font-outfit font-semibold text-gray-800 mb-3">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                        {service.tagline}
                      </p>

                      <AnimatePresence>
                        {expandedService === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mb-4 pb-4 border-b border-gray-200/50">
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {service.categories}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                <span className="font-semibold text-gray-700">Perfect for:</span> {service.perfect_for}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {expandedService !== index && (
                        <div className="mt-auto pt-4">
                          <p className="text-sm text-[rgb(251,108,133)] font-medium">
                            Click to learn more →
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              );
            }

            // Mobile Carousel/Accordion View
            return (
              <div className="max-w-6xl mx-auto">
                {/* Mobile Carousel - Allow overflow for expanded content */}
                <div className="relative">
                  <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-out overflow-visible"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {coreServices.map((service, index) => (
                      <div
                        key={index}
                        className="w-full flex-shrink-0 px-3 sm:px-4 py-2"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          viewport={{ once: true }}
                          onClick={() => toggleExpanded(index)}
                          className={`relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col overflow-visible ${
                            service.highlight 
                              ? 'bg-gradient-to-br from-[rgb(251,108,133)]/5 to-[rgb(245,89,119)]/5 border-[rgb(251,108,133)]/30 shadow-xl' 
                              : 'bg-white/60 backdrop-blur-sm border-gray-200/50'
                          } ${expandedService === index ? 'shadow-2xl ring-2 ring-[rgb(251,108,133)]/20' : ''}`}
                        >
                          {service.highlight && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                              <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                                             text-white px-4 py-1 rounded-full text-xs font-medium shadow-md">
                                Popular Choice
                              </span>
                            </div>
                          )}
                          
                          <div className="text-5xl mb-4">{service.icon}</div>
                          <h3 className="text-xl sm:text-2xl font-outfit font-semibold text-gray-800 mb-3">
                            {service.title}
                          </h3>
                          
                          <p className="text-gray-700 leading-relaxed mb-4 font-medium text-sm sm:text-base">
                            {service.tagline}
                          </p>

                          <AnimatePresence>
                            {expandedService === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-visible"
                              >
                                <div className="mb-4 pb-4 border-b border-gray-200/50">
                                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    {service.categories}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    <span className="font-semibold text-gray-700">Perfect for:</span> {service.perfect_for}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="mt-4 pt-4 border-t border-gray-200/50">
                            <p className="text-xs sm:text-sm text-[rgb(251,108,133)] font-medium text-center">
                              {expandedService === index ? 'Tap to collapse ▲' : 'Tap to expand ▼'}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {currentSlide > 0 && (
                    <button
                      onClick={() => setCurrentSlide(prev => prev - 1)}
                      className="absolute left-1 sm:left-2 top-1/3 -translate-y-1/2 bg-white/90 backdrop-blur-sm 
                               rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 hover:bg-white 
                               transition-all duration-300 z-10"
                      aria-label="Previous service"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                    </button>
                  )}

                  {currentSlide < coreServices.length - 1 && (
                    <button
                      onClick={() => setCurrentSlide(prev => prev + 1)}
                      className="absolute right-1 sm:right-2 top-1/3 -translate-y-1/2 bg-white/90 backdrop-blur-sm 
                               rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 hover:bg-white 
                               transition-all duration-300 z-10"
                      aria-label="Next service"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                    </button>
                  )}
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {coreServices.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? 'w-8 bg-[rgb(251,108,133)]' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

          {/* More Services - Collapsible Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 max-w-6xl mx-auto"
          >
            <button
              onClick={() => setShowMoreServices(!showMoreServices)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 
                       border border-gray-300 rounded-xl hover:bg-gray-50 
                       transition-all duration-300 group"
            >
              <span className="text-gray-700 font-medium">
                {showMoreServices ? 'Show Less Services' : 'View All Services'}
              </span>
              <motion.span
                animate={{ rotate: showMoreServices ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>

            {showMoreServices && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {[
                  {
                    title: "Social Media Management",
                    icon: "📱",
                    tagline: "Build engaged communities that convert followers into customers.",
                    categories: "Strategy • Content • Analytics • Community",
                    perfect_for: "Brands ready to establish authority and drive engagement on social platforms"
                  },
                  {
                    title: "Mobile Apps",
                    icon: "📲",
                    tagline: "Native experiences that users love and businesses rely on.",
                    categories: "iOS • Android • Cross-Platform • Backend",
                    perfect_for: "Companies expanding into mobile-first experiences with professional execution"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="rounded-2xl p-8 border border-gray-200/50 bg-white/60 backdrop-blur-sm 
                             hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-outfit font-semibold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                      {service.tagline}
                    </p>

                    <div className="mb-6 pb-6 border-b border-gray-200/50">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {service.categories}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-700">Perfect for:</span> {service.perfect_for}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Closing Section - Apple-inspired CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="gradient-card border border-pink-100/50 rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto 
                        bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 shadow-xl overflow-visible">
            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Transform your business with{' '}
              <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                design that converts?
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              From startups to established companies, I help businesses increase revenue through strategic design and development. 
              Let's discuss your project and create solutions that drive real results.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] 
                       text-white px-10 py-5 rounded-full font-outfit font-semibold text-xl 
                       hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 
                       focus:outline-none focus:ring-4 focus:ring-pink-500/20 btn-glow cursor-pointer"
            >
              🎯 See My Success Stories
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}