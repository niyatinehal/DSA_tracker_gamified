import React, { useState } from 'react';
import TreeGrowthScene from './components/TreeGrowthScene';
import CodeEditor from './components/CodeEditor';
import { Trees as Tree, Droplets, Code, ExternalLink } from 'lucide-react';

const questions = [
  { 
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/two-sum/',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    template: `function twoSum(nums, target) {
    // Your code here
}`,
    testCases: [
      { input: '([2,7,11,15], 9)', expected: '[0,1]' },
      { input: '([3,2,4], 6)', expected: '[1,2]' },
      { input: '([3,3], 6)', expected: '[0,1]' }
    ]
  },
  {
    id: 2,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    template: `function lengthOfLongestSubstring(s) {
    // Your code here
}`,
    testCases: [
      { input: '"abcabcbb"', expected: '3' },
      { input: '"bbbbb"', expected: '1' },
      { input: '"pwwkew"', expected: '3' }
    ]
  },
  {
    id: 3,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    template: `function findMedianSortedArrays(nums1, nums2) {
    // Your code here
}`,
    testCases: [
      { input: '([1,3], [2])', expected: '2.0' },
      { input: '([1,2], [3,4])', expected: '2.5' },
      { input: '([0,0], [0,0])', expected: '0.0' }
    ]
  }
];

function App() {
  const [stage, setStage] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);
  const [code, setCode] = useState(questions[0].template);
  const [isValid, setIsValid] = useState(false);
  
  const currentQuestion = questions[stage];
  
  const validateSolution = (code: string) => {
    try {
      // Create a function from the code string
      const fn = new Function('return ' + code)();
      
      // Test all test cases
      const allTestsPassed = currentQuestion.testCases.every(test => {
        const result = fn(...eval(test.input));
        return JSON.stringify(result) === test.expected;
      });
      
      setIsValid(allTestsPassed);
    } catch (error) {
      setIsValid(false);
    }
  };
  
  const handleCodeChange = (value: string) => {
    setCode(value);
    validateSolution(value);
  };
  
  const advanceTree = () => {
    if (stage < 3 && isValid) {
      setStage(prev => prev + 1);
      setQuestionsCompleted(prev => prev + 1);
      if (stage < 2) {
        setCode(questions[stage + 1].template);
      }
      setIsValid(false);
    }
  };
  
  const resetTree = () => {
    setStage(0);
    setQuestionsCompleted(0);
    setCode(questions[0].template);
    setIsValid(false);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-emerald-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            <Tree className="inline-block mr-2" /> 
            DSA Tree Growth
          </h1>
          <p className="text-emerald-700">
            Solve coding challenges to grow your knowledge tree!
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <TreeGrowthScene stage={stage} />
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Growth Progress
                  </h2>
                  <p className="text-gray-600">
                    {questionsCompleted} challenges completed
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={advanceTree}
                    disabled={!isValid || stage >= 3}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                  >
                    <Droplets className="mr-2 h-5 w-5" />
                    Complete Challenge
                  </button>
                  
                  <button 
                    onClick={resetTree}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(stage / 3) * 100}%` }}
                ></div>
              </div>
              
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <h3 className="font-medium text-emerald-800 mb-2">
                  Growth Stages
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {questions.map((q, idx) => (
                    <li 
                      key={idx}
                      className={`flex items-center p-2 rounded ${
                        idx <= stage ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span className="mr-2 text-lg">
                        {idx <= stage ? '✓' : idx === stage + 1 ? '→' : '○'}
                      </span>
                      <span>{q.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Code className="mr-2" />
                    {currentQuestion.title}
                  </h2>
                  <p className={`${getDifficultyColor(currentQuestion.difficulty)} font-medium`}>
                    {currentQuestion.difficulty}
                  </p>
                </div>
                <a 
                  href={currentQuestion.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  View on LeetCode
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
              <p className="text-gray-600 mb-4">
                {currentQuestion.description}
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-2">Test Cases:</h3>
                <ul className="space-y-2">
                  {currentQuestion.testCases.map((test, idx) => (
                    <li key={idx} className="text-sm font-mono">
                      Input: {test.input} → Expected: {test.expected}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <CodeEditor 
              value={code}
              onChange={handleCodeChange}
              isValid={isValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;