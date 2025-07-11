// User Progress Manager - Created by Anish Kumar
// GitHub: https://github.com/Anishhar03
// Email: anishharsh1971@gmail.com

class UserProgressManager {
  constructor() {
    this.storageKey = 'codecraft_user_progress';
    this.sessionKey = 'codecraft_session';
  }

  // Initialize user progress
  initializeUser(userId, userInfo) {
    const existingProgress = this.getUserProgress(userId);
    if (!existingProgress) {
      const initialProgress = {
        userId,
        userInfo,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        totalProblemsAttempted: 0,
        totalProblemsSolved: 0,
        totalHoursCoding: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastLoginDate: new Date().toDateString(),
        languages: {
          python: { progress: 0, lessonsCompleted: 0, timeSpent: 0 },
          javascript: { progress: 0, lessonsCompleted: 0, timeSpent: 0 },
          java: { progress: 0, lessonsCompleted: 0, timeSpent: 0 },
          cpp: { progress: 0, lessonsCompleted: 0, timeSpent: 0 },
          c: { progress: 0, lessonsCompleted: 0, timeSpent: 0 },
          sql: { progress: 0, lessonsCompleted: 0, timeSpent: 0 }
        },
        problemsAttempted: [],
        problemsSolved: [],
        codeHistory: [],
        achievements: [],
        collaborativeSessions: []
      };
      this.saveUserProgress(userId, initialProgress);
      return initialProgress;
    } else {
      // Update last active and check streak
      this.updateLastActive(userId);
      return existingProgress;
    }
  }

  // Get user progress
  getUserProgress(userId) {
    try {
      const allProgress = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
      return allProgress[userId] || null;
    } catch (error) {
      console.error('Error loading user progress:', error);
      return null;
    }
  }

  // Save user progress
  saveUserProgress(userId, progress) {
    try {
      const allProgress = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
      allProgress[userId] = {
        ...progress,
        lastActive: new Date().toISOString()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  }

  // Update language progress
  updateLanguageProgress(userId, language, lessonIndex, timeSpent = 0) {
    const progress = this.getUserProgress(userId);
    if (!progress) return;

    const languageProgress = progress.languages[language];
    if (!languageProgress) return;

    // Update progress based on lesson completion
    const totalLessons = this.getTotalLessons(language);
    const newProgress = Math.min(100, ((lessonIndex + 1) / totalLessons) * 100);
    
    languageProgress.progress = Math.max(languageProgress.progress, newProgress);
    languageProgress.lessonsCompleted = Math.max(languageProgress.lessonsCompleted, lessonIndex + 1);
    languageProgress.timeSpent += timeSpent;

    // Update total hours
    progress.totalHoursCoding += timeSpent / 60; // Convert minutes to hours

    this.saveUserProgress(userId, progress);
  }

  // Record problem attempt
  recordProblemAttempt(userId, problemId, language, code, success = false) {
    const progress = this.getUserProgress(userId);
    if (!progress) return;

    const attempt = {
      problemId,
      language,
      code,
      success,
      timestamp: new Date().toISOString()
    };

    progress.problemsAttempted.push(attempt);
    progress.totalProblemsAttempted++;

    if (success && !progress.problemsSolved.includes(problemId)) {
      progress.problemsSolved.push(problemId);
      progress.totalProblemsSolved++;
    }

    // Update streak
    this.updateStreak(userId, success);

    this.saveUserProgress(userId, progress);
  }

  // Record code execution
  recordCodeExecution(userId, language, code, output, error = null) {
    const progress = this.getUserProgress(userId);
    if (!progress) return;

    const execution = {
      language,
      code,
      output,
      error,
      timestamp: new Date().toISOString()
    };

    progress.codeHistory.push(execution);

    // Keep only last 50 executions
    if (progress.codeHistory.length > 50) {
      progress.codeHistory = progress.codeHistory.slice(-50);
    }

    this.saveUserProgress(userId, progress);
  }

  // Update last active and streak
  updateLastActive(userId) {
    const progress = this.getUserProgress(userId);
    if (!progress) return;

    const today = new Date().toDateString();
    const lastLogin = progress.lastLoginDate;

    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLogin === yesterday.toDateString()) {
        // Consecutive day - increase streak
        progress.currentStreak++;
        progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
      } else {
        // Streak broken
        progress.currentStreak = 1;
      }
      
      progress.lastLoginDate = today;
      this.saveUserProgress(userId, progress);
    }
  }

  // Update streak based on problem solving
  updateStreak(userId, success) {
    const progress = this.getUserProgress(userId);
    if (!progress) return;

    if (success) {
      const today = new Date().toDateString();
      const lastSolveDate = progress.lastSolveDate || '';
      
      if (lastSolveDate !== today) {
        progress.currentStreak++;
        progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
        progress.lastSolveDate = today;
      }
    }

    this.saveUserProgress(userId, progress);
  }

  // Get total lessons for a language
  getTotalLessons(language) {
    const lessonCounts = {
      python: 8,
      javascript: 8,
      java: 8,
      cpp: 8,
      c: 8,
      sql: 6
    };
    return lessonCounts[language] || 8;
  }

  // Get user statistics
  getUserStats(userId) {
    const progress = this.getUserProgress(userId);
    if (!progress) return null;

    return {
      totalProblemsAttempted: progress.totalProblemsAttempted,
      totalProblemsSolved: progress.totalProblemsSolved,
      totalHoursCoding: Math.round(progress.totalHoursCoding * 10) / 10,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      languages: progress.languages,
      recentActivity: this.getRecentActivity(progress),
      achievements: progress.achievements
    };
  }

  // Get recent activity
  getRecentActivity(progress) {
    const activities = [];
    
    // Recent code executions
    progress.codeHistory.slice(-5).forEach(execution => {
      activities.push({
        type: 'execution',
        title: `Executed ${execution.language} code`,
        time: this.getTimeAgo(execution.timestamp),
        success: !execution.error
      });
    });

    // Recent problem attempts
    progress.problemsAttempted.slice(-5).forEach(attempt => {
      activities.push({
        type: 'problem',
        title: `${attempt.success ? 'Solved' : 'Attempted'} Problem #${attempt.problemId}`,
        time: this.getTimeAgo(attempt.timestamp),
        success: attempt.success
      });
    });

    // Sort by timestamp and return latest 10
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  }

  // Get time ago string
  getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  }

  // Clear all data (for testing)
  clearAllData() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.sessionKey);
  }

  // Export user data
  exportUserData(userId) {
    const progress = this.getUserProgress(userId);
    if (!progress) return null;

    return {
      exportDate: new Date().toISOString(),
      userData: progress
    };
  }
}

export default new UserProgressManager();