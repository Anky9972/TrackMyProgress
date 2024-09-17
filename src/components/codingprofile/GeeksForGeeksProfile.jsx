import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const GeeksforGeeksProfile = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGFGData = async () => {
      try {
        const response = await fetch(`/your-proxy-or-api/gfg/${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGFGData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>GeeksforGeeks Profile</h2>
      {profileData && (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Practice Points: {profileData.practicePoints}</p>
          <p>Overall Rank: {profileData.rank}</p>
        </div>
      )}
    </div>
  );
};

export default GeeksforGeeksProfile;

GeeksforGeeksProfile.propTypes = {
    username: PropTypes.string.isRequired,
    };