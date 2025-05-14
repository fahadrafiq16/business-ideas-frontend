import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Hero({ onSearch }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("You're in! Look out for our next email with fresh business ideas.");
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-20">
      <div className="container mx-auto px-4">
        <Toaster position="top-right" /> {/* You can move this to your _app.jsx or main layout */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect1 Online Business</h1>
          <p className="text-xl opacity-90 mb-4">Discover profitable business ideas before everyone else</p>

          <div className="mb-8 mx-auto">
            <p className="text-lg font-medium mb-3 text-center">✉️ Join 5,000+ entrepreneurs who get:</p>
            <ul className="space-y-4 mb-3 max-w-lg mx-auto">
              <li className="flex items-start">
                <span className="text-white bg-green-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 font-bold text-sm mt-0.5">✓</span>
                <span>Weekly business ideas with profit margins &amp; startup costs</span>
              </li>
              <li className="flex items-start">
                <span className="text-white bg-green-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 font-bold text-sm mt-0.5">✓</span>
                <span>Detailed case studies of successful online businesses</span>
              </li>
              <li className="flex items-start">
                <span className="text-white bg-green-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 font-bold text-sm mt-0.5">✓</span>
                <span><span className="font-bold">100% free</span> - just 2 emails per week, unsubscribe anytime</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-2 md:p-3 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg md:rounded-r-none text-gray-700 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute left-3 top-3 text-gray-400">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg md:rounded-l-none font-medium transition-colors mt-2 md:mt-0 disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Get Free Business Ideas'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
