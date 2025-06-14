import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { User } from '../types';

interface AnalyticsProps {
  user: User;
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  // Calculate analytics based on user data
  const consistency = Math.min((user.currentStreak / 30) * 100, 100);
  const accuracy = Math.min(((user.totalSolved / (user.totalSolved + 5)) * 100), 95); // Mock accuracy
  const weeklyGoal = 7;
  const weeklyProgress = Math.min(user.currentStreak, weeklyGoal);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-purple-600 mr-3" />
        <h3 className="text-lg font-bold text-gray-800">AI Analytics</h3>
      </div>
      
      <div className="space-y-6">
        {/* Consistency Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-emerald-600 mr-2" />
              <span className="font-medium text-gray-700">Consistency</span>
            </div>
            <span className="text-sm font-bold text-emerald-600">{Math.round(consistency)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${consistency}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {user.currentStreak} day streak • Keep it up!
          </p>
        </div>
        
        {/* Accuracy Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Target className="h-4 w-4 text-blue-600 mr-2" />
              <span className="font-medium text-gray-700">Accuracy</span>
            </div>
            <span className="text-sm font-bold text-blue-600">{Math.round(accuracy)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Great problem-solving skills!
          </p>
        </div>
        
        {/* Weekly Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Award className="h-4 w-4 text-purple-600 mr-2" />
              <span className="font-medium text-gray-700">Weekly Goal</span>
            </div>
            <span className="text-sm font-bold text-purple-600">{weeklyProgress}/{weeklyGoal}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(weeklyProgress / weeklyGoal) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {weeklyGoal - weeklyProgress > 0 
              ? `${weeklyGoal - weeklyProgress} more to reach your goal`
              : 'Goal achieved! 🎉'
            }
          </p>
        </div>
        
        {/* AI Insights */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100">
          <h4 className="font-medium text-purple-800 mb-2">💡 AI Insight</h4>
          <p className="text-sm text-purple-700">
            {user.currentStreak >= 7 
              ? "Excellent consistency! Your problem-solving skills are improving steadily."
              : user.currentStreak >= 3
              ? "Good momentum! Try to maintain your streak for better retention."
              : "Start building a consistent habit. Even 10 minutes daily makes a difference!"
            }
          </p>
        </div>
        
        {/* Topic Recommendations */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
          <h4 className="font-medium text-emerald-800 mb-2">📚 Recommended Focus</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-700">Arrays & Strings</span>
              <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full">Strong</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-700">Dynamic Programming</span>
              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Practice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;