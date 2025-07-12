import { Router } from "express";
import {
  deletePost,
  getPostsWithCommentCount,
  getPostsWithDetails,
  postBlog,
} from "./post.service.js";

const postRouter = Router();

postRouter.post("/", postBlog);

postRouter.delete("/:postId", deletePost);

postRouter.get("/details", getPostsWithDetails);
postRouter.get("/posts/comment-count", getPostsWithCommentCount);

export default postRouter;
