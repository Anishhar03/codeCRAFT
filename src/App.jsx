import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LearnPage from './pages/LearnPage';
import PracticePage from './pages/PracticePage';
import CollaborativePage from './pages/CollaborativePage';
import './App.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_your_key_here';

function App() {
  // Check if we have a valid Clerk key
  if (!clerkPubKey || clerkPubKey === 'pk_test_your_key_here') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Setup Required</h2>
            <p className="text-gray-300 mb-4">
              To use this application, you need to set up Clerk authentication.
            </p>
            <div className="text-left bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-300 mb-2">Follow these steps:</p>
              <ol className="text-sm text-gray-400 space-y-1">
                <li>1. Create a free account at <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">clerk.com</a></li>
                <li>2. Create a new application</li>
                <li>3. Copy your Publishable Key</li>
                <li>4. Create a <code className="bg-black/40 px-1 rounded">.env</code> file in your project root</li>
                <li>5. Add: <code className="bg-black/40 px-1 rounded text-xs">VITE_CLERK_PUBLISHABLE_KEY=your_key_here</code></li>
              </ol>
            </div>
            <a 
              href="https://dashboard.clerk.com/last-active?path=api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Get Your Clerk Key
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <SignedIn>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/practice" element={<PracticePage />} />
                <Route path="/collaborate/:roomId?" element={<CollaborativePage />} />
              </Routes>
            </main>
          </SignedIn>
          <SignedOut>
            <LandingPage />
          </SignedOut>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;