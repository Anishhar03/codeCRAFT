import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange, height = "400px" }) => {
  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <div className="code-editor">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'Monaco, Menlo, monospace',
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
          guides: {
            indentation: true,
            bracketPairs: true,
          },
          suggest: {
            enabled: true,
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;