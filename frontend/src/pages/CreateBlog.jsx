import { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FileText, ImageIcon, Loader2, PenTool, Send, Sparkles, Tag, Upload } from "lucide-react";

const CreateBlog = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImagePreview(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append("tags", formData.tags);
      if (image) form.append("image", image);

      const res = await axios.post("/blogs", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      console.error("Error creating blog:", err.response?.data);
      alert(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary/50 p-4">
      <div className="max-w-4xl mx-auto border border-primary/25 p-8 rounded-2xl bg-base-200">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/50 rounded-full">
              <PenTool className="w-8 h-8 text-base-200" />
            </div>
            <h1 className="text-4xl font-bold text-primary/90">
              Create New Blog
            </h1>
          </div>
          <p className="text-lg">
            Share your thoughts and ideas with the world
          </p>
        </div>
        {/* main form card */}
        <div className="card bg-base-100 shadow-2xl border border-primary/50">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Section */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Blog Title
                  </span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter an engaging title for your blog..."
                    className="input input-bordered input-primary flex-1 text-lg h-14 focus:input-primary"
                    required
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <PenTool className="w-5 h-5" />
                    Content
                  </span>
                </label>
                <textarea
                  name="content"
                  rows={10}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your amazing blog content here... Share your insights, experiences, and knowledge with your readers."
                  className="textarea textarea-bordered textarea-primary text-lg leading-relaxed resize-none focus:textarea-primary"
                  required
                />
                <label className="label">
                  <span className="label-text-alt">
                    {formData.content.length} characters
                  </span>
                </label>
              </div>

              {/* Tags Section */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <Tag className="w-5 h-5 " />
                    Tags
                  </span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g., react, javascript, tutorial, beginners"
                    className="input input-bordered input-primary flex-1 h-14 focus:input-primary"
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt ">
                    Separate tags with commas for better discoverability
                  </span>
                </label>
              </div>
              {/* Image Upload Section */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Featured Image
                  </span>
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/50 rounded-lg cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-primary" />
                        <p className="mb-2 text-sm">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {imagePreview && (
                    <div className="mt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <ImageIcon className="w-5 h-5 text-success" />
                        <span className="text-sm font-medium text-success">Image Preview</span>
                      </div>
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-success/20"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 btn btn-sm btn-error btn-circle"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control pt-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg text-lg gap-3 h-16 bg-gradient-to-r from-primary/80 to-secondary/80 border-0 hover:from-secondary/80 hover:to-primary/80"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Publish Blog
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CreateBlog;
