import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import CodeEditor from '../components/CodeEditor';
import { Users, Share2, Play, MessageSquare, Copy, UserPlus, User, Github, Mail, Clock, MemoryStick as Memory } from 'lucide-react';
import toast from 'react-hot-toast';
import CodeExecutor from '../utils/codeExecutor';

const CollaborativePage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState(roomId || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionStats, setExecutionStats] = useState(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
    { id: 'c', name: 'C' },
    { id: 'sql', name: 'SQL' }
  ];

  const codeTemplates = {
    javascript: '// Collaborative Coding Session\n// Created by: Anish Kumar\n// GitHub: https://github.com/Anishhar03\n// Email: anishharsh1971@gmail.com\n\n// Welcome to collaborative coding!\n// Share the room link to invite others\n\nfunction collaborate() {\n    console.log("Hello, collaborators!");\n    console.log("Let\'s code together!");\n    return "Ready to collaborate!";\n}\n\n// Test the function\nconst result = collaborate();\nconsole.log("Result:", result);',
    python: '# Collaborative Coding Session\n# Created by: Anish Kumar\n# GitHub: https://github.com/Anishhar03\n# Email: anishharsh1971@gmail.com\n\n# Welcome to collaborative coding!\n# Share the room link to invite others\n\ndef collaborate():\n    print("Hello, collaborators!")\n    print("Let\'s code together!")\n    return "Ready to collaborate!"\n\n# Test the function\nresult = collaborate()\nprint(f"Result: {result}")',
    java: '// Collaborative Coding Session\n// Created by: Anish Kumar\n// GitHub: https://github.com/Anishhar03\n// Email: anishharsh1971@gmail.com\n\n// Welcome to collaborative coding!\n// Share the room link to invite others\n\npublic class Collaboration {\n    public static void main(String[] args) {\n        Collaboration collab = new Collaboration();\n        String result = collab.collaborate();\n        System.out.println("Result: " + result);\n    }\n    \n    public String collaborate() {\n        System.out.println("Hello, collaborators!");\n        System.out.println("Let\'s code together!");\n        return "Ready to collaborate!";\n    }\n}',
    cpp: '// Collaborative Coding Session\n// Created by: Anish Kumar\n// GitHub: https://github.com/Anishhar03\n// Email: anishharsh1971@gmail.com\n\n// Welcome to collaborative coding!\n// Share the room link to invite others\n\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Collaboration {\npublic:\n    string collaborate() {\n        cout << "Hello, collaborators!" << endl;\n        cout << "Let\'s code together!" << endl;\n        return "Ready to collaborate!";\n    }\n};\n\nint main() {\n    Collaboration collab;\n    string result = collab.collaborate();\n    cout << "Result: " << result << endl;\n    return 0;\n}',
    c: '// Collaborative Coding Session\n// Created by: Anish Kumar\n// GitHub: https://github.com/Anishhar03\n// Email: anishharsh1971@gmail.com\n\n// Welcome to collaborative coding!\n// Share the room link to invite others\n\n#include <stdio.h>\n#include <string.h>\n\nchar* collaborate() {\n    printf("Hello, collaborators!\\n");\n    printf("Let\'s code together!\\n");\n    return "Ready to collaborate!";\n}\n\nint main() {\n    char* result = collaborate();\n    printf("Result: %s\\n", result);\n    return 0;\n}',
    sql: '-- Collaborative Coding Session\n-- Created by: Anish Kumar\n-- GitHub: https://github.com/Anishhar03\n-- Email: anishharsh1971@gmail.com\n\n-- Welcome to collaborative coding!\n-- Share the room link to invite others\n\n-- Let\'s write some SQL together!\nSELECT \'Hello, collaborators!\' as greeting;\nSELECT \'Let\'s code together!\' as message;\nSELECT \'Ready to collaborate!\' as status;'
  };

  useEffect(() => {
    if (!roomId) {
      // Generate a new room ID if none exists
      const newRoomId = Math.random().toString(36).substr(2, 9);
      setCurrentRoomId(newRoomId);
      navigate(`/collaborate/${newRoomId}`, { replace: true });
    } else {
      setCurrentRoomId(roomId);
      // Check if someone is joining via invite link
      checkForInviteJoin(roomId);
    }
    
    // Initialize with current user only
    if (user) {
      setParticipants([
        { 
          id: user.id, 
          name: user.firstName || 'You', 
          avatar: user.imageUrl, 
          isOwner: !roomId, // Owner if creating new room
          joinedAt: new Date().toISOString()
        }
      ]);
    }

    // Set initial code template
    setCode(codeTemplates[language]);

    // Welcome message
    setMessages([
      { 
        id: 1, 
        user: 'System', 
        message: `Welcome to CodeCraft Collaborative Editor! Room: ${roomId || 'new'}`, 
        timestamp: 'now',
        isSystem: true
      }
    ]);

  }, [roomId, navigate, user, language]);

  const checkForInviteJoin = (roomId) => {
    // Simulate checking if this is an invite join
    // In a real app, this would check the server for room existence
    const existingRoom = localStorage.getItem(`room_${roomId}`);
    if (existingRoom && user) {
      const roomData = JSON.parse(existingRoom);
      // Add current user to existing room
      const isAlreadyParticipant = roomData.participants.some(p => p.id === user.id);
      if (!isAlreadyParticipant) {
        const newParticipant = {
          id: user.id,
          name: user.firstName || 'User',
          avatar: user.imageUrl,
          isOwner: false,
          joinedAt: new Date().toISOString()
        };
        roomData.participants.push(newParticipant);
        localStorage.setItem(`room_${roomId}`, JSON.stringify(roomData));
        setParticipants(roomData.participants);
        
        // Add join message
        const joinMessage = {
          id: Date.now(),
          user: 'System',
          message: `${user.firstName || 'Someone'} joined the collaboration!`,
          timestamp: 'just now',
          isSystem: true
        };
        setMessages(prev => [...prev, joinMessage]);
      } else {
        setParticipants(roomData.participants);
      }
      
      // Load existing code if any
      if (roomData.code) {
        setCode(roomData.code);
      }
      if (roomData.language) {
        setLanguage(roomData.language);
      }
    } else {
      // Create new room
      const roomData = {
        id: roomId,
        participants: user ? [{
          id: user.id,
          name: user.firstName || 'You',
          avatar: user.imageUrl,
          isOwner: true,
          joinedAt: new Date().toISOString()
        }] : [],
        code: codeTemplates[language],
        language: language,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(`room_${roomId}`, JSON.stringify(roomData));
    }
  };

  const saveRoomState = () => {
    if (currentRoomId) {
      const roomData = {
        id: currentRoomId,
        participants,
        code,
        language,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(`room_${currentRoomId}`, JSON.stringify(roomData));
    }
  };

  useEffect(() => {
    saveRoomState();
  }, [code, language, participants]);

  const handleInvite = async () => {
    const inviteLink = `${window.location.origin}/collaborate/${currentRoomId}`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success('Invite link copied to clipboard!');
      
      // Add system message about invite
      const newMsg = {
        id: messages.length + 1,
        user: 'System',
        message: `${user?.firstName || 'Someone'} copied the invite link! Share it to collaborate.`,
        timestamp: 'just now',
        isSystem: true
      };
      setMessages(prev => [...prev, newMsg]);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Invite link copied to clipboard!');
      } catch (fallbackErr) {
        toast.error('Failed to copy invite link');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first!');
      return;
    }

    setIsRunning(true);
    setOutput('');
    setError('');
    setExecutionStats(null);

    try {
      const result = await CodeExecutor.executeCode(code, language);
      
      if (result.error) {
        setError(result.error);
        toast.error('Code execution failed!');
      } else {
        setOutput(result.output);
        setExecutionStats({
          executionTime: result.executionTime,
          memoryUsed: result.memoryUsed
        });
        toast.success('Code executed successfully!');
      }

      // Add execution message to chat
      const newMsg = {
        id: messages.length + 1,
        user: user?.firstName || 'You',
        message: `🚀 ${result.error ? 'Code execution failed' : 'Code executed successfully'}`,
        timestamp: 'just now'
      };
      setMessages(prev => [...prev, newMsg]);

    } catch (err) {
      setError('Execution failed: ' + err.message);
      toast.error('Execution failed!');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        user: user?.firstName || 'You',
        message: newMessage,
        timestamp: 'just now'
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage]);
    setOutput('');
    setError('');
    setExecutionStats(null);
    
    // Add language change message
    const newMsg = {
      id: messages.length + 1,
      user: 'System',
      message: `Language changed to ${languages.find(l => l.id === newLanguage)?.name}`,
      timestamp: 'just now',
      isSystem: true
    };
    setMessages(prev => [...prev, newMsg]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-effect p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Collaborative Coding</h1>
            <p className="text-gray-300">Room ID: <span className="font-mono text-purple-400">{currentRoomId}</span></p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">{participants.length} participant{participants.length !== 1 ? 's' : ''}</span>
            </div>
            
            <button
              onClick={handleInvite}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Invite Link</span>
            </button>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10">
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

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3 glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Shared Editor</h2>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-400 focus:outline-none"
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
              
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <CodeEditor
              language={language}
              value={code}
              onChange={setCode}
              height="400px"
            />
            
            {/* Live collaboration indicator */}
            {participants.length > 1 && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-2 bg-green-600/20 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live collaboration active</span>
                </div>
              </div>
            )}
          </div>

          {/* Output/Error Display */}
          {(output || error) && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>{error ? '❌ Error' : '✅ Output'}</span>
                </h3>
                
                {executionStats && (
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{executionStats.executionTime}ms</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Memory className="w-4 h-4" />
                      <span>{executionStats.memoryUsed}MB</span>
                    </div>
                  </div>
                )}
              </div>
              
              <pre className={`p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap ${
                error 
                  ? 'bg-red-900/20 text-red-300 border border-red-500/30' 
                  : 'bg-gray-800/50 text-gray-300'
              }`}>
                {error || output}
              </pre>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Participants */}
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Users className="w-6 h-6 text-purple-400" />
              <span>Participants</span>
            </h3>
            
            <div className="space-y-3">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3">
                  <img
                    src={participant.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                    alt={participant.name}
                    className="w-10 h-10 rounded-full border-2 border-purple-400"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{participant.name}</p>
                    {participant.isOwner && (
                      <p className="text-purple-400 text-sm">Room Owner</p>
                    )}
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              ))}
            </div>
            
            {participants.length === 1 && (
              <div className="mt-4 p-3 bg-blue-600/20 rounded-lg">
                <p className="text-blue-400 text-sm text-center">
                  Share the invite link to collaborate with others!
                </p>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <span>Chat</span>
            </h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium text-sm ${
                      message.isSystem ? 'text-blue-400' : 'text-purple-400'
                    }`}>
                      {message.user}
                    </span>
                    <span className="text-gray-500 text-xs">{message.timestamp}</span>
                  </div>
                  <p className={`text-sm ${
                    message.isSystem ? 'text-blue-300 italic' : 'text-gray-300'
                  }`}>
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CollaborativePage;