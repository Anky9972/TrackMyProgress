import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CodeChefProfile = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCodeChefData = async () => {
      try {
        const response = await fetch(`/your-proxy-or-api/codechef/${username}`);
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

    fetchCodeChefData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>CodeChef Profile</h2>
      {profileData && (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Rating: {profileData.rating}</p>
          <p>Stars: {profileData.stars}</p>
          <p>Highest Rating: {profileData.highest_rating}</p>
          <p>Country Rank: {profileData.country_rank}</p>
          <p>Global Rank: {profileData.global_rank}</p>
        </div>
      )}
    </div>
  );
};

export default CodeChefProfile;

CodeChefProfile.propTypes = {
    username: PropTypes.string.isRequired,
    };