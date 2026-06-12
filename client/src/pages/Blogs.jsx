import { motion } from 'framer-motion'
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi'

const blogs = [
  {
    title: 'The Future of Telemedicine',
    excerpt: 'Explore how virtual consultations are transforming modern healthcare delivery and patient outcomes.',
    category: 'Technology',
    author: 'Dr. Sarah Jenkins',
    date: 'May 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80',
  },
  {
    title: 'Managing Stress in the Digital Age',
    excerpt: 'Practical strategies for maintaining mental wellness while staying connected in our hyper-digital world.',
    category: 'Mental Health',
    author: 'Dr. Mark Peterson',
    date: 'May 18, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500&q=80',
  },
  {
    title: 'Nutrition Facts: Superfoods Explained',
    excerpt: 'Demystifying the science behind superfoods and how to incorporate them into your daily diet.',
    category: 'Diet & Nutrition',
    author: 'Emma Wilson, RD',
    date: 'May 15, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80',
  }
];

const Blogs = () => {
  return (
    <div className="page-top-spacing bg-surface-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Health & Wellness <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Stay updated with the latest medical news, health tips, and expert insights.
            </p>
          </motion.div>
        </div>

        <div className="responsive-card-grid">
          {blogs.map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card border border-gray-100 transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-600">
                  {blog.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <FiUser /> {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock /> {blog.readTime}
                  </div>
                </div>
                <button className="text-primary-600 font-semibold text-sm flex items-center gap-1 hover:text-primary-700 transition-colors">
                  Read Article <FiArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
