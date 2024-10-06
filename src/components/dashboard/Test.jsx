import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Set up axios with the API base URL and your API key
const apiClient = axios.create({
  baseURL: 'https://clist.by/api/v4',
  headers: {
    Authorization: 'Bearer ff915232e2900ffe15742b4754a6516be5d4e3a2', // Replace with your actual API key
  },
  params: {
    format: 'json',
  },
});

const TestAPIComponent = () => {
  const [accounts, setAccounts] = useState([]);
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      const response = await apiClient.get('/account/');
      setAccounts(response.data.objects || []); // Ensure we handle the expected array
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch contests
  const fetchContests = async () => {
    try {
      const response = await apiClient.get('/contest/');
      setContests(response.data.objects || []); // Ensure we handle the expected array
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAccounts();
    fetchContests();
  }, []);

  return (
    <div>
      <h1>API Test Component</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display Accounts */}
      <h2>Accounts</h2>
      {accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>{account.username}</li>
          ))}
        </ul>
      )}

      {/* Display Contests */}
      <h2>Contests</h2>
      {contests.length === 0 ? (
        <p>No contests found.</p>
      ) : (
        <ul>
          {contests.map((contest) => (
            <li key={contest.id}>
              {contest.event} - {new Date(contest.start).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestAPIComponent;
