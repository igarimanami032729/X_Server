import * as UserRepository from "./auth.mjs";
import mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";
const postSchema = new mongoose.Schema(
  {
    text: { type: String, require: true },
    userIdx: { type: String, require: true },
    name: { type: String, require: true },
    userid: { type: String, require: true },
    url: String,
  },
  { timestamps: true }
);
useVirtualId(postSchema);
const Post = mongoose.model("Post", postSchema);

// import MongoDB, { ReturnDocument } from "mongodb";
// import { getPosts } from "../db/database.mjs";
// import * as UserRepository from "./auth.mjs";

// const ObjectID = MongoDB.ObjectId;

// // let posts = [
// //   {
// //     id: "1",
// //     name: "김사과",
// //     userid: "apple",
// //     text: "Node.js 배우는 중인데 Express 진짜 편하다! 🚀",
// //     createdAt: Date.now().toString(),
// //     url: "https://randomuser.me/api/portraits/women/32.jpg",
// //   },
// //   {
// //     id: "2",
// //     name: "오렌지",
// //     userid: "orange",
// //     text: "오늘의 커피 ☕ + 코딩 = 최고의 조합!",
// //     createdAt: Date.now().toString(),
// //     url: "https://randomuser.me/api/portraits/men/44.jpg",
// //   },
// //   {
// //     id: "3",
// //     name: "이메론",
// //     userid: "melon",
// //     text: "Elasticsearch 연동 완료! 실시간 검색 API 짜릿해 🔍",
// //     createdAt: Date.now().toString(),
// //     url: "https://randomuser.me/api/portraits/men/11.jpg",
// //   },
// //   {
// //     id: "4",
// //     name: "반하나",
// //     userid: "banana",
// //     text: "JavaScript 비동기 너무 어렵다... Promises, async/await, 뭐가 뭔지 😭",
// //     createdAt: Date.now().toString(),
// //     url: "https://randomuser.me/api/portraits/women/52.jpg",
// //   },
// //   {
// //     id: "5",
// //     name: "채리",
// //     userid: "cherry",
// //     text: "새 프로젝트 시작! Express + MongoDB + EJS 조합 좋아요 💡",
// //     createdAt: Date.now().toString(),
// //     url: "https://randomuser.me/api/portraits/women/29.jpg",
// //   },
// // ];

// 모든 포스트를 리턴

//  모든 포스트 리턴하기
export async function getAll() {
  return Post.find().sort({ createAt: -1 });
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return Post.find({ userid }).sort({ createdAt: -1 });
}

// 글 번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  // find() : 배열에서 조건을 만족하는 첫번째 요소만 리턴
  return Post.findById(id);
}

// 포스트를 작성
export async function create(text, id) {
  return UserRepository.findById(id).then((user) =>
    new Post({
      text,
      userIdx: id,
      name: user.name,
      userid: user.userid,
      url: user.url,
    }).save()
  );
}

// 포스트를 변경
export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text }, { returnDocument: "after" });
}

// 포스트를 삭제하기
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}
