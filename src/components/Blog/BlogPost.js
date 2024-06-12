// src/components/BlogPost.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug } from '../sanity';
import BlockContent from '@sanity/block-content-to-react';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const blogPost = await fetchPostBySlug(slug);
      setPost(blogPost);
    };

    getPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <BlockContent blocks={post.body} />
    </div>
  );
};

export default BlogPost;
