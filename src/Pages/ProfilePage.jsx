import React, { useEffect, useState } from "react";
import { getProfile } from "../data/auth"; // Make sure this is correct

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(); // Assuming getProfile is a function
        setProfile(profileData);
      } catch (err) {
        setError("Failed to fetch profile data");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Joined: {profile.joined}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
