import { config } from "../config.mjs";
import Mongoose from "mongoose";

let db;

export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    dbName: "aidetect",
  });
}

// export function getUsers() {
//   return db.collection("users");
// }

// export function getPosts() {
//   return db.collection("posts");
// }

// 스키마에 기능을 추가
// _id값을 문자열로 반환한 id라는 가상 필드 생성
// JSON 또는 객체 변환 시 (응답 보낼 때) virtual 필드도 포함하도록 설정
export function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtual: true });
  schema.set("toObject", { virtual: true });
}
