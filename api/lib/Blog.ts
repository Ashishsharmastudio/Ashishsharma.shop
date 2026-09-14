import mongoose, {
  Schema,
  Document,
  Model,
} from 'mongoose';

export interface IBlog extends Document {
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
  new Schema<IBlog>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      excerpt: {
        type: String,
        required: true,
        trim: true,
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
        default: 'Ashish Sharma',
        trim: true,
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
    },
    {
      timestamps: false,
    }
  );

/**
 * Explicitly type the existing model.
 *
 * Without this cast, Mongoose 9 can infer a union between
 * Model<any> and Model<IBlog>, which causes errors on
 * find(), findById(), findByIdAndUpdate(), etc.
 */
const Blog: Model<IBlog> =
  (mongoose.models.Blog as Model<IBlog> | undefined) ??
  mongoose.model<IBlog>(
    'Blog',
    BlogSchema
  );

export default Blog;