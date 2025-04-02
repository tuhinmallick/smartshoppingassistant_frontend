import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api/authAPI";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">User Profile</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {profile ? (
          <div>
            <h3 className="text-2xl font-semibold">
              {profile.name} {profile.surname}
            </h3>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-gray-600">{profile.phone}</p>
            <p className="text-gray-600">
              {profile.street}, {profile.city}, {profile.zipcode}
            </p>
            <p className="text-gray-500 mt-2">{profile.about}</p>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
