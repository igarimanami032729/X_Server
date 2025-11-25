import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { connectDB } from "./db/database.mjs";

const app = express();

app.use(express.json());

app.use("/post", postsRouter);
app.use("/auth", authRouter);

// app.use("/auth", (req, res, next) => {
//     app.post("/signup", )
//     app.post("/login", )
//     ...
// });

app.use((req, res, next) => {
  res.sendStatus(404);
});

connectDB()
  .then(() => {
    app.listen(config.host.port, () => {
      console.log("서버 실행중!");
    });
  })
  .catch(console.error());

// app.listen(config.host.port, () => {
//   // 웹 사이트 포트는 8000부터
//   console.log("서버 실행 중");
// });
