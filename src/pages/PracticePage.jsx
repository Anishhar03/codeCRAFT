import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import CodeEditor from '../components/CodeEditor';
import { Play, RotateCcw, CheckCircle, AlertCircle, Clock, MemoryStick as Memory, User, Github, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import CodeExecutor from '../utils/codeExecutor';
import UserProgressManager from '../utils/userProgress';

const PracticePage = () => {
  const { user } = useUser();
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionStats, setExecutionStats] = useState(null);
  const [userProgress, setUserProgress] = useState(null);

  const languages = [
    { id: 'python', name: 'Python', template: '# Created by: Anish Kumar\n# GitHub: https://github.com/Anishhar03\n# Email: anishharsh1971@gmail.com\n\ndef solution():\n    # Your solution here\n    print("Hello, World!")\n    return "Success"\n\n# Test your solution\nresult = solution()\nprint(f"Result: {result}")' },
    { id: 'javascript', name: 'JavaScript', template: '// Created by: Anish Kumar\n// GitHub: https://github.com/Anishhar03\n// Email: anishharsh1971@gmail.com\n\nfunction solution() {\n    // Your solution here\n    console.log("Hello, World!");\n    return "Success";\n}\n\n// Test your solution\nconst result = solution();\nconsole.log(`Result: ${result}`);' },
    { id: 'java', name: 'Java', template: '// Created by: Anish Kumar\n// GitHub: https://github.com/Anishhar03\n// Email: anishharsh1971@gmail.com\n\npublic class Solution {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String result = sol.solution();\n        System.out.println("Result: " + result);\n    }\n    \n    public String solution() {\n        // Your solution here\n        System.out.println("Hello, World!");\n        return "Success";\n    }\n}' },
    { id: 'cpp', name: 'C++', template: '// Created by: Anish Kumar\n// GitHub: https://github.com/Anishhar03\n// Email: anishharsh1971@gmail.com\n\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string solution() {\n        // Your solution here\n        cout << "Hello, World!" << endl;\n        return "Success";\n    }\n};\n\nint main() {\n    Solution sol;\n    string result = sol.solution();\n    cout << "Result: " << result << endl;\n    return 0;\n}' },
    { id: 'c', name: 'C', template: '// Created by: Anish Kumar\n// GitHub: https://github.com/Anishhar03\n// Email: anishharsh1971@gmail.com\n\n#include <stdio.h>\n#include <string.h>\n\nchar* solution() {\n    // Your solution here\n    printf("Hello, World!\\n");\n    return "Success";\n}\n\nint main() {\n    char* result = solution();\n    printf("Result: %s\\n", result);\n    return 0;\n}' }
  ];

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
      tags: ['Array', 'Hash Table'],
      testCases: [
        { input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]' },
        { input: 'nums = [3,2,4], target = 6', expected: '[1,2]' },
        { input: 'nums = [3,3], target = 6', expected: '[0,1]' }
      ]
    },
    {
      id: 2,
      title: 'Reverse String',
      difficulty: 'Easy',
      description: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
      example: 'Input: s = ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]',
      tags: ['String', 'Two Pointers'],
      testCases: [
        { input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
        { input: 's = ["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' }
      ]
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.',
      example: 'Input: s = "()"\nOutput: true\n\nInput: s = "()[]{}"\nOutput: true\n\nInput: s = "(]"\nOutput: false',
      tags: ['String', 'Stack'],
      testCases: [
        { input: 's = "()"', expected: 'true' },
        { input: 's = "()[]{}"', expected: 'true' },
        { input: 's = "(]"', expected: 'false' }
      ]
    },
    {
      id: 4,
      title: 'Binary Search',
      difficulty: 'Medium',
      description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
      example: 'Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\nExplanation: 9 exists in nums and its index is 4',
      tags: ['Array', 'Binary Search'],
      testCases: [
        { input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4' },
        { input: 'nums = [-1,0,3,5,9,12], target = 2', expected: '-1' }
      ]
    },
    {
      id: 5,
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
      example: 'Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: [4,-1,2,1] has the largest sum = 6.',
      tags: ['Array', 'Dynamic Programming'],
      testCases: [
        { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
        { input: 'nums = [1]', expected: '1' },
        { input: 'nums = [5,4,-1,7,8]', expected: '23' }
      ]
    }
  ];

  useEffect(() => {
    if (user) {
      const progress = UserProgressManager.initializeUser(user.id, {
        name: user.firstName + ' ' + (user.lastName || ''),
        email: user.primaryEmailAddress?.emailAddress,
        avatar: user.imageUrl
      });
      setUserProgress(progress);
    }
  }, [user]);

  useEffect(() => {
    const lang = languages.find(l => l.id === selectedLanguage);
    setCode(lang.template);
    setOutput('');
    setError('');
    setExecutionStats(null);
  }, [selectedLanguage]);

  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId);
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
      const result = await CodeExecutor.executeCode(code, selectedLanguage);
      
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

      // Record execution in user progress
      if (user) {
        UserProgressManager.recordCodeExecution(
          user.id,
          selectedLanguage,
          code,
          result.output,
          result.error
        );
      }

    } catch (err) {
      setError('Execution failed: ' + err.message);
      toast.error('Execution failed!');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {
    if (!code.trim()) {
      toast.error('Please write some code first!');
      return;
    }

    // Simulate submission check
    const isCorrect = Math.random() > 0.3; // 70% success rate for demo
    
    if (user) {
      UserProgressManager.recordProblemAttempt(
        user.id,
        currentProblem.id,
        selectedLanguage,
        code,
        isCorrect
      );
    }

    if (isCorrect) {
      toast.success('🎉 Correct! Problem solved successfully!');
    } else {
      toast.error('❌ Wrong answer. Try again!');
    }
  };

  const handleReset = () => {
    const lang = languages.find(l => l.id === selectedLanguage);
    setCode(lang.template);
    setOutput('');
    setError('');
    setExecutionStats(null);
    toast.success('Code reset to template');
  };

  const currentProblem = problems[selectedProblem];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Practice Coding</h1>
        <p className="text-gray-300 text-lg">Solve problems and improve your programming skills</p>
        
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Problem List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-effect p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Problems</h2>
          <div className="space-y-3">
            {problems.map((problem, index) => (
              <div
                key={problem.id}
                onClick={() => setSelectedProblem(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedProblem === index
                    ? 'bg-purple-600/30 border-2 border-purple-400'
                    : 'learning-card hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{problem.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {problem.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-600/50 text-gray-300 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Problem Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{currentProblem.title}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentProblem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              currentProblem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {currentProblem.difficulty}
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">{currentProblem.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Example</h3>
              <pre className="bg-gray-800/50 p-3 rounded-lg text-sm text-gray-300 overflow-x-auto">
                {currentProblem.example}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Test Cases</h3>
              <div className="space-y-2">
                {currentProblem.testCases.map((testCase, index) => (
                  <div key={index} className="bg-gray-800/30 p-3 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Test Case {index + 1}:</div>
                    <div className="text-sm text-gray-300">Input: {testCase.input}</div>
                    <div className="text-sm text-green-400">Expected: {testCase.expected}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {currentProblem.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Code Editor</h2>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-400 focus:outline-none"
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
              <button
                onClick={handleReset}
                className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                title="Reset Code"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <CodeEditor
              language={selectedLanguage}
              value={code}
              onChange={setCode}
              height="300px"
            />
            
            <div className="flex space-x-3">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
              
              <button 
                onClick={handleSubmit}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Output/Error Display */}
      {(output || error) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <AlertCircle className={`w-6 h-6 ${error ? 'text-red-400' : 'text-green-400'}`} />
              <span>{error ? 'Error' : 'Output'}</span>
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
        </motion.div>
      )}
    </div>
  );
};

export default PracticePage;