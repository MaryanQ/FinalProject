import dbConfig from "../../db-connect.js";

const AuthModel = {
  loginUser: (email, password, callback) => {
    const query = "SELECT * FROM login WHERE email = ? AND password = ?";
    dbConfig.query(query, [email, password], callback);
  },
};

export default { AuthModel };
