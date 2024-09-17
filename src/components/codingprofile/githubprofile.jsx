import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchGitHubProfile } from '../../services/github';

const GitHubProfile = ({ username }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchGitHubProfile(username).then(setProfile);
  }, [username]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
      <img src={profile.avatar_url} alt={profile.name} width="100" />
    </div>
  );
};

GitHubProfile.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GitHubProfile;
