import mongoose, {
  Schema,
  Document,
} from 'mongoose';

export interface IBlog
  extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  views: number;
  totalTimeSpent: number;
  createdAt: Date;
}

const BlogSchema =
  new Schema<IBlog>({
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    excerpt: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: '',
    },

    author: {
      type: String,
      default: 'Ishant Saini',
    },

    tags: {
      type: [String],
      default: [],
    },

    published: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    totalTimeSpent: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Blog =
  mongoose.models.Blog ||
  mongoose.model<IBlog>(
    'Blog',
    BlogSchema
  );

export default Blog;