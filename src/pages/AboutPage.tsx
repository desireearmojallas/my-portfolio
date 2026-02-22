import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Code } from 'lucide-react';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

export default function AboutPage() {
  // Show designer by default, but we'll create a unified view
  const [role] = useState<'designer' | 'developer'>('designer');

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section - Unified Dual Role */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-outfit font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Designer <span className="text-[rgb(251,108,133)]">+</span> Developer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Bridging aesthetics and functionality to create experiences that are both beautiful and performant.
            </motion.p>
          </motion.div>

          {/* Dual Strengths Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20"
          >
            {/* Designer Side */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-200 rounded-2xl p-10 md:p-12 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-[rgb(251,108,133)]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-outfit font-bold text-gray-900">
                  Design
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'UI/UX Design',
                  'Brand Identity',
                  'Graphic Design',
                  'Prototyping & Wireframing',
                  'Design Systems'
                ].map((skill, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="text-gray-700 text-base md:text-lg font-normal"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Developer Side */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-200 rounded-2xl p-10 md:p-12 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-outfit font-bold text-gray-900">
                  Development
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Full-Stack Development',
                  'React & TypeScript',
                  'Node.js & Express',
                  'Database Design',
                  'API Development'
                ].map((skill, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="text-gray-700 text-base md:text-lg font-normal"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* The Advantage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-200 pt-16 text-center"
          >
            <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto font-light italic leading-relaxed">
              As both designer and developer, I bridge aesthetics and functionality—creating solutions that are technically sound and visually compelling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full About Section - Shows comprehensive details */}
      <AboutSection role={role} />
      
      <Footer />
    </div>
  );
}
