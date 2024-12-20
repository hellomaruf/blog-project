import { Types } from "mongoose";

export type TBlog = {
  title: string;
  content: string;
  author: object;
  isPublished?: boolean;
};
