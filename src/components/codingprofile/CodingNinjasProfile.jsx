import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const CodingNinjasProfile = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCodingNinjasData = async () => {
      try {
        const response = await fetch(`/your-proxy-or-api/codingninjas/${username}`);
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

    fetchCodingNinjasData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Coding Ninjas Profile</h2>
      {profileData && (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Points: {profileData.points}</p>
          <p>Rank: {profileData.rank}</p>
        </div>
      )}
    </div>
  );
};

export default CodingNinjasProfile;

CodingNinjasProfile.propTypes = {
    username: PropTypes.string.isRequired,
    };