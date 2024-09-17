import { useState } from 'react';
import PropTypes from 'prop-types'; 

const LocalExecution = ({ code }) => {
  const [result, setResult] = useState('');

  const executeCode = () => {
    let output = '';
    const originalConsoleLog = console.log;

    try {
      // Override console.log to capture the output
      console.log = (...args) => {
        output += args.join(' ') + '\n';
        originalConsoleLog(...args); // Optional: to also log in the actual console
      };

      // Execute the code
      const evalResult = eval(code);

      // If evalResult is not undefined, append it to the output
      if (evalResult !== undefined) {
        output += String(evalResult);
      }

      setResult(output);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      // Restore original console.log
      console.log = originalConsoleLog;
    }
  };

  return (
    <div className="p-4 w-full bg-gray-100 rounded-tr-lg rounded-br-lg h-full shadow-md resize-x overflow-auto ">
      <div className='w-full flex justify-between'>
      <button
        onClick={executeCode}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
      >
        Execute Code
      </button>
      <button className='px-4 p-2 rounded-lg shadow-md bg-white' onClick={()=>{setResult(' ');}}>
        Clear
      </button>
      </div>
      <pre className="mt-4 p-2 h-[70vh] bg-gray-200 rounded-lg overflow-x-auto whitespace-pre-wrap">
        {result}
      </pre>
    </div>
  );
};

LocalExecution.propTypes = {
  code: PropTypes.string.isRequired,
};

export default LocalExecution;
