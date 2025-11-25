import MongoDB, { ReturnDocument } from "mongodb";
import { getPosts } from "../db/database.mjs";
import * as UserRepository from "./auth.mjs";

const ObjectID = MongoDB.ObjectId;

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
export async function getAll() {
  return getPosts().find().sort({ createdAt: -1 }).toArray();
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return getPosts().find({ userid }).sort({ createdAt: -1 }).toArray();
}

// 글 번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  // find() : 배열에서 조건을 만족하는 첫번째 요소만 리턴
  return getPosts()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalPost);
}

// 포스트를 작성
export async function create(text, id) {
  return UserRepository.findById(id)
    .then((user) =>
      getPosts().insertOne({
        text,
        createdAt: new Date(),
        idx: user.id,
        name: user.name,
        userid: user.userid,
        url: user.url,
      })
    )
    .then((result) => {
      return getPosts().findOne({ _id: result.insertedId });
    });
}

// 포스트를 변경
export async function update(id, text) {
  return getPosts()
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((result) => result);
}

// 포스트를 삭제하기
export async function remove(id) {
  return getPosts().deleteOne({ _id: new ObjectID(id) });
}

function mapOptionalPost(post) {
  return post ? { ...post, id: post._id.toString() } : post;
}
