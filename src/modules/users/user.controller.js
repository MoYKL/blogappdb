import { Router } from "express";
import { getProfile,getProfileByEmail,singUp, updateUser } from "./user.service.js";
const userRouter = Router();



  userRouter.post("/signup", singUp);

  userRouter.get("/search/:email", getProfileByEmail);


  userRouter.get("/:id", getProfile);



  userRouter.put("/:id", updateUser);



export default userRouter

