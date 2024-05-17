// Import database configuration using `import`
import dbConfig from "../../db-connect.js";
import mysql from "mysql2";

export const getAllCourses = (callback) => {
  const query = "SELECT * FROM Courses";
  dbConfig.query(query, callback);
};

export const getCourseById = (id, callback) => {
  const query = "SELECT * FROM Courses WHERE course_id = ?";
  dbConfig.query(query, [id], callback);
};

export const createCourse = (course_name, duration, callback) => {
  const query = "INSERT INTO Courses (course_name, duration) VALUES (?, ?)";
  dbConfig.query(query, [course_name, duration], callback);
};

export const updateCourse = (id, course_name, duration, callback) => {
  const query =
    "UPDATE Courses SET course_name = ?, duration = ? WHERE course_id  = ?";
  dbConfig.query(query, [course_name, duration, id], callback);
};

export const deleteCourse = (id, callback) => {
  const query = "DELETE FROM Courses WHERE course_id = ?";
  dbConfig.query(query, [id], callback);
};

/*import dbConfig from "../../db-connect.js";

const Course = {
  getAll: (result) => {
    dbConfig.query("SELECT * FROM Courses", (err, res) => {
      if (err) {
        console.error("Error while fetching courses: ", err);
        result(err, null);
        return;
      }
      console.log("Courses: ", res);
      result(null, res);
    });
  },

  getById: (courseId, result) => {
    dbConfig.query(
      "SELECT * FROM Courses WHERE id = ?",
      courseId,
      (err, res) => {
        if (err) {
          console.error("Error while fetching course: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Found course: ", res[0]);
          result(null, res[0]);
          return;
        }

        result({ kind: "not_found" }, null);
      }
    );
  },

  create: (newCourse, result) => {
    dbConfig.query("INSERT INTO Courses SET ?", newCourse, (err, res) => {
      if (err) {
        console.error("Error while creating course: ", err);
        result(err, null);
        return;
      }
      console.log("Created course: ", { id: res.insertId, ...newCourse });
      result(null, { id: res.insertId, ...newCourse });
    });
  },

  updateById: (courseId, course, result) => {
    dbConfig.query(
      "UPDATE Courses SET name = ?, description = ? WHERE id = ?",
      [course.name, course.description, courseId],
      (err, res) => {
        if (err) {
          console.error("Error while updating course: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated course with id: ", courseId);
        result(null, res);
      }
    );
  },

  deleteById: (courseId, result) => {
    dbConfig.query("DELETE FROM Courses WHERE id = ?", courseId, (err, res) => {
      if (err) {
        console.error("Error while deleting course: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Deleted course with id: ", courseId);
      result(null, res);
    });
  },
};

export default Course;*/
