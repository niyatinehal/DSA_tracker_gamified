import { User, Question } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  avatar: {
    skinColor: '#f5d0a9',
    hairColor: '#4a2700',
    bodyColor: '#3498db',
    accessory: 'none'
  },
  currentStreak: 5,
  bestStreak: 12,
  treesPlanted: 8,
  totalSolved: 23,
  lastCompletedDate: new Date(Date.now() - 86400000).toDateString(), // Yesterday
  joinDate: '2024-01-15'
};

export const dailyQuestions: Question[] = [
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
      { input: '[2,7,11,15], 9', expected: '[0,1]' },
      { input: '[3,2,4], 6', expected: '[1,2]' },
      { input: '[3,3], 6', expected: '[0,1]' }
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
      { input: '[1,3], [2]', expected: '2.0' },
      { input: '[1,2], [3,4]', expected: '2.5' },
      { input: '[0,0], [0,0]', expected: '0.0' }
    ]
  },
  {
    id: 4,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/valid-parentheses/',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    template: `function isValid(s) {
    // Your code here
    
}`,
    testCases: [
      { input: '"()"', expected: 'true' },
      { input: '"()[]{}"', expected: 'true' },
      { input: '"(]"', expected: 'false' }
    ]
  },
  {
    id: 5,
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
    template: `function inorderTraversal(root) {
    // Your code here
    
}`,
    testCases: [
      { input: '[1,null,2,3]', expected: '[1,3,2]' },
      { input: '[]', expected: '[]' },
      { input: '[1]', expected: '[1]' }
    ]
  }
];