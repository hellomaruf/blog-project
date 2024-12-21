import QueryBuilder from "../../builder/queryBuilder";
import { blogSearchableFields } from "./blog.constant";
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

const deleteBlogFromDB = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id);
  return result;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    BlogModel.find(),
    query
  )
    .search(blogSearchableFields)
    .filter()
    .sort()
    
  const result = await courseQuery.modelQuery;
  return result;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogFromDB
};
