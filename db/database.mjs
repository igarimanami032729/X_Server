import mysql from "mysql2";
import { config } from "../config.mjs";

const pool = mysql.createPool({
  // 메모리에 계속 남겨둠. 미리 객체를 만들어놓고 사용자들이 들어와 쓸 수 있는(pool)
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

export const db = pool.promise();
