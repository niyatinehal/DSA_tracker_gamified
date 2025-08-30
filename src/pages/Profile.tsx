import React, { useState } from 'react';
import { Edit3, Calendar, Trophy, Target, Zap } from 'lucide-react';
import AvatarCustomizer from '../components/AvatarCustomizer';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleSaveName = () => {
    onUpdateUser({ ...user, name: editedName });
    setIsEditing(false);
  };

  const handleAvatarSave = (newAvatar: User['avatar']) => {
    onUpdateUser({ ...user, avatar: newAvatar });
    setShowAvatarCustomizer(false);
  };

  const joinDate = new Date(user.joinDate);
  const daysSinceJoined = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full p-4 shadow-lg">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Avatar Body */}
                  <circle cx="100" cy="140" r="40" fill={user.avatar.bodyColor} />
                  
                  {/* Avatar Head */}
                  <circle cx="100" cy="80" r="30" fill={user.avatar.skinColor} />
                  
                  {/* Hair */}
                  <path 
                    d="M70 65 Q100 45 130 65 Q130 50 100 50 Q70 50 70 65" 
                    fill={user.avatar.hairColor} 
                  />
                  
                  {/* Eyes */}
                  <circle cx="90" cy="75" r="3" fill="#333" />
                  <circle cx="110" cy="75" r="3" fill="#333" />
                  
                  {/* Smile */}
                  <path d="M85 85 Q100 95 115 85" stroke="#333" strokeWidth="2" fill="none" />
                  
                  {/* Arms */}
                  <circle cx="65" cy="120" r="12" fill={user.avatar.skinColor} />
                  <circle cx="135" cy="120" r="12" fill={user.avatar.skinColor} />
                  
                  {/* Accessory */}
                  {user.avatar.accessory === 'hat' && (
                    <rect x="85" y="45" width="30" height="15" rx="7" fill="#8B4513" />
                  )}
                  {user.avatar.accessory === 'glasses' && (
                    <>
                      <circle cx="90" cy="75" r="8" fill="none" stroke="#333" strokeWidth="2" />
                      <circle cx="110" cy="75" r="8" fill="none" stroke="#333" strokeWidth="2" />
                      <line x1="98" y1="75" x2="102" y2="75" stroke="#333" strokeWidth="2" />
                    </>
                  )}
                </svg>
              </div>
              
              <button
                onClick={() => setShowAvatarCustomizer(true)}
                className="absolute -bottom-2 -right-2 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-emerald-500 focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => {
                        setEditedName(user.name);
                        setIsEditing(false);
                      }}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {daysSinceJoined} days ago
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{user.currentStreak}</div>
            <div className="text-gray-600 text-sm">Current Streak</div>
            <div className="text-xs text-gray-500 mt-1">days</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{user.bestStreak}</div>
            <div className="text-gray-600 text-sm">Best Streak</div>
            <div className="text-xs text-gray-500 mt-1">days</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Target className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{user.treesPlanted}</div>
            <div className="text-gray-600 text-sm">Trees Planted</div>
            <div className="text-xs text-gray-500 mt-1">problems solved</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{user.totalSolved}</div>
            <div className="text-gray-600 text-sm">Total Solved</div>
            <div className="text-xs text-gray-500 mt-1">all time</div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* First Tree */}
            <div className={`p-4 rounded-lg border-2 ${
              user.treesPlanted >= 1 
                ? 'border-emerald-200 bg-emerald-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">🌱</div>
              <div className="font-medium text-gray-800">First Sprout</div>
              <div className="text-sm text-gray-600">Plant your first tree</div>
            </div>
            
            {/* Week Streak */}
            <div className={`p-4 rounded-lg border-2 ${
              user.bestStreak >= 7 
                ? 'border-orange-200 bg-orange-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">🔥</div>
              <div className="font-medium text-gray-800">Week Warrior</div>
              <div className="text-sm text-gray-600">7-day streak</div>
            </div>
            
            {/* Forest Builder */}
            <div className={`p-4 rounded-lg border-2 ${
              user.treesPlanted >= 10 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">🌲</div>
              <div className="font-medium text-gray-800">Forest Builder</div>
              <div className="text-sm text-gray-600">Plant 10 trees</div>
            </div>
            
            {/* Problem Solver */}
            <div className={`p-4 rounded-lg border-2 ${
              user.totalSolved >= 25 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">🧠</div>
              <div className="font-medium text-gray-800">Problem Solver</div>
              <div className="text-sm text-gray-600">Solve 25 problems</div>
            </div>
            
            {/* Consistency King */}
            <div className={`p-4 rounded-lg border-2 ${
              user.bestStreak >= 30 
                ? 'border-purple-200 bg-purple-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">👑</div>
              <div className="font-medium text-gray-800">Consistency King</div>
              <div className="text-sm text-gray-600">30-day streak</div>
            </div>
            
            {/* Code Master */}
            <div className={`p-4 rounded-lg border-2 ${
              user.totalSolved >= 100 
                ? 'border-yellow-200 bg-yellow-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-medium text-gray-800">Code Master</div>
              <div className="text-sm text-gray-600">Solve 100 problems</div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Customizer Modal */}
      {showAvatarCustomizer && (
        <AvatarCustomizer
          currentAvatar={user.avatar}
          onSave={handleAvatarSave}
          onClose={() => setShowAvatarCustomizer(false)}
        />
      )}
    </div>
  );
};

export default Profile;