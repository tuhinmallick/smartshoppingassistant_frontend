import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../api/authAPI";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import Button from "../components/ui/Button";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch profile details on initial load
  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const data = await fetchProfile(token);
        setProfile(data); // Set profile data when fetched
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Handle modal opening to edit profile
  const handleEditClick = () => {
    setEditProfile(profile);
    setShowModal(true);
  };

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile update
  const handleUpdate = async () => {
    const confirm = window.confirm(
      "Are you sure you want to save these changes?"
    );
    if (!confirm) return;

    // Remove 'createdAt', 'updatedAt', and 'id' from the profile data
    const { createdAt, updatedAt, id, ...updatedProfile } = editProfile;

    try {
      // Send updated profile data to the server
      const updated = await updateProfile(updatedProfile);

      // Re-fetch the updated profile details to ensure correct data is shown
      const refreshedProfile = await fetchProfile(); // Re-fetch profile after update

      // Update profile state with the new data
      setProfile(refreshedProfile);
      setEditProfile(refreshedProfile);

      // Close modal and show success message
      setShowModal(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Show loading or error message if applicable
  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section className="flex flex-col items-center pt-4">
      <h2 className="text-5xl font-extrabold uppercase text-[#fc372d] mb-2">
        User Profile
      </h2>
      <p className="text-[#464646] font-semibold text-xl mb-4">
        ⚙️ Manage your profile settings.
      </p>

      {success && <p className="text-green-500 font-medium mb-4">{success}</p>}
      <div className="w-full max-w-md bg-[#464646] text-white p-6 rounded-md shadow-lg relative">
        <button
          onClick={handleEditClick}
          className="absolute top-4 right-4 text-[#fc372d] hover:scale-110 transition"
        >
          <FaEdit size={22} />
        </button>

        <div className="flex items-center space-x-6 mb-4">
          <img
            src={profile.avatar || "./src/assets/profile.png"}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h3 className="text-2xl font-bold uppercase">
              {profile.name} {profile.surname}
            </h3>
            <div className="text-sm text-gray-300 mt-2 space-y-1">
              <p>
                <FaEnvelope className="inline mr-2 text-[#fc372d]" />{" "}
                {profile.email}
              </p>
              <p>
                <FaPhone className="inline mr-2 text-[#fc372d]" />{" "}
                {profile.phone}
              </p>
              <p>
                <FaMapMarkerAlt className="inline mr-2 text-[#fc372d]" />{" "}
                {profile.street}, {profile.city}, {profile.zipcode}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm">
          <span className="text-[#fc372d]">About:</span> {profile.about}
        </p>

        <Button text="Sign out" onClick={handleLogout} className="mt-6" />
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-xl text-black relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 text-lg"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={editProfile.name || ""}
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="First Name"
              />
              <input
                name="surname"
                value={editProfile.surname || ""}
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Last Name"
              />
              <input
                name="phone"
                value={editProfile.phone || ""}
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Phone"
              />
              <input
                name="email"
                value={editProfile.email || ""}
                disabled
                className="p-2 rounded border bg-gray-200 text-gray-500"
              />
              <input
                name="street"
                value={editProfile.street || ""}
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Street"
              />
              <input
                name="city"
                value={editProfile.city || ""}
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="City"
              />
              <input
                name="zipcode"
                value={editProfile.zipcode || ""}
                onChange={handleChange}
                className="p-2 rounded border"
                placeholder="Zipcode"
              />
            </div>

            <textarea
              name="about"
              value={editProfile.about || ""}
              onChange={handleChange}
              rows={3}
              className="w-full mt-4 p-2 border rounded"
              placeholder="Write something about yourself"
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-[#fc372d] text-white rounded hover:brightness-110"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
