import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";

const app = express();

app.use(express.json());

app.use("/post", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(8080, () => {
  // 웹 사이트 포트는 8000부터
  console.log("서버 실행 중");
});
