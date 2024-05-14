import dbConfig from "../../db-connect.js";

export const AuthModel = {
  loginUser: (email, password, callback) => {
    const query = "SELECT * FROM login WHERE email = ? AND password = ?";
    dbConfig.query(query, [email, password], callback);
  },
};
