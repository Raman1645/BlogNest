import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Bookmark, Calendar, Clock, Edit3, Eye, Heart, MessageCircle, MoreVertical, Send, Tag, Trash2, User } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    await axios.post(`/blogs/${id}/like`, {}, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    fetchBlog();
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await axios.post(`/blogs/${id}/comments`, { content: comment }, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    setComment("");
    fetchBlog();
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`/blogs/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    fetchBlog();
  };

  const handleDeleteBlog = async () => {
    const confirm = window.confirm("Delete this blog?");
    if (!confirm) return;
    await axios.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    navigate("/");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  if (!blog) return <p className="p-4">Loading...</p>;

  const isAuthor = auth.user && auth.user._id === blog.author._id;


  return (
    <div className="min-h-screen bg-base-300 pt-10 border border-primary/25 ">
      {/* Navigation */}
      <div className="bg-primary/50 max-w-4xl mx-auto px-10 py-8 border border-primary/25 rounded-2xl my-4 ">
      <div className="border border-primary/25 bg-base-100  rounded-2xl max-w-4xl mx-auto">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button className="btn btn-ghost btn-sm gap-2" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`btn btn-ghost btn-sm btn-circle ${bookmarked ? 'text-yellow-500' : ''}`}
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
                  <MoreVertical className="w-5 h-5" />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg">
                  {isAuthor && (
                    <>
                      <li>{isAuthor && (
                        <>
                          <Link to={`/edit/${id}`} ><Edit3 className="w-4 h-4" />Edit Blog</Link>

                        </>
                      )}</li>
                      <li><button onClick={handleDeleteBlog} ><Trash2 className="w-4 h-4" />Delete Blog</button></li>
                    </>
                  )}
                  <li><a className="gap-2">Report Content</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div className="  max-w-4xl mx-auto px-10 py-4  mt-6">
        {/* Article Header */}
        <article className="bg-base-100 rounded-2xl shadow-xl overflow-hidden mb-8 border border-primary/25">
          {/* Featured Image */}
          <div className="relative h-full overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 " />
          </div>
          <div className="p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span key={tag} className="badge badge-primary badge-outline gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            {/* Title */}
            <h1 className="text-4xl font-bold text-primary mb-6 leading-tight">
              {blog.title}
            </h1>
            {/* Author Info & Meta */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-primary/25">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img src={blog.author.avatar} alt={blog.author.username} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold  flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blog.author.username}
                  </h3>
                  <div className="flex items-center gap-4 text-sm ">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            {/* Engagement Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-primary/25">
              <button
                onClick={handleLike}
                className={`btn btn-outline gap-2 ${liked ? 'btn-error text-red-600' : 'btn-ghost'}`}
              >
                <Heart fill={blog.likes.length ? "red" : "base-100"} className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                {blog.likes.length} {blog.likes.length === 1 ? 'Like' : 'Likes'}
              </button>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{blog.comments.length} {blog.comments.length === 1 ? 'Comment' : 'Comments'}</span>
              </div>
            </div>
          </div>
        </article>
        {/* Comment Form */}
        {auth.user && (
          <div className="mb-8 p-6 bg-base-100 rounded-xl border border-primary/25 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" alt="You" />
                </div>
              </div>
              <div className="flex-1">
                <div onSubmit={handleComment} className="space-y-3">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this article..."
                    className="textarea textarea-bordered w-full h-24 resize-none focus:textarea-primary"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleComment}
                      className="btn btn-primary gap-2"
                      disabled={!comment.trim()}
                    >
                      <Send className="w-4 h-4" />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Comments List */}
        <div className="space-y-6 bg-base-100 border border-primary/25 rounded-xl p-6 shadow-lg">
          {blog.comments.length > 0 ? (
            blog.comments.map((c) => (
              <div key={c._id} className="flex gap-4 p-4 rounded-xl hover:bg-primary/20 transition-colors">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img src={c.user.avatar} alt={c.user.username} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{c.user.username}</h4>
                      <span className="text-sm">{formatTimeAgo(c.date)}</span>
                    </div>
                    {auth.user && (auth.user._id === c.user._id || isAuthor) && (
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-xs btn-circle">
                          <MoreVertical className="w-4 h-4" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow-lg">
                          <li>
                            <a onClick={() => handleDeleteComment(c._id)} className="text-error gap-2">
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <p className="border border-primary/25 rounded-xl px-4 py-3 leading-relaxed">{c.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16  mx-auto mb-4" />
              <p className=" text-lg">No comments yet</p>
              <p className="">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
};

export default BlogDetails;
