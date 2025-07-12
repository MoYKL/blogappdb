import { Router } from "express";
import {
  bulkCreateComments,
  findOrCreateComment,
  getCommentWithDetails,
  getNewestComments,
  searchComments,
  updateComment,
} from "./comment.service.js";

const commentRouter = Router();

commentRouter.post("/", bulkCreateComments);

commentRouter.patch("/:commentId", updateComment);

commentRouter.post("/find-or-create", findOrCreateComment);

commentRouter.get("/search", searchComments);

commentRouter.get("/newest/:postId", getNewestComments);

commentRouter.get("/details/:id", getCommentWithDetails);



export default commentRouter;
