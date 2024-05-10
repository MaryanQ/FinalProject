import dbConfig from "../../db-connect.js";

export const AuthModel = {
  loginUser: (email, password, callback) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    dbConfig.query(sql, [email, password], callback);
  },
};
