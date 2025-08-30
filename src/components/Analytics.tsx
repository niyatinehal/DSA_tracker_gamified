import React, { useEffect, useState } from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { User } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { apiService } from '../services/api';

interface AnalyticsProps {
  user: User;
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [topicStrengths, setTopicStrengths] =useState([]);
  
  // Get auth token from Redux
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:4000/analytics/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch analytics: ${res.statusText}`);
        }

        const data = await res.json();
        setAnalyticsData(data);

        // Uncomment if you want to fetch topic strengths separately
        // const topicRes = await fetch(`/analytics/topic-strengths/${user.id}`, { headers: { Authorization: `Bearer ${token}` } });
        // const topics = await topicRes.json();
        // setTopicStrengths(topics);

      } catch (error) {
        console.warn('Failed to load analytics:', error);
        // fallback logic if needed
      }
    };

    loadAnalytics();
  }, [user.id, token]);
  
  // Calculate analytics based on user data
  //@ts-ignore
  const consistency = analyticsData?.consistency ?? Math.min((user.currentStreak / 30) * 100, 100);
  //@ts-ignore
  const accuracy = analyticsData?.accuracy ?? Math.min(((user.totalSolved / (user.totalSolved + 5)) * 100), 95);
  const weeklyGoal = 7;
  const weeklyProgress = analyticsData?.weeklyGoal.progress ?? Math.min(user.currentStreak, weeklyGoal);

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
          {topicStrengths ? (
            <div className="space-y-2">
              {/* {topicStrengths.map((topic: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-emerald-700">{topic.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    topic.strength === 'Strong' ? 'bg-emerald-200 text-emerald-800' :
                    topic.strength === 'Good' ? 'bg-blue-200 text-blue-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {topic.strength}
                  </span>
                </div>
              ))} */}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;