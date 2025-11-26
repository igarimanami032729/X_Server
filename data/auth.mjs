import MongoDB from "mongodb";
import { useVirtualId } from "../db/database.mjs";
import { name } from "ejs";
import mongoose from "mongoose";

// versionKey: Mongoose가 문서를 저장할 때 자동으로 추가하는 _V라는 필드를 설정
const userSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualId(userSchema);
const User = mongoose.model("User", userSchema); //User=컬렉션 기능(이름을 정한 것/항상 단수로 적어야 함 why? 자동으로 복수로 바뀜)

// import { getUsers } from "../db/database.mjs";
// const ObjectID = MongoDB.ObjectId;

// let users = [
//   {
//     id: "1",
//     userid: "apple",
//     password: "1111",
//     name: "김사과",
//     email: "apple@apple.com",
//     url: "https://randomuser.me/api/portraits/women/32.jpg",
//   },
//   {
//     id: "2",
//     userid: "banana",
//     password: "2222",
//     name: "반하나",
//     email: "banana@banana.com",
//     url: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     id: "3",
//     userid: "orange",
//     password: "3333",
//     name: "오렌지",
//     email: "orange@orange.com",
//     url: "https://randomuser.me/api/portraits/men/11.jpg",
//   },
//   {
//     id: "4",
//     userid: "berry",
//     password: "4444",
//     name: "배애리",
//     email: "orange@orange.com",
//     url: "https://randomuser.me/api/portraits/women/52.jpg",
//   },
//   {
//     id: "5",
//     userid: "melon",
//     password: "5555",
//     name: "이메론",
//     email: "orange@orange.com",
//     url: "https://randomuser.me/api/portraits/men/29.jpg",
//   },
// ];

export async function getAll() {
  return auth;
}

export async function getAllByUserid(userid) {
  return auth.filter((auth) => auth.userid === userid);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  return user;
}

export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findById(id) {
  return User.findById(id);
}
