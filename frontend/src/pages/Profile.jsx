import { useEffect, useState } from "react";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Loader2, Save } from "lucide-react";
import { User, Mail, FileText, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    axios
      .get("/auth/user/profile", {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        setProfile({
          ...res.data.user,
          totalBlogs: res.data.totalBlogs
        });
        setBio(res.data.user.bio);
      });
  }, []);


  console.log("Profile data:", profile);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        "/auth/update/profile",
        { bio, avatar: profile.avatar },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      setProfile(prev => ({ ...prev, bio: res.data.bio }));
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setLoading(false);
    }
  };


  const generateAvatarUrl = () => {
    const seed = Math.random().toString(36).substring(2, 10); // random string
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`;
  };



  const handleCancel = () => {
    setBio(profile.bio);
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/60">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Card */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={profile.avatar}
                      alt={profile.username}
                      className="rounded-full"
                    />
                  </div>
                  <button
                    className="btn btn-sm btn-outline mt-2"
                    onClick={() => {
                      const newAvatar = generateAvatarUrl();
                      setProfile(prev => ({ ...prev, avatar: newAvatar }));
                      // Optional: Auto-save it to backend
                    }}
                  >
                    Random Avatar
                  </button>

                </div>

              </div>
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-base-content mb-2">
                  {profile.username}
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-base-content/60 mb-4">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>

                {/* Stats */}
                <div className="stats stats-horizontal shadow bg-base-200">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Total Blogs</div>
                    <div className="stat-value text-primary">{profile.totalBlogs}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bio Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="card-title text-2xl">
                <User className="w-6 h-6" />
                About Me
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-ghost btn-sm gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Bio</span>
                    <span className="label-text-alt">500</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered textarea-lg h-32 focus:textarea-primary"
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={500}
                  />
                </div>

                <div className="card-actions justify-end gap-2">
                  <button
                    onClick={handleCancel}
                    className="btn btn-ghost"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Bio
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <p className="text-base-content/80 leading-relaxed">
                  {profile.bio || "No bio available. Click edit to add one!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile;
