import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface Question {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  template: string;
  testCases: Array<{ input: string; expected: string }>;
  url: string;
}

interface DailyChallengeProps {
  question: Question;
  onComplete: () => void;
  onClose: () => void;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ question, onComplete, onClose }) => {
  const [code, setCode] = useState(question.template);
  const [isValid, setIsValid] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; error?: string }>>([]);

  const validateSolution = (code: string) => {
    try {
      const fn = new Function('return ' + code)();
      const results = question.testCases.map(test => {
        try {
          const result = fn(...eval(`[${test.input}]`));
          const passed = JSON.stringify(result) === test.expected;
          return { passed, error: passed ? undefined : `Expected ${test.expected}, got ${JSON.stringify(result)}` };
        } catch (error) {
          return { passed: false, error: error instanceof Error ? error.message : 'Runtime error' };
        }
      });
      
      setTestResults(results);
      setIsValid(results.every(r => r.passed));
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Syntax error';
      setTestResults(question.testCases.map(() => ({ passed: false, error: errorMsg })));
      setIsValid(false);
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    validateSolution(value);
  };

  const handleComplete = () => {
    if (isValid) {
      onComplete();
    }
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-800">{question.title}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {question.difficulty}
            </span>
            <a 
              href={question.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Problem Description */}
          <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Problem</h3>
                <p className="text-gray-600 leading-relaxed">{question.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Test Cases</h3>
                <div className="space-y-3">
                  {question.testCases.map((test, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${
                      testResults[idx] 
                        ? testResults[idx].passed 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-red-200 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm">Test Case {idx + 1}</span>
                        {testResults[idx] && (
                          testResults[idx].passed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )
                        )}
                      </div>
                      <div className="font-mono text-sm space-y-1">
                        <div><span className="text-gray-600">Input:</span> {test.input}</div>
                        <div><span className="text-gray-600">Expected:</span> {test.expected}</div>
                        {testResults[idx] && !testResults[idx].passed && testResults[idx].error && (
                          <div className="text-red-600"><span className="text-gray-600">Error:</span> {testResults[idx].error}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="w-1/2 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium text-gray-800">Solution</h3>
              <div className="flex items-center space-x-2">
                {isValid ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">All tests passed!</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Tests failing</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <CodeMirror
                value={code}
                height="100%"
                theme={vscodeDark}
                extensions={[javascript({ jsx: true })]}
                onChange={handleCodeChange}
                className="text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Complete this challenge to plant a tree in your forest!
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              // disabled={!isValid}
              // className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              //   isValid
              //     ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              //     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              // }`}
              className='px-6 py-2 rounded-lg font-medium transition-colors bg-emerald-500 hover:bg-emerald-600 text-white'
            >
              Plant Tree 🌱
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;