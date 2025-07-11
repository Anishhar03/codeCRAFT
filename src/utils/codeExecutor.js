// Code Execution Engine - Created by Anish Kumar
// GitHub: https://github.com/Anishhar03
// Email: anishharsh1971@gmail.com

class CodeExecutor {
  constructor() {
    this.executionHistory = [];
  }

  async executeCode(code, language, input = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const result = this.simulateExecution(code, language, input);
          this.executionHistory.push({
            code,
            language,
            input,
            output: result.output,
            error: result.error,
            timestamp: new Date().toISOString()
          });
          resolve(result);
        } catch (error) {
          resolve({
            output: '',
            error: error.message,
            executionTime: 0,
            memoryUsed: 0
          });
        }
      }, Math.random() * 1000 + 500); // Realistic execution delay
    });
  }

  simulateExecution(code, language, input) {
    const executionTime = Math.floor(Math.random() * 100) + 10;
    const memoryUsed = Math.floor(Math.random() * 50) + 10;

    // Check for common errors
    if (this.hasCompilationError(code, language)) {
      return {
        output: '',
        error: this.getCompilationError(code, language),
        executionTime: 0,
        memoryUsed: 0
      };
    }

    // Generate realistic output based on code content
    const output = this.generateOutput(code, language, input);
    
    return {
      output,
      error: null,
      executionTime,
      memoryUsed
    };
  }

  hasCompilationError(code, language) {
    const commonErrors = {
      python: [
        { pattern: /print\([^)]*[^)]\s*$/, error: 'SyntaxError: unexpected EOF while parsing' },
        { pattern: /def\s+\w+\([^)]*\):\s*$/, error: 'IndentationError: expected an indented block' },
        { pattern: /if\s+.*:\s*$/, error: 'IndentationError: expected an indented block' }
      ],
      javascript: [
        { pattern: /console\.log\([^)]*[^)]\s*$/, error: 'SyntaxError: missing ) after argument list' },
        { pattern: /function\s+\w+\([^)]*\)\s*{\s*$/, error: 'SyntaxError: Unexpected end of input' },
        { pattern: /if\s*\([^)]*[^)]\s*$/, error: 'SyntaxError: missing ) after condition' }
      ],
      java: [
        { pattern: /System\.out\.println\([^)]*[^)]\s*$/, error: 'error: reached end of file while parsing' },
        { pattern: /public\s+class\s+\w+\s*{\s*$/, error: 'error: reached end of file while parsing' }
      ],
      cpp: [
        { pattern: /cout\s*<<[^;]*[^;]\s*$/, error: 'error: expected \';\' before end of line' },
        { pattern: /int\s+main\s*\(\s*\)\s*{\s*$/, error: 'error: expected declaration before \'}\' token' }
      ],
      c: [
        { pattern: /printf\([^)]*[^)]\s*$/, error: 'error: expected \')\' before end of line' },
        { pattern: /int\s+main\s*\(\s*\)\s*{\s*$/, error: 'error: expected declaration before \'}\' token' }
      ]
    };

    const errors = commonErrors[language] || [];
    return errors.some(({ pattern }) => pattern.test(code));
  }

  getCompilationError(code, language) {
    const commonErrors = {
      python: [
        { pattern: /print\([^)]*[^)]\s*$/, error: 'SyntaxError: unexpected EOF while parsing\n  File "main.py", line 1\n    print("Hello\n             ^\nSyntaxError: EOL while scanning string literal' },
        { pattern: /def\s+\w+\([^)]*\):\s*$/, error: 'IndentationError: expected an indented block\n  File "main.py", line 2\n    \n    ^\nIndentationError: expected an indented block' }
      ],
      javascript: [
        { pattern: /console\.log\([^)]*[^)]\s*$/, error: 'SyntaxError: missing ) after argument list\n    at main.js:1:12' },
        { pattern: /function\s+\w+\([^)]*\)\s*{\s*$/, error: 'SyntaxError: Unexpected end of input\n    at main.js:1:20' }
      ],
      java: [
        { pattern: /System\.out\.println\([^)]*[^)]\s*$/, error: 'Main.java:1: error: reached end of file while parsing\nSystem.out.println("Hello\n                        ^\n1 error' }
      ],
      cpp: [
        { pattern: /cout\s*<<[^;]*[^;]\s*$/, error: 'main.cpp:1:15: error: expected \';\' before end of line\n cout << "Hello"\n               ^\n               ;' }
      ],
      c: [
        { pattern: /printf\([^)]*[^)]\s*$/, error: 'main.c:1:14: error: expected \')\' before end of line\n printf("Hello\n              ^\n              )' }
      ]
    };

    const errors = commonErrors[language] || [];
    for (const { pattern, error } of errors) {
      if (pattern.test(code)) {
        return error;
      }
    }
    return 'Compilation error occurred';
  }

  generateOutput(code, language, input) {
    // Extract output patterns from code
    const outputs = [];

    switch (language) {
      case 'python':
        const pythonPrints = code.match(/print\s*\([^)]+\)/g) || [];
        pythonPrints.forEach(print => {
          const content = print.match(/print\s*\(\s*["']([^"']+)["']\s*\)/);
          if (content) {
            outputs.push(content[1]);
          } else if (print.includes('input()')) {
            outputs.push(input || 'User input');
          } else {
            outputs.push('Hello, World!');
          }
        });
        break;

      case 'javascript':
        const jsPrints = code.match(/console\.log\s*\([^)]+\)/g) || [];
        jsPrints.forEach(log => {
          const content = log.match(/console\.log\s*\(\s*["']([^"']+)["']\s*\)/);
          if (content) {
            outputs.push(content[1]);
          } else {
            outputs.push('Hello, World!');
          }
        });
        break;

      case 'java':
        const javaPrints = code.match(/System\.out\.println?\s*\([^)]+\)/g) || [];
        javaPrints.forEach(print => {
          const content = print.match(/System\.out\.println?\s*\(\s*["']([^"']+)["']\s*\)/);
          if (content) {
            outputs.push(content[1]);
          } else {
            outputs.push('Hello, World!');
          }
        });
        break;

      case 'cpp':
        const cppPrints = code.match(/cout\s*<<[^;]+/g) || [];
        cppPrints.forEach(cout => {
          const content = cout.match(/cout\s*<<\s*["']([^"']+)["']/);
          if (content) {
            outputs.push(content[1]);
          } else if (cout.includes('endl')) {
            outputs.push('Hello, World!');
          } else {
            outputs.push('Hello, World!');
          }
        });
        break;

      case 'c':
        const cPrints = code.match(/printf\s*\([^)]+\)/g) || [];
        cPrints.forEach(printf => {
          const content = printf.match(/printf\s*\(\s*["']([^"'\\n]+)["']/);
          if (content) {
            outputs.push(content[1]);
          } else {
            outputs.push('Hello, World!');
          }
        });
        break;

      case 'sql':
        if (code.toLowerCase().includes('select')) {
          outputs.push('Query executed successfully');
          outputs.push('Rows affected: ' + Math.floor(Math.random() * 10 + 1));
        }
        break;

      default:
        outputs.push('Code executed successfully');
    }

    if (outputs.length === 0) {
      outputs.push('Program executed successfully (no output)');
    }

    return outputs.join('\n');
  }

  getExecutionHistory() {
    return this.executionHistory;
  }
}

export default new CodeExecutor();