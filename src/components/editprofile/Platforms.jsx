import React from 'react';

const Platforms = () => {
  const platforms = [
    'LeetCode',
    'GFG',
    'Codeforces',
    'AtCoder',
    'CodingNinja',
    'HackerRank',
    'InterviewBit',
    'CodeChef',
  ];

  return (
    <div>
      <h2 className="text-xl font-bold">Platforms</h2>
      <p>You can update and verify your platform details here.</p>
      <ul className="space-y-4">
        {platforms.map((platform) => (
          <li key={platform} className="flex justify-between items-center">
            <span>{platform}</span>
            <div>
              <input type="text" placeholder={`Enter ${platform} profile URL`} className="border p-2 rounded mr-2" />
              <button className="bg-green-500 text-white py-1 px-2 rounded">Verify</button>
              <button className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Platforms;
