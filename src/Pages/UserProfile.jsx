import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    // Fetch user data from local storage or API
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "John Doe",
      email: "john@example.com",
    };
    setUser(storedUser);
    setUpdatedUser(storedUser);
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="space-y-3">
        <label className="block font-medium">Name:</label>
        {editMode ? (
          <input
            type="text"
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        ) : (
          <p>{user?.name}</p>
        )}

        <label className="block font-medium">Email:</label>
        {editMode ? (
          <input
            type="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        ) : (
          <p>{user?.email}</p>
        )}

        {editMode ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
