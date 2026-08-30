import express from 'express';
import dbConnect from '../lib/mongodb';
import Blog from '../lib/models/Blog';

const router = express.Router();

// Middleware to ensure DB connection is active before resolving request
router.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// GET all blogs
router.get('/blogs', async (req, res) => {
  try {
    const { published } = req.query;
    const query: any = {};
    if (published === 'true') {
      query.published = true;
    }
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET single blog by slug or ID
router.get('/blogs/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let blog;
    
    // Check if ID is valid MongoDB ObjectId
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug);
    } else {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Increment views for frontend read tracking if slug or id is requested
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create blog
router.post('/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update blog
router.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE blog
router.delete('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
