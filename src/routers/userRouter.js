import express from "express";
import { getEdit, postEdit, remove, logout, see, authGithubLogin, callbackGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController.js"
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit")
	.all(protectorMiddleware)
	.get(getEdit)
	.post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/remove", remove);
userRouter.get("/github/auth", publicOnlyMiddleware, authGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, callbackGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id([0-9a-f]{24})", see);

export default userRouter;