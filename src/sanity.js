// src/sanity.js
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '7fn2g69r',
  dataset: 'production',
//   dataset: process.env.REACT_APP_SANITY_DATASET,
  useCdn: false,
});

export const fetchPosts = async () => {
  const query = '*[_type == "post"] | order(publishedAt desc) {_id, title, summary, slug, body, publishedAt}';
  const posts = await client.fetch(query);
  return posts;
};

export const fetchPostBySlug = async (slug) => {
  const query = '*[_type == "post" && slug.current == $slug][0]';
  const params = { slug };
  const post = await client.fetch(query, params);
  return post;
};
