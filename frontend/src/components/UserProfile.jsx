import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("reading");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "Aanya Roy",
    userId: "@aanya_reads",
    bio: "📚 Professional story devourer | ☕️ Coffee-powered reader | 🌙 Midnight book ninja",
    bannerImage: null,
    profileImage: null,
    booksToRead: [],
    currentlyReading: [],
    booksRead: [],
  });

  // Dropzone configurations
  const bannerDropzone = useDropzone({
    onDrop: (acceptedFiles) => {
      setUserData({
        ...userData,
        bannerImage: URL.createObjectURL(acceptedFiles[0]),
      });
    },
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    multiple: false,
  });

  const profileDropzone = useDropzone({
    onDrop: (acceptedFiles) => {
      setUserData({
        ...userData,
        profileImage: URL.createObjectURL(acceptedFiles[0]),
      });
    },
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    multiple: false,
  });

  return (
    <div className="w-full bg-white">
      {/* Banner Section with grey background */}
      <div
        {...bannerDropzone.getRootProps()}
        className="h-48 bg-gray-200 relative cursor-pointer group"
      >
        <input {...bannerDropzone.getInputProps()} />
        {userData.bannerImage ? (
          <img
            src={userData.bannerImage}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Click or drag to update banner
          </span>
        </div>

        {/* Profile Image with grey background */}
        <div className="absolute -bottom-16 left-4">
          <div {...profileDropzone.getRootProps()} className="relative group">
            <input {...profileDropzone.getInputProps()} />
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 cursor-pointer overflow-hidden">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
                  Add Photo
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-6 pb-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{userData.username}</h2>
            <p className="text-gray-600">{userData.userId}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border rounded-full hover:bg-gray-50 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <p className="text-gray-800 mb-8">
          {userData.bio ||
            "✨ Craft your unique reading identity – share your favorite genres, reading goals, or literary passions..."}
        </p>

        {/* Centered Navigation Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="flex justify-center space-x-8">
            {["to-read", "reading", "read"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.replace("-", " ").toUpperCase()}
              </button>
            ))}
          </nav>
        </div>

        {/* Empty States */}
        <div className="mt-4 w-full">
          {activeTab === "to-read" && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">📚 Your Reading List Awaits</p>
              <p className="mt-2 text-sm">
                Start building your literary journey - books you want to read
                will appear here
              </p>
              <button className="mt-4 text-blue-500 hover:text-blue-600 text-sm">
                Add your first book +
              </button>
            </div>
          )}

          {activeTab === "reading" && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">📖 Open a New Chapter</p>
              <p className="mt-2 text-sm">
                Books you're currently reading will show up here with progress
                tracking
              </p>
              <button className="mt-4 text-blue-500 hover:text-blue-600 text-sm">
                Start reading a book +
              </button>
            </div>
          )}

          {activeTab === "read" && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">🏆 Future Literary Victories</p>
              <p className="mt-2 text-sm">
                Every book you finish will become a badge of honor here
              </p>
              <button className="mt-4 text-blue-500 hover:text-blue-600 text-sm">
                Log your first completed book +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Banner Image
                </label>
                <button
                  {...bannerDropzone.getRootProps()}
                  className="w-full p-2 border rounded hover:bg-gray-50"
                >
                  Upload New Banner
                  <input {...bannerDropzone.getInputProps()} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <button
                  {...profileDropzone.getRootProps()}
                  className="w-full p-2 border rounded hover:bg-gray-50"
                >
                  Upload New Photo
                  <input {...profileDropzone.getInputProps()} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={userData.bio}
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                  className="w-full p-2 border rounded h-32"
                  maxLength={160}
                  placeholder="Share your reading journey..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
