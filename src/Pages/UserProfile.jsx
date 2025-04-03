import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api/authAPI";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Button from "../components/ui/Button";

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
    <section className="flex flex-col items-center pt-4">
      <h2 className="text-3xl font-extrabold uppercase text-[#fc372d] mb-2">
        User Profile
      </h2>
      <p className="text-[#464646] font-semibold mb-6">
        ⚙️ Manage your profile settings here.
      </p>
      <div className="w-full max-w-md bg-[#464646] shadow-slate-500 shadow-lg p-6">
        {profile ? (
          <>
            {/* Profile Image and Details Side by Side */}
            <div className="flex items-center space-x-6 py-4">
              {/* Left: Profile Image */}
              <img
                src={profile?.avatar || "./src/assets/profile.png"}
                alt="User Avatar"
                className="w-24 h-24 rounded-full"
              />

              {/* Right: User Details */}
              <div className="flex flex-col ">
                <h3 className="text-2xl font-extrabold uppercase text-white">
                  {profile.name} {profile.surname}
                </h3>
                {/* Contact Information with Icons */}
                <div className="text-white text-sm font-bold mt-4">
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-[#fc372d]" />
                    <p>{profile.email}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <FaPhone className="text-[#fc372d]" />
                    <p>{profile.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <FaMapMarkerAlt className="text-[#fc372d]" />
                    <p>
                      {profile.street}, {profile.city}, {profile.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-bold text-sm p-4">
              <span className="text-[#fc372d]">About Me:</span>
              <br />
              <span className="text-[#FFFF] text-center">
                "{profile.about}"
              </span>
            </p>

            {/* Sign-Out Button */}
            <Button
              text="Sign out"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            />
          </>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
