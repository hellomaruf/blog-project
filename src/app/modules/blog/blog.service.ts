import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const result = BlogModel.create(payload);
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const updateBlogInfo = await BlogModel.findByIdAndUpdate(id, payload);
  return updateBlogInfo;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
};
