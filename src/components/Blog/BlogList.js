// src/components/BlogList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../sanity';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const allPosts = await fetchPosts();
      setPosts(allPosts);
    };

    getPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <Link to={`/post/${post.slug.current}`}>Learn More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
