import{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const LeetCodeProfile = ({ username }) => {
LeetCodeProfile.propTypes = {
  username: PropTypes.string.isRequired,
};
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await fetch(`/leetcode/graphql/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
            {
              matchedUser(username: "${username}") {
                username
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                    submissions
                  }
                }
                profile {
                  realName
                  ranking
                  userAvatar
                  aboutMe
                }
              }
            }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfileData(data.data.matchedUser);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>LeetCode Profile</h2>
      {profileData && (
        <div>
          <img src={profileData.profile.userAvatar} alt="avatar" />
          <p>Username: {profileData.username}</p>
          <p>Real Name: {profileData.profile.realName}</p>
          <p>Ranking: {profileData.profile.ranking}</p>
          <p>About: {profileData.profile.aboutMe}</p>
          <h3>Submissions:</h3>
          <ul>
            {profileData.submitStats.acSubmissionNum.map((item, index) => (
              <li key={index}>
                {item.difficulty}: {item.count} solved / {item.submissions} submissions
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeetCodeProfile;
