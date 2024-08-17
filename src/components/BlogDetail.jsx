// src/components/BlogDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams(); // id is now the bId
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://message-aether.onrender.com/api/blog/`
        );
        const result = await response.json();
        const blog = result.data.blogs.find((b) => b.bId === parseInt(id));
        setBlog(blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!blog) return <div className="text-center p-4">Blog not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <h2 className="text-xl text-gray-600">{blog.subtitle}</h2>
      <img src={blog.image} alt={blog.title} className="w-full h-auto mt-4" />
      <p className="mt-4">{blog.description}</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded">{blog.code}</pre>
    </div>
  );
};

export default BlogDetail;
