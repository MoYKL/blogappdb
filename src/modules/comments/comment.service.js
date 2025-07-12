import postModel from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";
import commentModel from "../../DB/models/comment.model.js";
import { Op, Sequelize, UniqueConstraintError } from "sequelize";

export const bulkCreateComments = async (req, res, next) => {
  try {
    const commentsData = req.body.comments;

    if (!Array.isArray(commentsData) || commentsData.length === 0) {
      return res
        .status(400)
        .json({ message: "Request body must contain a 'comments' array." });
    }

    const newComments = await commentModel.bulkCreate(commentsData, {});

    return res
      .status(201)
      .json({ message: "comments created.", comments: newComments });
  } catch (error) {
    console.error("Error during bulk comment creation:", error);
    return res
      .status(500)
      .json({
        message: "Error during bulk comment creation",
        error: error.message,
      });
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const { userId, content } = req.body;

    if (!userId || !content) {
      return res
        .status(400)
        .json({ message: "Both userId and content are required." });
    }

    const comment = await commentModel.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (comment.userId != userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment." });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json({ message: "Comment updated." });
  } catch (error) {
    console.error("Error during comment update:", error);
    return res
      .status(500)
      .json({ message: "Error during comment update", error: error.message });
  }
};

export const findOrCreateComment = async (req, res, next) => {
  try {
    const { postId, userId, content } = req.body;

    if (!postId || !userId || !content) {
      return res
        .status(400)
        .json({ message: "postId, userId, and content are required." });
    }

    const [comment, created] = await commentModel.findOrCreate({
      where: {
        postId: postId,
        userId: userId,
        content: content,
      },
      defaults: {
        postId: postId,
        userId: userId,
        content: content,
      },
    });

    return res.status(200).json({ comment, created });
  } catch (error) {
    console.error("Error during findOrCreate comment:", error);
    return res
      .status(500)
      .json({
        message: "Error during findOrCreate comment",
        error: error.message,
      });
  }
};

export const searchComments = async (req, res, next) => {
  try {
    const { word } = req.query;

    if (!word) {
      return res
        .status(400)
        .json({ message: "A 'word' query parameter is required." });
    }

    const { count, rows } = await commentModel.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    if (count === 0) {
      return res.status(404).json({ message: "no comments found." });
    }

    return res.status(200).json({ count, comments: rows });
  } catch (error) {
    console.error("Error during comment search:", error);
    return res
      .status(500)
      .json({ message: "Error during comment search", error: error.message });
  }
};

export const getNewestComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await commentModel.findAll({
      where: { postId: postId },

      order: [["createdAt", "DESC"]],

      limit: 3,
    });

    return res.status(200).json({ message: "Done", comments });
  } catch (error) {
    console.error("Error fetching newest comments:", error);
    return res
      .status(500)
      .json({
        message: "Error fetching newest comments",
        error: error.message,
      });
  }
};



export const getCommentWithDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await commentModel.findByPk(id, {
            attributes: ['id', 'content'],
            include: [
                {
                    model: userModel,
                    attributes: [
                        ['u_id', 'id'],
                        ['u_name', 'name'],
                        ['u_email', 'email']
                    ]
                },
                {
                    model: postModel,
                    attributes: ['id', 'title', 'content']
                }
            ]
        });

        if (!comment) {
            return res.status(404).json({ message: "no comment found" });
        }

        return res.status(200).json({ message: "Done", comment });

    } catch (error) {
        console.error("Error fetching comment details:", error);
        return res.status(500).json({ message: "Error fetching comment details", error: error.message });
    }
};
