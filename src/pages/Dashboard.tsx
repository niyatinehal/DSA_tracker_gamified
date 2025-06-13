import React, { useState } from 'react';
import { Calendar, Zap, Target } from 'lucide-react';
import ForestScene from '../components/ForestScene';
import DailyChallenge from '../components/DailyChallenge';
import Analytics from '../components/Analytics';
import { User } from '../types';
import { dailyQuestions } from '../data/mockData';

interface DashboardProps {
  user: User;
  onUpdateProgress: (progress: Partial<User>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateProgress }) => {
  const [showChallenge, setShowChallenge] = useState(false);
  
  // Get today's question (rotate based on day of year)
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const todayQuestion = dailyQuestions[dayOfYear % dailyQuestions.length];
  
  // Check if user has completed today's challenge
  const hasCompletedToday = user.lastCompletedDate === today.toDateString();

  const handleChallengeComplete = () => {
    const newStreak = hasCompletedToday ? user.currentStreak : user.currentStreak + 1;
    
    onUpdateProgress({
      currentStreak: newStreak,
      bestStreak: Math.max(newStreak, user.bestStreak),
      treesPlanted: user.treesPlanted + 1,
      totalSolved: user.totalSolved + 1,
      lastCompletedDate: today.toDateString()
    });
    
    setShowChallenge(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-emerald-800">
            Welcome back, {user.name}! 🌲
          </h1>
          <p className="text-emerald-600 text-lg">
            Your forest is growing beautifully. Ready for today's challenge?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{user.currentStreak}</div>
            <div className="text-gray-600">Day Streak</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Target className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{user.treesPlanted}</div>
            <div className="text-gray-600">Trees Planted</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{user.totalSolved}</div>
            <div className="text-gray-600">Problems Solved</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forest Scene */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Forest</h2>
              <ForestScene user={user} />
            </div>
            
            {/* Daily Challenge Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Today's Challenge</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  todayQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  todayQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {todayQuestion.difficulty}
                </span>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                {todayQuestion.title}
              </h4>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {todayQuestion.description}
              </p>
              
              {hasCompletedToday ? (
                <div className="flex items-center justify-center py-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎉</div>
                    <div className="font-medium text-emerald-800">Challenge Completed!</div>
                    <div className="text-sm text-emerald-600">Come back tomorrow for a new challenge</div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowChallenge(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Start Challenge 🚀
                </button>
              )}
            </div>
          </div>
          
          {/* Analytics Sidebar */}
          <div className="space-y-6">
            <Analytics user={user} />
          </div>
        </div>
      </div>

      {/* Daily Challenge Modal */}
      {showChallenge && (
        <DailyChallenge
          question={todayQuestion}
          onComplete={handleChallengeComplete}
          onClose={() => setShowChallenge(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;