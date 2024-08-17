// src/components/BlogList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://message-aether.onrender.com/api/blog/"
        );
        const result = await response.json();
        setBlogs(result.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      {blogs.map((blog) => (
        <div key={blog.bId} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">
            <Link to={`/blog/${blog.bId}`} className="hover:text-blue-500">
              {blog.title}
            </Link>
          </h2>
          <p className="text-gray-700">{blog.subtitle}</p>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto mt-2"
          />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
