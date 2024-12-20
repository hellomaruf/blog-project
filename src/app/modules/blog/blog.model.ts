import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const BlogSchema: Schema<TBlog> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BlogModel = model<TBlog>("Blog", BlogSchema);
