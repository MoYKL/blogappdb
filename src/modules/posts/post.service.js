import postModel from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";
import commentModel from "../../DB/models/comment.model.js";
import { Op, Sequelize, UniqueConstraintError } from "sequelize";

export const postBlog = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;

    const existingPost = await postModel.findOne({ where: { title } });
    if (existingPost) {
      return res
        .status(409)
        .json({ message: "A post with this title already exists" });
    }

    const newPost = await postModel.create({
      title,
      content,
      userId,
    });
    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    return handleError(res, error, "Error creating post");
  }
};



export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required in the request body to verify ownership." });
    }

    const post = await postModel.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.userId != userId) {
      return res.status(403).json({ message: "You are not authorized to delete this post." });
    }

    await post.destroy();

    return res.status(200).json({ message: "Post deleted." });

  } catch (error) {
    console.error("Error during post deletion:", error);
    return res.status(500).json({ message: "Error during post deletion", error: error.message });
  }
};


export const getPostsWithDetails = async (req, res, next) => {
    try {
        const posts = await postModel.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: userModel,
                    attributes: [['u_name', 'name']]
                },
                {
                    model: commentModel,
                    attributes: ['id', 'content']
                }
            ]
        });

        return res.status(200).json({ message: "Done", posts });

    } catch (error) {
        console.error("Error fetching posts with details:", error);
        return res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
};


export const getPostsWithCommentCount = async (req, res, next) => {
    try {
        const posts = await postModel.findAll({
            attributes: [
                'id',
                'title',
                [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount']
            ],
            include: [{
                model: commentModel,
                attributes: [] 
            }],
            group: ['Post.id']
        });

        return res.status(200).json({ message: "Done", posts });

    } catch (error) {
        console.error("Error fetching posts with comment count:", error);
        return res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
};