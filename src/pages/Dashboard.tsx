import React, { useEffect, useState } from 'react';
import { Calendar, Zap, Target } from 'lucide-react';
import ForestScene from '../components/ForestScene';
import DailyChallenge from '../components/DailyChallenge';
import Analytics from '../components/Analytics';
import { User } from '../types';
import { apiService } from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface DashboardProps {
  user: User;
  onUpdateProgress: (progress: Partial<User>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateProgress }) => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [dailyQuestion, setDailyQuestion] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const[users,setUser]=useState(user)
  //for dummy purposes
  const dummyUser={
    "currentStreak":0,
    "totalSolved":0,
    "treesPlanted":0
  }
  const [dummyUserData,setDummyUserData]=useState(dummyUser)
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const userAnalytics = async () => {
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:4000/users/${user.id}/forest`, {
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
        setUser(data);

        // Uncomment if you want to fetch topic strengths separately
        // const topicRes = await fetch(`/analytics/topic-strengths/${user.id}`, { headers: { Authorization: `Bearer ${token}` } });
        // const topics = await topicRes.json();
        // setTopicStrengths(topics);

      } catch (error) {
        console.warn('Failed to load analytics:', error);
        // fallback logic if needed
      }
    };

    userAnalytics();
  }, [user.id, token]);
  
  // Load daily question from API
useEffect(() => {
  // const loadDailyQuestion = async (email: string, password: string) => {
  //     try {
  //       const response = await fetch('http://localhost:4000/', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email, password }),
  //       });
  
  //       if (!response.ok) {
  //         const err = await response.json();
  //         throw new Error(err.message || 'Login failed');
  //       }
  
  //       const res = await response.json();
  //       dispatch(setAuth({ token: res.token, user: res.user }));
  //       navigate('/dashboard');
  //       return res;
  
  //     } catch (error: any) {
  //       throw new Error(error.message || 'Something went wrong during login');
  //     }
  //   };
    const loadDailyQuestion = async () => {
      setIsLoadingQuestion(true);
      try {
        const question = await apiService.getDailyProblem();
        setDailyQuestion(question);
      } catch (error) {
        console.warn('Failed to load daily question:', error);
        // Fallback to mock data
        const { dailyQuestions } = await import('../data/mockData');
        const today = new Date();
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
          //@ts-ignore
        setDailyQuestion(dailyQuestions[dayOfYear % dailyQuestions.length]);
      } finally {
        setIsLoadingQuestion(false);
      }
    };
    loadDailyQuestion();
  }, []);
  
  // Check if user has completed today's challenge
  const today = new Date();
  const hasCompletedToday = user.lastCompletedDate === today.toDateString();

  const handleChallengeComplete = async (code: string) => {
    console.log("CLICKEd")
    setDummyUserData({
      "currentStreak":1,
    "totalSolved":1,
    "treesPlanted":1
    })
    try {
      // Submit solution to API
      if (dailyQuestion) {
          //@ts-ignore
        await apiService.submitSolution(dailyQuestion.id, code);
      }
      
      // Update user progress
      const newStreak = hasCompletedToday ? user.currentStreak : user.currentStreak + 1;
      await onUpdateProgress({
        currentStreak: newStreak,
        bestStreak: Math.max(newStreak, user.bestStreak),
        treesPlanted: user.treesPlanted + 1,
        totalSolved: user.totalSolved + 1,
        lastCompletedDate: today.toDateString()
      });
      
      setShowChallenge(false);
    } catch (error) {
      console.error('Failed to submit solution:', error);
      // Still update progress locally for demo
      const newStreak = hasCompletedToday ? user.currentStreak : user.currentStreak + 1;
      
      await onUpdateProgress({
        currentStreak: newStreak,
        bestStreak: Math.max(newStreak, user.bestStreak),
        treesPlanted: user.treesPlanted + 1,
        totalSolved: user.totalSolved + 1,
        lastCompletedDate: today.toDateString()
      });
      
      setShowChallenge(false);
    }
  };

  console.log("dily questions", dummyUser)

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
            <div className="text-3xl font-bold text-gray-800">{dummyUserData.currentStreak}</div>
            <div className="text-gray-600">Day Streak</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Target className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{dummyUserData.treesPlanted}</div>
            <div className="text-gray-600">Trees Planted</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{dummyUserData.totalSolved}</div>
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
                  {dailyQuestion && dailyQuestion?.map((questions)=>(
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    //@ts-ignore
                      dailyQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      //@ts-ignore
                      dailyQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                    
                      {questions?.difficulty}
                    </span>
                  ))}
                </div>
                
  {isLoadingQuestion ? (
    <div className="flex items-center justify-center py-8">
      <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
    </div>
  ) : dailyQuestion && dailyQuestion.length > 0 ? (
    dailyQuestion.map((question, index) => (
      <div key={index}>
        <h4 className="text-lg font-semibold text-gray-700 mb-2">{question.title}</h4>
        <p className="text-gray-600 mb-4 line-clamp-2">{question.description}</p>
      </div>
    ))
  ) : (
    <div className="text-center py-4">
      <p className="text-gray-500">Unable to load today's challenge</p>
    </div>
  )}
                  {hasCompletedToday ? (
    <div className="flex items-center justify-center py-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <div className="text-center">
        <div className="text-2xl mb-2">🎉</div>
        <div className="font-medium text-emerald-800">Challenge Completed!</div>
        <div className="text-sm text-emerald-600">Come back tomorrow for a new challenge</div>
      </div>
    </div>
  ) : (
    dailyQuestion && dailyQuestion.length > 0 && (
      <button
        onClick={() => setShowChallenge(true)}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Start Challenge 🚀
      </button>
    )
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
{showChallenge && dailyQuestion && dailyQuestion.length > 0 && (
  <DailyChallenge
    question={dailyQuestion[0]}
    onComplete={handleChallengeComplete}
    onClose={() => setShowChallenge(false)}
  />
)}
    </div>
  );
};

export default Dashboard;