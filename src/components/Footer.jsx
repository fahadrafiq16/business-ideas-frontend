import { Link } from 'wouter';
import { Twitter, Lock } from 'lucide-react';
import { FaRedditAlien } from 'react-icons/fa';

import { Input } from './ui/input';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup - just a placeholder for now
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };
  
  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First section - Logo, tagline and social icons */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
              </svg>
              <h1 className="text-2xl font-bold">StartList</h1>
            </div>
            <p className="text-gray-400 mb-4">Discover your next profitable online business idea with our comprehensive list.</p>
          
          </div>
          
          {/* Newsletter signup section */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-primary">Get Weekly Business Ideas</h3>
            <p className="text-gray-300 mb-5">Join our newsletter and receive the latest online business opportunities directly in your inbox.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            
            
            </form>
          </div>
        </div>
        
        {/* Footer links and copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-gray-400 relative">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">About</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
          </div>
          
          <p className="text-center">&copy; {new Date().getFullYear()} StartList. All rights reserved.</p>
          
          <div className="absolute bottom-0 right-4">
            <Link href="/admin/login">
             
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
