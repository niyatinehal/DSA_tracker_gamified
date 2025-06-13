import React, { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../types';

interface AvatarCustomizerProps {
  currentAvatar: User['avatar'];
  onSave: (avatar: User['avatar']) => void;
  onClose: () => void;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ currentAvatar, onSave, onClose }) => {
  const [avatar, setAvatar] = useState(currentAvatar);

  const skinColors = ['#f5d0a9', '#e8b894', '#d4a574', '#c19660', '#a67c52'];
  const hairColors = ['#4a2700', '#8b4513', '#daa520', '#ff6347', '#9370db'];
  const bodyColors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
  const accessories = ['none', 'hat', 'glasses'];

  const handleSave = () => {
    onSave(avatar);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Customize Avatar</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Avatar Preview */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Avatar Body */}
                <circle cx="100" cy="140" r="40" fill={avatar.bodyColor} />
                
                {/* Avatar Head */}
                <circle cx="100" cy="80" r="30" fill={avatar.skinColor} />
                
                {/* Hair */}
                <path 
                  d="M70 65 Q100 45 130 65 Q130 50 100 50 Q70 50 70 65" 
                  fill={avatar.hairColor} 
                />
                
                {/* Eyes */}
                <circle cx="90" cy="75" r="3" fill="#333" />
                <circle cx="110" cy="75" r="3" fill="#333" />
                
                {/* Smile */}
                <path d="M85 85 Q100 95 115 85" stroke="#333" strokeWidth="2" fill="none" />
                
                {/* Arms */}
                <circle cx="65" cy="120" r="12" fill={avatar.skinColor} />
                <circle cx="135" cy="120" r="12" fill={avatar.skinColor} />
                
                {/* Accessory */}
                {avatar.accessory === 'hat' && (
                  <rect x="85" y="45" width="30" height="15" rx="7" fill="#8B4513" />
                )}
                {avatar.accessory === 'glasses' && (
                  <>
                    <circle cx="90" cy="75" r="8" fill="none" stroke="#333" strokeWidth="2" />
                    <circle cx="110" cy="75" r="8" fill="none" stroke="#333" strokeWidth="2" />
                    <line x1="98" y1="75" x2="102" y2="75" stroke="#333" strokeWidth="2" />
                  </>
                )}
              </svg>
            </div>
          </div>
          
          {/* Skin Color */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Skin Color</h3>
            <div className="flex space-x-2">
              {skinColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setAvatar({ ...avatar, skinColor: color })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    avatar.skinColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          {/* Hair Color */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Hair Color</h3>
            <div className="flex space-x-2">
              {hairColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setAvatar({ ...avatar, hairColor: color })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    avatar.hairColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          {/* Body Color */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Shirt Color</h3>
            <div className="flex space-x-2">
              {bodyColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setAvatar({ ...avatar, bodyColor: color })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    avatar.bodyColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          {/* Accessories */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Accessories</h3>
            <div className="grid grid-cols-3 gap-2">
              {accessories.map((accessory) => (
                <button
                  key={accessory}
                  onClick={() => setAvatar({ ...avatar, accessory: accessory as any })}
                  className={`p-3 rounded-lg border-2 transition-all capitalize ${
                    avatar.accessory === accessory 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {accessory}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
          >
            Save Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizer;