import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { CheckCircle2, XCircle } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, isValid }) => {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        {isValid ? (
          <div className="flex items-center text-green-500">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span className="font-medium">All tests passed!</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <XCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Tests not passing</span>
          </div>
        )}
      </div>
      <CodeMirror
        value={value}
        height="500px"
        theme={vscodeDark}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        className="text-lg"
      />
    </div>
  );
};

export default CodeEditor;