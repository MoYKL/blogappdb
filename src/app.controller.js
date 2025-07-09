import { checkConnectionDB } from "./DB/connectionDB.js";
import BlogRouter from "./modules/blogs/blog.controller.js";
import userRouter from "./modules/users/user.controller.js";

const bootstrap = (app, express) => {
  checkConnectionDB();
  app.use(express.json());

  app.use(userRouter)
  app.use(BlogRouter)


};

export default bootstrap;
