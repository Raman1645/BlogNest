import { useEffect, useState } from "react";
import axios from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  Edit3,
  Eye,
  FileText,
  Loader2,
  Upload,
  Tag,
  Image as ImageIcon,
  Save,
  X
} from "lucide-react";

const EditBlog = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "", tags: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    axios.get(`/blogs/${id}`).then((res) => {
      setFormData({
        title: res.data.title,
        content: res.data.content,
        tags: res.data.tags.join(", "),
      });
      setImagePreview(res.data.image || null);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append("tags", formData.tags);
      if (image) form.append("image", image);

      await axios.put(`/blogs/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      navigate(`/blogs/${id}`);
    } catch (err) {
      alert("Error updating blog");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = formData.content.trim().split(/\s+/).length;
  const charCount = formData.content.length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-primary/50 pt-10 ">
      {/* Header */}
      <div className=" bg-base-200 border border-primary/25 shadow-sm max-w-4xl rounded-2xl mx-auto">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm gap-2 bg-primary/80 text-base-200">
              <ArrowLeft className="w-4 h-4 text-base-200" />
              Back
            </button>
            <div className="flex items-center gap-3 mx-auto">
              <div className="p-2 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-lg">
                <Edit3 className="w-5 h-5 text-base-200" />
              </div>
              <div className="mx-auto">
                <h1 className="text-xl font-bold text-primary/80 ">Edit Blog Post</h1>
                <p className="text-sm text-secondary/50">Make your content shine</p>
              </div>
            </div>
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`btn btn-sm gap-2 bg-primary/80 text-base-200 ${isPreviewMode ? "btn-primary" : "btn-outline"}`}
            >
              <Eye className="w-4 h-4 text-base-200" />
              {isPreviewMode ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto py-8">
        {isPreviewMode ? (
          <div className="bg-base-200 rounded-2xl shadow-xl overflow-hidden">
            {imagePreview && (
              <div className="h-80 overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.split(",").map((tag, i) => (
                  <span key={i} className="badge badge-primary badge-outline">
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-6">{formData.title || "Untitled"}</h1>
              <div className="prose prose-lg max-w-none">
                {formData.content.split("\n\n").map((para, i) => (
                  <p key={i} className="mb-4 text-gray-700 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="bg-base-200 rounded-2xl shadow-xl p-8 space-y-6">

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary/80" />
                    Blog Title
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title..."
                  className="input input-bordered input-primary text-lg h-14"
                  required
                />
              </div>

              {/* Content */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-primary/80" />
                    Content
                  </span>
                </label>
                <textarea
                  name="content"
                  rows={16}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your content here..."
                  className="textarea textarea-bordered textarea-primary text-lg leading-relaxed resize-none"
                  required
                />
                <label className="label">
                  <span className="label-text-alt">
                    {wordCount} words • {charCount} characters • ~{readTime} min read
                  </span>
                </label>
              </div>

              {/* Tags */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary/80" />
                    Tags
                  </span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., react, nodejs, fullstack"
                  className="input input-bordered input-primary text-lg h-14"
                />
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary/80" />
                    Featured Image
                  </span>
                </label>

                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-base-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 btn btn-sm btn-error btn-circle"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 badge badge-neutral badge-outline">
                      Current Image
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/50 rounded-lg cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="flex flex-col items-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-primary" />
                      <p className="mb-2 text-sm ">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs ">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg flex-1 gap-3 h-16 bg-gradient-to-r from-primary/80 to-secondary/80 border-0 hover:from-secondary/80 hover:to-tertiary/80 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-6 h-6" />
                      Update Blog
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/blogs/${id}`)}
                  className="btn btn-outline btn-lg px-8 h-16"
                >
                  Cancel
                </button>
              </div>

            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
