import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
import BlockContent from '@sanity/block-content-to-react';
// import ReactMarkdown from 'react-markdown';
import Main from '../layouts/Main';
import { fetchPosts, fetchPostBySlug } from '../sanity';
import truncateText from '../utils';

const extractTextFromBlocks = (blocks) => blocks.map((block) => block.children.map((child) => child.text).join('')).join('\n');

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const { slug: currentSlug } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      const allPosts = await fetchPosts();
      setPosts(allPosts);
    };

    const getPost = async (slug) => {
      const blogPost = await fetchPostBySlug(slug);
      setPost(blogPost);
    };

    if (currentSlug) {
      getPost(currentSlug);
    } else {
      getPosts();
    }
  }, [currentSlug]);

  if (currentSlug && post) {
    const postDescription = extractTextFromBlocks(post.body);
    return (
      <Main
        title={post.title}
        description={truncateText(postDescription, 150)}
      >
        <article className="post markdown" id="blog-post">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/blog">Blog</Link></h2>
              <p>{post.title}</p>
            </div>
          </header>
          <BlockContent blocks={post.body} />
        </article>
      </Main>
    );
  }

  return (
    <Main
      title="Blog"
      description="Read my latest thoughts"
    >
      <article className="post markdown" id="blog-list">
        <header>
          <div className="title">
            <h2 data-testid="heading"><Link to="/blog">Blog</Link></h2>
            <p>Read my latest thoughts</p>
          </div>
        </header>
        {posts.length > 0 ? (
          posts.map((postItem) => (
            <div key={postItem._id} className="blog-post">
              <h2 className="blog-post-title">{postItem.title}</h2>
              <p className="blog-post-summary">{truncateText(postItem.body[0].children[0].text, 150)}</p>
              <Link to={`/blog/${postItem.slug.current}`}>Learn More</Link>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </article>
    </Main>
  );
};

export default BlogSection;
