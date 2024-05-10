import dbConfig from "../../db-connect.js";

// Retrieve all teachers
export const getAllTeachers = (callback) => {
  const query = "SELECT * FROM Teachers";
  dbConfig.query(query, callback);
};

// Retrieve a teacher by ID
export const getTeacherById = (teacher_id, callback) => {
  const query = "SELECT * FROM Teachers WHERE teacher_id = ?";
  dbConfig.query(query, [teacher_id], callback);
};

// Create a new teacher
export const createTeacher = (
  firstname,
  lastname,
  email,
  number,
  title,
  callback
) => {
  const query = `
    INSERT INTO Teachers (firstname, lastname, email, number, title)
    VALUES (?, ?, ?, ?, ?)
  `;
  dbConfig.query(query, [firstname, lastname, email, number, title], callback);
};

// Update an existing teacher
export const updateTeacher = (
  teacher_id,
  firstname,
  lastname,
  email,
  number,
  title,
  callback
) => {
  const query = `
    UPDATE Teachers
    SET firstname = ?, lastname = ?, email = ?, number = ?, title = ?
    WHERE teacher_id = ?
  `;
  dbConfig.query(
    query,
    [firstname, lastname, email, number, title, teacher_id],
    callback
  );
};

// Delete a teacher
export const deleteTeacher = (teacher_id, callback) => {
  const query = "DELETE FROM Teachers WHERE teacher_id = ?";
  dbConfig.query(query, [teacher_id], callback);
};

// Export all model functions

/*const Teacher = {
  getAll: (result) => {
    dbConfig.query("SELECT * FROM Teachers", (err, res) => {
      if (err) {
        console.error("Error while fetching teachers: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  },

  getById: (teacherId, result) => {
    dbConfig.query(
      "SELECT * FROM Teachers WHERE teacher_id = ?",
      [teacherId],
      (err, res) => {
        if (err) {
          console.error("Error fetching teacher: ", err);
          result(err, null);
          return;
        }
        if (res.length === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, res[0]);
      }
    );
  },

  create: (newTeacher, result) => {
    dbConfig.query("INSERT INTO Teachers SET ?", newTeacher, (err, res) => {
      if (err) {
        console.error("Error while creating teacher: ", err);
        result(err, null);
        return;
      }
      console.log("Created teacher: ", { id: res.insertId, ...newTeacher });
      result(null, { id: res.insertId, ...newTeacher });
    });
  },

  updateById: (teacherId, teacher, result) => {
    dbConfig.query(
      "UPDATE Teachers SET ? WHERE teacher_id = ?",
      [teacher, teacherId],
      (err, res) => {
        if (err) {
          console.error("Error updating teacher: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, { id: teacherId, ...teacher });
      }
    );
  },

  deleteById: (teacherId, result) => {
    dbConfig.query(
      "DELETE FROM Teachers WHERE teacher_id = ?",
      [teacherId],
      (err, res) => {
        if (err) {
          console.error("Error deleting teacher: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, res);
      }
    );
  },
};

export default Teacher;*/
