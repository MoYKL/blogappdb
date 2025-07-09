import { Router } from "express";
import { deleteUser, getAllUsers, getProfile, search, singIn, singUp, updateUser } from "./user.service.js";
const userRouter = Router();



  // get all users
  userRouter.get("/users", getAllUsers );

  /// sign up

  userRouter.post("/users/signup", singUp);

  // sign in

  userRouter.post("/users/signin", singIn);

  /// get profile

  userRouter.get("/users/:id/profile", getProfile);

  /// search

  userRouter.get("/users/search", search);

  // update user

  userRouter.patch("/users/update/:id", updateUser);

  // delete user

  userRouter.delete("/users/delete/:id", deleteUser);

export default userRouter

