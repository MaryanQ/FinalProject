import dbConfig from "../../db-connect.js";

export const getStudentsWithCourses = (callback) => {
  const query = `
    SELECT 
      s.student_id,
      s.firstname,
      s.lastname,
      s.email,
      s.number,
      s.gender,
      GROUP_CONCAT(c.course_name ORDER BY c.course_name SEPARATOR ', ') AS courses
    FROM 
      students s
    LEFT JOIN 
      course_students cs ON s.student_id = cs.student_id
    LEFT JOIN 
      courses c ON cs.course_id = c.course_id
    GROUP BY 
      s.student_id;
  `;
  dbConfig.query(query, callback);
};

export const addStudentToCourse = (course_id, student_id, callback) => {
  const query =
    "INSERT INTO course_students (course_id, student_id) VALUES (?, ?)";
  dbConfig.query(query[(course_id, student_id)], callback);
};

export const deleteStudentFromCourse = (course_id, student_id, callback) => {
  const query =
    "DELETE FROM course_students WHERE course_id = ? AND student_id = ?";
  dbConfig.query(query, [course_id, student_id], callback);
};
