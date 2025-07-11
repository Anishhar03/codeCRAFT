import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { Code, BookOpen, Users, Trophy, Clock, Star, ArrowRight, User, Github, Mail } from 'lucide-react';
import UserProgressManager from '../utils/userProgress';

const Dashboard = () => {
  const { user } = useUser();
  const [userStats, setUserStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (user) {
      // Initialize user and get stats
      UserProgressManager.initializeUser(user.id, {
        name: user.firstName + ' ' + (user.lastName || ''),
        email: user.primaryEmailAddress?.emailAddress,
        avatar: user.imageUrl
      });
      
      const stats = UserProgressManager.getUserStats(user.id);
      setUserStats(stats);
      setRecentActivity(stats?.recentActivity || []);
    }
  }, [user]);

  const stats = [
    { 
      label: 'Problems Solved', 
      value: userStats?.totalProblemsSolved || 0, 
      icon: Trophy, 
      color: 'text-yellow-400' 
    },
    { 
      label: 'Hours Coding', 
      value: userStats?.totalHoursCoding || 0, 
      icon: Clock, 
      color: 'text-blue-400' 
    },
    { 
      label: 'Current Streak', 
      value: userStats?.currentStreak || 0, 
      icon: Star, 
      color: 'text-purple-400' 
    },
  ];

  const learningPaths = [
    {
      title: 'Python Fundamentals',
      description: 'Master the basics of Python programming',
      progress: userStats?.languages?.python?.progress || 0,
      lessons: userStats?.languages?.python?.lessonsCompleted || 0,
      totalLessons: 8,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'JavaScript Mastery',
      description: 'Build interactive web applications',
      progress: userStats?.languages?.javascript?.progress || 0,
      lessons: userStats?.languages?.javascript?.lessonsCompleted || 0,
      totalLessons: 8,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Data Structures in C++',
      description: 'Learn efficient algorithms and data structures',
      progress: userStats?.languages?.cpp?.progress || 0,
      lessons: userStats?.languages?.cpp?.lessonsCompleted || 0,
      totalLessons: 8,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'SQL Database Design',
      description: 'Design and query relational databases',
      progress: userStats?.languages?.sql?.progress || 0,
      lessons: userStats?.languages?.sql?.lessonsCompleted || 0,
      totalLessons: 6,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'execution': return Code;
      case 'problem': return Trophy;
      case 'lesson': return BookOpen;
      default: return Star;
    }
  };

  const getActivityColor = (type, success) => {
    if (type === 'execution') return success ? 'bg-green-500' : 'bg-red-500';
    if (type === 'problem') return success ? 'bg-yellow-500' : 'bg-orange-500';
    return 'bg-blue-500';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-300 text-lg">Ready to continue your coding journey?</p>
        
        {/* Creator Info */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm">Created by: Anish Kumar</span>
          </div>
          <div className="flex items-center space-x-2">
            <Github className="w-4 h-4 text-purple-400" />
            <a href="https://github.com/Anishhar03" target="_blank" rel="noopener noreferrer" 
               className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              GitHub
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-purple-400" />
            <a href="mailto:anishharsh1971@gmail.com" 
               className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-10 h-10 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-effect p-6 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/learn"
            className="flex items-center space-x-3 p-4 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-all group"
          >
            <BookOpen className="w-6 h-6 text-purple-400" />
            <span className="text-white font-medium">Continue Learning</span>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/practice"
            className="flex items-center space-x-3 p-4 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-all group"
          >
            <Code className="w-6 h-6 text-blue-400" />
            <span className="text-white font-medium">Practice Coding</span>
            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/collaborate"
            className="flex items-center space-x-3 p-4 rounded-lg bg-green-600/20 hover:bg-green-600/30 transition-all group"
          >
            <Users className="w-6 h-6 text-green-400" />
            <span className="text-white font-medium">Start Collaboration</span>
            <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Learning Paths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-effect p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Learning Paths</h2>
          <Link to="/learn" className="text-purple-400 hover:text-purple-300 transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {learningPaths.map((path, index) => (
            <div key={index} className="learning-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-white">{path.title}</h3>
                <span className="text-sm text-gray-300">{path.lessons}/{path.totalLessons} lessons</span>
              </div>
              <p className="text-gray-300 mb-4">{path.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-white font-medium">{Math.round(path.progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${path.color} transition-all duration-500`}
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-effect p-6 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type, activity.success)}`}></div>
                  <IconComponent className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-gray-300 text-sm">{activity.time}</p>
                  </div>
                  {activity.success && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Code className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No recent activity yet. Start coding to see your progress!</p>
            <Link 
              to="/practice" 
              className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Start Practicing
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;