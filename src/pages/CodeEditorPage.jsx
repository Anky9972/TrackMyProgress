import { useState, useEffect, useRef } from 'react';
import CodeEditorComponent from '../components/codeeditor/CodeEditor';
import LocalExecution from '../components/codeeditor/LocalExecution';
import ApiExecution from '../components/codeeditor/ApiExecution';
import uploadCode from '../components/codeeditor/ShareCode';
import FileNameModal from '../components/codeeditor/FileNameModal'; // Import the modal component
import { IoLogoPython, IoLogoJavascript } from 'react-icons/io5';
import { SiCplusplus, SiCsharp, SiTypescript } from 'react-icons/si';
import { FaGolang, FaJava, FaRust } from 'react-icons/fa6';
import { DiRuby } from 'react-icons/di';
// Define code templates for different languages
const codeTemplates = {
  JavaScript: `console.log('Hello, World!');`,
  TypeScript: `console.log('Hello, World!');`,
  Python: `print('Hello, World!')`,
  Java: `public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }`,
  C: `#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  'C++': `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  'C#': `using System;\nclass Program { static void Main() { Console.WriteLine("Hello, World!"); } }`,
  Ruby: `puts 'Hello, World!'`,
  Go: `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
  Rust: `fn main() {\n    println!("Hello, World!");\n}`
};

// Map languages to icons
const languageIcons = {
  JavaScript: <IoLogoJavascript size={24} />,
  TypeScript: <SiTypescript size={24} />,
  Python: <IoLogoPython size={24} />,
  Java: <FaJava size={24} />,
  C: 'C',
  'C++': <SiCplusplus size={24} />,
  'C#': <SiCsharp size={24} />,
  Ruby: <DiRuby size={24} />,
  Go: <FaGolang size={24} />,
  Rust: <FaRust size={24} />
};

const CodeEditorPage = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [shareUrl, setShareUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state
  const editorRef = useRef(null); // Reference to the editor container

  const handleShareCode = async (fileName) => {
    try {
      const id = await uploadCode(code, language, fileName); // Pass file name to uploadCode
      const url = `${window.location.origin}/share/${id}`; // Construct shareable URL
      setShareUrl(url);
      setIsModalOpen(false); // Close the modal after sharing
    } catch (error) {
      console.error('Error sharing code:', error);
    }
  };

  useEffect(() => {
    // Update code template based on selected language
    setCode(codeTemplates[language]);
  }, [language]);

  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      editorRef.current?.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  return (
    <div className={`px-20 py-10 ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* <h1 className="text-2xl font-bold mb-4">Code Execution Platform</h1> */}
      <div className=' gap-5 absolute z-10 left-[35%] mt-4 hidden'>
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal on click
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Share Code
        </button>
      </div>
      {shareUrl && (
        <div className="mt-4">
          <p className="text-gray-700">Shareable URL:</p>
          <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {shareUrl}
          </a>
        </div>
      )}
      <div className="absolute left-5 mt-[60px] flex flex-col items-center gap-2">
        <div className="flex flex-col gap-2">
          {Object.keys(codeTemplates).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`p-2 hover:scale-110 duration-300 transition-all border rounded ${language === lang ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {languageIcons[lang]}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={editorRef} // Set the ref to the editor container
        className={`w-full min-h-[80vh] mt-14 flex ${isFullscreen ? 'fullscreen-editor' : ''}`}
      >
        <CodeEditorComponent
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          className="relative"
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />

        {language !== 'JavaScript' ? (
          <div className="w-4/5 h-60">
            <ApiExecution code={code} language={language} />
          </div>
        ) : (
          <div className="w-4/5">
            <LocalExecution code={code} />
          </div>
        )}
      </div>

      <FileNameModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleShareCode}
      />
    </div>
  );
};

export default CodeEditorPage;
