import { motion } from 'framer-motion';
import { BookOpen, Coffee, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20 pt-16">
      <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(255,130,150)] rounded-3xl shadow-lg"
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-gray-800 mb-6"
          >
            Blog <span className="bg-gradient-to-r from-[rgb(251,108,133)] to-[rgb(255,130,150)] bg-clip-text text-transparent">Coming Soon</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            I'm working on something special! This space will soon feature insights on design, development, and everything in between.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Design Tips",
                description: "UI/UX best practices and creative inspiration"
              },
              {
                icon: <Coffee className="w-6 h-6" />,
                title: "Dev Insights",
                description: "Code tutorials and technical deep dives"
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Case Studies",
                description: "Behind-the-scenes of real projects"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-[rgb(251,108,133)]">
                  {item.icon}
                </div>
                <h3 className="font-outfit font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 border border-pink-100 rounded-2xl p-8 shadow-lg"
          >
            <p className="text-gray-700 mb-4">
              Want to be notified when I publish my first post?
            </p>
            <p className="text-sm text-gray-500">
              Stay tuned by following me on social media or checking back soon!
            </p>
          </motion.div>
        </motion.div>
      </div>
      </section>
      <Footer />
    </div>
  );
}
