import { checkConnectionDB, checkSyncDB } from "./DB/connectionDB.js";
import commentRouter from "./modules/comments/comment.controller.js";
import postRouter from "./modules/posts/post.controller.js";
import userRouter from "./modules/users/user.controller.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  checkConnectionDB();
  checkSyncDB()
  app.use("/users",userRouter)
  app.use("/posts",postRouter)
  app.use("/comments",commentRouter)


};

export default bootstrap;
