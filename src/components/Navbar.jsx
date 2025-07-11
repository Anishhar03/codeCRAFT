import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { Code, BookOpen, Users, Home, Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/practice', label: 'Practice', icon: Code },
    { path: '/collaborate', label: 'Collaborate', icon: Users },
  ];

  return (
    <nav className="glass-effect sticky top-0 z-50 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <span className="text-2xl font-bold gradient-text">CodeCraft</span>
        </Link>
        
        <div className="flex items-center space-x-8">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === path
                  ? 'bg-purple-600 text-white glow-effect'
                  : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
          
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 border-2 border-purple-400",
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;