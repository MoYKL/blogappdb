import { Router } from "express";
import {
  bulkCreatCommants,
  deleteBlogs,
  findOrCreateCouments,
  get3NewetsComents,
  getAllBlogs,
  GetCommentByIdAndUserPost,
  postBlog,
  searchComentsByWord,
  updateBlogs,
  updateCommantsById,
} from "./blog.service.js";

const BlogRouter = Router();

// post blogs

BlogRouter.post("/blogs", postBlog);

//update blogs

BlogRouter.patch("/blogs/:id", updateBlogs);

// delete blogs

BlogRouter.delete("/blogs/:id", deleteBlogs);

/// get all blogs

BlogRouter.get("/users/blogs", getAllBlogs);

//Bulk Create Comments

BlogRouter.post("/comments", bulkCreatCommants);

/// Update Comment by ID
BlogRouter.patch("/comments/:commentId", updateCommantsById);

// Find or Create a Comment

BlogRouter.post("/comments/find-or-create", findOrCreateCouments);

///Search Comments by Word in Content

BlogRouter.get("/comments/search", searchComentsByWord);

///Get 3 Newest Comments for a Post

BlogRouter.get("/comments/newest/:postId", get3NewetsComents);

//Get Comment by ID with User & Post Info

BlogRouter.get("/comments/details/:id", GetCommentByIdAndUserPost);

export default BlogRouter;
