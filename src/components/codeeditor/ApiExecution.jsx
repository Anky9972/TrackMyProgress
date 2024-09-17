import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ApiExecution = ({ code, language }) => {
  const [result, setResult] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const executeCode = async () => {
    setIsExecuting(true);
    const languageId = getLanguageId(language);
    const base64Code = btoa(code);

    console.log('Executing code with language:', language);
    console.log('Language ID:', languageId);
    console.log('Base64 encoded code:', base64Code);

    if (languageId === undefined) {
      setResult('Error: Invalid language selected');
      setIsExecuting(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*',
        {
          source_code: base64Code,
          language_id: languageId,
          stdin: '', // Optional: Add stdin if required
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Rapidapi-Key': import.meta.env.VITE_APP_JUDGE0_API_KEY,
            'X-Rapidapi-Host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );

      const { token } = response.data;
      console.log('Submission response:', response.data);

      // Poll for the execution result
      let isProcessing = true;
      while (isProcessing) {
        const statusResponse = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`,
          {
            headers: {
              'X-Rapidapi-Key': import.meta.env.VITE_APP_JUDGE0_API_KEY,
              'X-Rapidapi-Host': 'judge0-ce.p.rapidapi.com',
            },
          }
        );

        const { stdout, stderr, status } = statusResponse.data;

        console.log('Status response:', statusResponse.data);

        switch (status.id) {
          case 1: // Compilation error
            setResult(stderr || 'Compilation error occurred');
            isProcessing = false;
            break;
          case 2: // Processing
            // Keep polling until the status changes
            console.log('Status: Processing...');
            break;
          case 3: // Accepted
            // Decode the base64 output and display it
            setResult(atob(stdout) || 'No output');
            isProcessing = false;
            break;
          case 4: // Wrong Answer
            setResult(stderr || 'Wrong answer');
            isProcessing = false;
            break;
          case 5: // Runtime Error
            setResult(stderr || 'Runtime error occurred');
            isProcessing = false;
            break;
          case 6: // Time Limit Exceeded
            setResult(stderr || 'Time limit exceeded');
            isProcessing = false;
            break;
          case 7: // Memory Limit Exceeded
            setResult(stderr || 'Memory limit exceeded');
            isProcessing = false;
            break;
          default:
            setResult('Unknown status');
            isProcessing = false;
            break;
        }

        if (status.id !== 2) {
          // Break out of loop if status is no longer "Processing"
          break;
        }

        // Polling delay
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Increased polling interval
      }
    } catch (error) {
      console.error('Error response:', error.response?.data);
      setResult(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const getLanguageId = (language) => {
    const languageMap = {
      'JavaScript': 63,
      'TypeScript': 74,
      'Python': 71,
      'Java': 62,
      'C': 50,
      'C++': 54,
      'C#': 51,
      'Ruby': 72,
      'Go': 60,
      'Rust': 73,
    };
    const id = languageMap[language];
    console.log(`Language "${language}" maps to ID ${id}`);
    return id;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-tr-lg rounded-br-lg resize-x overflow-auto">
      <div className='w-full flex justify-between'>
      <button
        onClick={executeCode}
        disabled={isExecuting}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md disabled:opacity-50"
      >
        {isExecuting ? 'Executing...' : 'Execute Code'}
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

ApiExecution.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default ApiExecution;
