const express = require('express');
const _ = require('lodash');
const {default:fetch} = require('node-fetch-cjs');
// const { default: fetch } =  import('node-fetch');

const app = express();
const PORT = 3000;

const memoizedBlogStats = _.memoize(async () => {
//   const { default: fetch } =  import('node-fetch');
  const response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', {
    headers: {
      'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
    }
  });

  if (!response.ok) {
    throw new Error('Error fetching data from the blog API');
  }

  const data = await response.json();
//   console.log(data);

  const totalBlogs = data.blogs.length;
//   console.log(totalBlogs)
  const longestBlog = _.maxBy(data.blogs, 'title');
//   console.log(longestBlog)
  const blogsWithPrivacy = _.filter(data.blogs, blog => blog.title && blog.title.toLowerCase().includes('privacy'));
  const uniqueTitles = _.uniqBy(data.blogs, 'title');

  const responseObj = {
    totalBlogs,
    longestBlog: longestBlog ? longestBlog.title : null,
    blogsWithPrivacy: blogsWithPrivacy.length,
    uniqueTitles: uniqueTitles.map(blog => blog.title)
  };

  return responseObj;
}, () => 'cacheSecret'); 

const memoizedBlogSearch = _.memoize(async (query) => {
  const response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', {
    headers: {
      'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
    }
  });

  if (!response.ok) {
    throw new Error('Error fetching data from the blog API');
  }

  const data = await response.json();
//   console.log(data)

  const filteredBlogs = data.blogs.filter(blog =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );
//   console.log(filteredBlogs)

  return filteredBlogs;
}, (query) => query); 

app.get('/api/blog-stats', async (req, res) => {
  try {
    // const { default: fetch } =  import('node-fetch');
    const blogStats = await memoizedBlogStats();
    res.json(blogStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/blog-search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const filteredBlogs = await memoizedBlogSearch(query);
    res.json(filteredBlogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
