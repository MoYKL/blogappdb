import { connection } from "../../DB/connectionDB.js";


export const postBlog = (req, res, next) => {
    const { title, description, user_id } = req.body;

    const findUserQuery = ` select u_id from users where u_id=?`;

    connection.execute(findUserQuery, [user_id], (err, result) => {
      if (err) {
        return res.status(400).json({ message: "fail on query", error: err });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "user not exist" });
      }

      const findQuery = `insert into blogs (b_title,b_description,user_id) values(?,?,?)`;
      connection.execute(
        findQuery,
        [title, description, user_id],
        (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ message: "fail on query", error: err });
          }
          return res.status(200).json({ message: "Done" });
        }
      );
    });
  }

  export const updateBlogs = (req, res, next) => {
    const blogId = req.params.id;
    const { title, description, user_id } = req.body;

    const userQuery = `SELECT * FROM users WHERE u_id = ?`;
    connection.execute(userQuery, [user_id], (err, userResults) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching user", error: err.message });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const blogQuery = `SELECT * FROM blogs WHERE b_id = ?`;
      connection.execute(blogQuery, [blogId], (err, blogResults) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching blog", error: err.message });
        }

        if (blogResults.length === 0) {
          return res.status(404).json({ message: "Blog not found" });
        }

        if (blogResults[0].user_id !== user_id) {
          return res
            .status(403)
            .json({ message: "You are not authorized to update this blog" });
        }

        const updateQuery = `UPDATE blogs SET b_title = ?, b_description = ? WHERE b_id = ? AND user_id = ?`;
        connection.execute(
          updateQuery,
          [title, description, blogId, user_id],
          (err, updateResults) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error updating blog", error: err.message });
            }

            return res.status(200).json({
              message: "Blog updated successfully",
              data: updateResults,
            });
          }
        );
      });
    });
  }

  export const deleteBlogs = (req, res, next) => {
    const blogId = req.params.id;
    const { user_id } = req.body;

    const userQuery = `SELECT * FROM users WHERE u_id = ?`;
    connection.execute(userQuery, [user_id], (err, userResults) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching user", error: err.message });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const blogQuery = `SELECT * FROM blogs WHERE b_id = ?`;
      connection.execute(blogQuery, [blogId], (err, blogResults) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching blog", error: err.message });
        }

        if (blogResults.length === 0) {
          return res.status(404).json({ message: "Blog not found" });
        }

        if (blogResults[0].user_id !== user_id) {
          return res
            .status(403)
            .json({ message: "You are not authorized to delete this blog" });
        }

        const deleteQuery = `DELETE FROM blogs WHERE b_id = ? AND user_id = ?`;
        connection.execute(
          deleteQuery,
          [blogId, user_id],
          (err, deleteResult) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error deleting blog", error: err.message });
            }

            return res
              .status(200)
              .json({ message: "Blog deleted successfully" });
          }
        );
      });
    });
  }

  export const getAllBlogs = (req, res, next) => {
    const findQuery = ` select * from users inner JOIN blogs ON users.u_id=blogs.user_id`;
    connection.execute(findQuery, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "fail on Query, error: err" });
      }
      return res.status(200).json({ message: "Done", result });
    });
  }

  export const bulkCreatCommants = (req, res) => {
    const { comments } = req.body;

    if (!Array.isArray(comments) || comments.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid input. Must include a comments array." });
    }

    // Get all post IDs from input
    const postIds = [...new Set(comments.map((c) => c.postId))];

    const findPostsQuery = `SELECT b_id FROM blogs WHERE b_id IN (?)`;
    connection.query(findPostsQuery, [postIds], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "DB error", error: err.message });

      const validPostIds = results.map((r) => r.b_id);
      const validComments = comments.filter((c) =>
        validPostIds.includes(c.postId)
      );

      if (validComments.length === 0) {
        return res
          .status(400)
          .json({ message: "No valid post IDs found for comments." });
      }

      const values = validComments.map((c) => [c.postId, c.userId, c.content]);

      const insertQuery = `INSERT INTO comments (post_id, user_id, content) VALUES ?`;
      connection.query(insertQuery, [values], (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Insert error", error: err.message });
        return res.status(201).json({ message: "comments created." });
      });
    });
  }

  export const updateCommantsById =  (req, res) => {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const findQuery = `SELECT * FROM comments WHERE id = ?`;
    connection.execute(findQuery, [commentId], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (results.length === 0)
        return res.status(404).json({ message: "comment not found" });

      const comment = results[0];
      if (comment.user_id !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this comment" });
      }

      const updateQuery = `UPDATE comments SET content = ? WHERE id = ?`;
      connection.execute(updateQuery, [content, commentId], (err) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error updating", error: err });
        return res.status(200).json({ message: "Comment updated" });
      });
    });
  }

  export const findOrCreateCouments =(req, res) => {
    const { postId, userId, content } = req.body;

    const findQuery = `SELECT * FROM comments WHERE post_id = ? AND user_id = ? AND content = ?`;
    connection.execute(findQuery, [postId, userId, content], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });

      if (results.length > 0) {
        return res.status(200).json({ comment: results[0], created: false });
      }

      const insertQuery = `INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`;
      connection.execute(
        insertQuery,
        [postId, userId, content],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Insert failed", error: err });

          const newComment = {
            id: result.insertId,
            post_id: postId,
            user_id: userId,
            content,
            createdAt: new Date().toISOString(),
          };
          return res.status(201).json({ comment: newComment, created: true });
        }
      );
    });
  }

  export const searchComentsByWord =  (req, res) => {
    const { word } = req.query;
    const query = `SELECT * FROM comments WHERE content LIKE ?`;
    const searchTerm = `%${word}%`;

    connection.execute(query, [searchTerm], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      if (results.length === 0)
        return res.status(200).json({ message: "no comments found" });

      return res.status(200).json({ count: results.length, comments: results });
    });
  }

  export const get3NewetsComents = (req, res) => {
    const { postId } = req.params;
    const query = `SELECT * FROM comments WHERE post_id = ? ORDER BY createdAt DESC LIMIT 3`;

    connection.execute(query, [postId], (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      return res.status(200).json(results);
    });
  }

  export const GetCommentByIdAndUserPost= (req, res) => {
    const { id } = req.params;

    const query = `
    SELECT 
      c.id AS commentId,
      c.content AS commentContent,
      u.u_id AS userId,
      CONCAT(u.u_fName, ' ', u.u_lName) AS Name,
      u.u_email,
      b.b_id AS blogId,
      b.b_title,
      b.b_description
    FROM comments c
    JOIN users u ON c.user_id = u.u_id
    JOIN blogs b ON c.post_id = b.b_id
    WHERE c.id = ?
  `;

    connection.execute(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "DB error", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "no comment found" });
      }

      const row = results[0];
      const response = {
        id: row.commentId,
        content: row.commentContent,
        user: {
          id: row.userId,
          fullName: row.fullName,
          email: row.u_email,
        },
        post: {
          id: row.blogId,
          title: row.b_title,
          content: row.b_description,
        },
      };

      return res.status(200).json(response);
    });
  }