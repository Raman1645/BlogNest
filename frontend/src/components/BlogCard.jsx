import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

const BlogCard = ({ blog }) => {
  const { _id, title, content, image, author, createdAt, tags = [] } = blog;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/50 h-full flex flex-col">
      {image && (
        <figure className="relative overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt="blog"
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </figure>
      )}

      <div className="card-body p-6 flex flex-col flex-grow">
        <h2 className="card-title text-2xl font-bold mb-3 line-clamp-2">
          <Link
            to={`/blogs/${_id}`}
            className="hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            {title}
          </Link>
        </h2>

        <div className="flex items-center gap-4 text-sm text-base-content/70 mb-4">
          <div className="flex items-center gap-1">
            <User size={16} className="text-primary" />
            <span>{author?.username || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-primary" />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <p className="text-base-content/80 leading-relaxed mb-4 line-clamp-3 flex-grow">
          {content.length > 200 ? content.slice(0, 200) + "..." : content}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="badge badge-outline text-xs px-2 py-1 border-base-content/30 text-base-content/80"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions justify-end mt-auto">
          <Link
            to={`/blogs/${_id}`}
            className="btn btn-primary btn-sm gap-2 hover:gap-3 transition-all duration-200"
          >
            Read more
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;