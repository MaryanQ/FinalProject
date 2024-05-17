import dbConfig from "../../db-connect.js";

export const getAllCourseTeachers = (callback) => {
  const query = "SELECT * FROM course_Teachers";
  dbConfig.query(query, callback);
};

export const addTeacherToCourse = (course_id, teacher_id, callback) => {
  const query =
    "INSERT INTO course_Teachers (course_id, teacher_id) VALUES (?, ?)";
  dbConfig.query(query, [course_id, teacher_id], callback);
};

export const deleteTeacherFromCourse = (course_id, teacher_id, callback) => {
  const query =
    "DELETE FROM course_Teachers WHERE course_id = ? AND teacher_id = ?";
  dbConfig.query(query, [course_id, teacher_id], callback);
};
