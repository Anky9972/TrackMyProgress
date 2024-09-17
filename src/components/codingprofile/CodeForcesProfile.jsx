import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const CodeforcesProfile = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCodeforcesData = async () => {
      try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data.result[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCodeforcesData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Codeforces Profile</h2>
      {profileData && (
        <div>
          <img src={profileData.avatar} alt="avatar" />
          <p>Username: {profileData.handle}</p>
          <p>Rank: {profileData.rank}</p>
          <p>Rating: {profileData.rating}</p>
          <p>Max Rating: {profileData.maxRating}</p>
          <p>Organization: {profileData.organization}</p>
        </div>
      )}
    </div>
  );
};

export default CodeforcesProfile;
CodeforcesProfile.propTypes = {
    username: PropTypes.string.isRequired,
  };