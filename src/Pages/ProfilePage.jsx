import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api/auth";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token in localStorage:", token);
        if (!token) {
          throw new Error("Unauthorized: No token found");
        }
        const profileData = await fetchProfile();
        console.log("Fetched Profile Data:", profileData);
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
        {/* Assuming profile has 'profilePicture', 'name', 'email', 'joined', and 'bio' */}
        {profile ? (
          <div>
            <img
              src={profile.profilePicture || "/path/to/default/image.jpg"} // Default image if no profile picture
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold">{profile.name}</h3>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-gray-500 mt-2">{profile.joined}</p>
            <p className="text-gray-500 mt-2">{profile.bio}</p>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
