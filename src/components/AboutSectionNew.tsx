import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Eye,
  Palette,
  Code,
  Sparkles,
  Heart
} from 'lucide-react';

interface AboutSectionProps {
  role: 'designer' | 'developer';
}

export default function AboutSection({ role }: AboutSectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const craftSteps = [
    {
      title: "Think",
      description: "Research deeply, understand users, and define problems with clarity and empathy.",
      icon: Eye,
      gradient: "from-pink-50 to-rose-50"
    },
    {
      title: "Create", 
      description: "Ideate elegant solutions through wireframes, prototypes, and visual concepts.",
      icon: Palette,
      gradient: "from-rose-50 to-pink-50"
    },
    {
      title: "Build",
      description: "Transform designs into functional experiences using modern technologies.",
      icon: Code,
      gradient: "from-pink-50 to-purple-50"
    },
    {
      title: "Refine",
      description: "Iterate, test, and polish until every detail serves its purpose perfectly.",
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
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-100/40 to-rose-100/40 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Introduction - Apple-inspired clean typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-outfit font-light text-gray-800 mb-8 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            I design experiences that bridge{' '}
            <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
              creativity and technology
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              I'm a designer and developer who believes that the best digital experiences 
              happen when thoughtful design meets precise execution.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto">
              Every project is an opportunity to create something that not only looks beautiful 
              but works flawlessly — bridging the gap between what users need and what technology can deliver.
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
              My Craft
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A disciplined approach to creating digital experiences that matter
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
                className="group relative h-full"
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

        {/* Beyond Design Section */}
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

        {/* Closing Section - Apple-inspired CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="gradient-card border border-pink-100/50 rounded-3xl p-12 md:p-16 max-w-4xl mx-auto 
                        bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 shadow-xl">
            <motion.h2 
              className="text-4xl md:text-5xl font-outfit font-light text-gray-800 mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Let's create something beautiful and functional —{' '}
              <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(245,89,119)] bg-clip-text text-transparent font-medium">
                together
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Whether you're looking to launch a new product, refresh an existing experience, 
              or explore the intersection of design and technology, I'd love to help bring your vision to life.
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
                       text-white px-8 py-4 rounded-full font-outfit font-medium text-lg 
                       hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 
                       focus:outline-none focus:ring-4 focus:ring-pink-500/20 btn-glow"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}