import { useCallback, useEffect, useState } from "react";
import axios from "../services/api";
import BlogCard from "../components/BlogCard";
import { Loader2, RefreshCw, TrendingUp } from "lucide-react";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]); // Store all blogs from API
  const [displayedBlogs, setDisplayedBlogs] = useState([]); // Blogs currently shown
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const blogsPerPage = 5;

  const hasMore = displayedBlogs.length < allBlogs.length;

  useEffect(() => {
    loadAllBlogs();
  }, []);

  const loadAllBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("/blogs");
      const blogs = response.data;

      setAllBlogs(blogs);
      // Show first 5 blogs initially
      setDisplayedBlogs(blogs.slice(0, blogsPerPage));
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreBlogs = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * blogsPerPage;

      setDisplayedBlogs(allBlogs.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
      setLoadingMore(false);
    }, 800);
  }, [allBlogs, currentPage, loadingMore, hasMore, blogsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMoreBlogs();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreBlogs]);

  const retry = () => {
    setError(null);
    setAllBlogs([]);
    setDisplayedBlogs([]);
    setCurrentPage(1);
    loadAllBlogs();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
            <p className="text-xl font-medium text-base-content/70">Loading amazing blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
            <p className="text-base-content/70 mb-6 text-center">{error}</p>
            <button onClick={retry} className="btn btn-primary gap-2">
              <RefreshCw size={20} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-1">
            <TrendingUp className="text-primary" size={32} />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Latest Blogs
            </h1>
          </div>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Discover the latest insights, tutorials, and stories from our community of writers
          </p>
        </div>

        {/* Blog Grid */}
        {displayedBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2">No blogs available</h3>
            <p className="text-base-content/70">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((blog, index) => (
              <div
                key={blog._id}
                className="opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${(index % 5) * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button / Loading Indicator */}
        <div className="text-center mt-12">
          {loadingMore && (
            <div className="flex flex-col items-center gap-4">
              <div className="loading loading-spinner loading-lg text-primary"></div>
              <p className="text-base-content/70">Loading more blogs...</p>
            </div>
          )}

          {!loadingMore && hasMore && displayedBlogs.length >= 5 && (
            <button
              onClick={loadMoreBlogs}
              className="btn btn-primary btn-lg gap-2 hover:scale-105 transition-transform"
            >
              <Loader2 size={20} />
              Load More Blogs
            </button>
          )}

          {!hasMore && displayedBlogs.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl">🎉</div>
              <p className="text-lg font-medium text-base-content/70">
                You've reached the end! Thanks for reading.
              </p>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}


export default Home;
