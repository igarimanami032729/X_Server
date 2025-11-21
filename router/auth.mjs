import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();
// router.post("/signup", (req, res, next) => {
//   const { userid, password, name, email } = req.body;
//   const user = authRepository.createUser(userid, password, name, email);
//   if (user) {
//     res.status(200).json(user);
//   }
// });

// 회원 가입
router.post("/signup", authController.signup);

// 로그인
router.post("/login", authController.login);

// 로그인 유지

export default router;
