import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const HackerRankProfile = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackerRankData = async () => {
      try {
        const response = await fetch(`/your-proxy-or-api/hackerrank/${username}`);
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

    fetchHackerRankData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>HackerRank Profile</h2>
      {profileData && (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Overall Rank: {profileData.rank}</p>
          <p>Badges: {profileData.badges}</p>
          <p>Languages: {profileData.languages}</p>
        </div>
      )}
    </div>
  );
};

export default HackerRankProfile;

HackerRankProfile.propTypes = {
    username: PropTypes.string.isRequired,
    };