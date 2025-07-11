import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Users, Zap, Star, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Code,
      title: 'Interactive IDE',
      description: 'Write, compile, and run code in multiple programming languages with our built-in editor.'
    },
    {
      icon: BookOpen,
      title: 'Structured Learning',
      description: 'Follow step-by-step pathways designed by experts to master programming concepts.'
    },
    {
      icon: Users,
      title: 'Collaborative Coding',
      description: 'Invite friends and code together in real-time with shared workspaces.'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get immediate results and feedback on your code to accelerate learning.'
    }
  ];

  const languages = [
    { name: 'Python', color: 'bg-blue-500' },
    { name: 'JavaScript', color: 'bg-yellow-500' },
    { name: 'Java', color: 'bg-red-500' },
    { name: 'C++', color: 'bg-green-500' },
    { name: 'SQL', color: 'bg-purple-500' },
    { name: 'C', color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
              Master Code
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Learn programming languages with interactive tutorials, practice in our IDE, 
              and collaborate with fellow developers in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all glow-effect flex items-center space-x-2">
                  <span>Start Learning</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </SignUpButton>
              
              <SignInButton mode="modal">
                <button className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold py-4 px-8 rounded-lg transition-all">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose CodeCraft?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to become a skilled programmer in one platform
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="learning-card p-6 rounded-xl text-center"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Master Multiple Languages</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Practice and perfect your skills across various programming languages
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${lang.color} px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}
              >
                {lang.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect p-12 rounded-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Start Your Journey?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of developers who are already mastering programming with CodeCraft
            </p>
            
            <div className="flex items-center justify-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-300 ml-2">Trusted by 50,000+ developers</span>
            </div>
            
            <SignUpButton mode="modal">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all glow-effect">
                Get Started Free
              </button>
            </SignUpButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;