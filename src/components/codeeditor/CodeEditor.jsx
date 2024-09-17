import { useState } from 'react';
import CodeEditor from '@uiw/react-codemirror';
import PropTypes from 'prop-types';
import { BsFullscreen,BsFullscreenExit } from "react-icons/bs";

import {
  abyss,
  androidstudio,
  atomone,
  bbedit,
  bespin,
  darcula,
  dracula,
  duotoneDark,
  duotoneLight,
  eclipse,
  githubDark,
  githubLight,
  gruvboxDark,
  gruvboxLight,
  material,
  monokai,
  nord,
  solarizedDark,
  solarizedLight,
  sublime,
  tokyoNight,
  tomorrowNightBlue,
  vscodeDark,
  xcodeDark,
  xcodeLight,
} from '@uiw/codemirror-themes-all';

const themeOptions = {
  abyss,
  androidstudio,
  atomone,
  bbedit,
  bespin,
  darcula,
  dracula,
  duotoneDark,
  duotoneLight,
  eclipse,
  githubDark,
  githubLight,
  gruvboxDark,
  gruvboxLight,
  material,
  monokai,
  nord,
  solarizedDark,
  solarizedLight,
  sublime,
  tokyoNight,
  tomorrowNightBlue,
  vscodeDark,
  xcodeDark,
  xcodeLight,
};

const CodeEditorComponent = ({ language, value, onChange,toggleFullscreen ,isFullscreen}) => {
  const [theme, setTheme] = useState('bbedit'); // Default theme
 

  return (
    <div className={`p-4 w-4/5 bg-gray-100 rounded-tl-lg rounded-bl-lg shadow-md resize-x overflow-auto`}>
      
      <div className='w-full flex justify-end items-center gap-5' >
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Share Code
        </button>
        <button
          onClick={toggleFullscreen} // Toggle fullscreen mode
          className=" px-4 py-2"
        >
          {isFullscreen ? (<BsFullscreenExit className='text-2xl'/>) : (<BsFullscreen className='text-2xl font-bold'/>)}
        </button>
        <div className=" flex justify-end gap-2 items-center">
        <label className="block text-gray-700 font-bold">Theme:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-2 w-auto border border-gray-300 rounded"
        >
          {Object.keys(themeOptions).map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
          ))}
        </select>
      </div>
      </div>

      <CodeEditor
        value={value}
        onChange={onChange}
        theme={themeOptions[theme]} // Apply the selected theme
        language={language}
        options={{
          lineNumbers: true,
          indentWithTabs: true,
          tabSize: 2,
        }}
        className="w-full h-[70vh] mt-2 rounded-lg bg-white overflow-y-auto"
      />
    </div>
  );
};

CodeEditorComponent.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  setIsFullscreen: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
};

export default CodeEditorComponent;
