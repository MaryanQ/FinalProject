import dbConfig from "../../db-connect.js";

export const getAllStudents = (callback) => {
  const query = "SELECT * FROM  students";
  dbConfig.query(query, callback);
};

export const getStudentById = (id, callback) => {
  const query = "SELECT * FROM students WHERE student_id = ?";
  dbConfig.query(query, [id], callback);
};

// Function to fetch all students with their course names
export const getAllStudentsWithCourses = (callback) => {
  const query = `
    SELECT
      s.student_id,
      s.firstname,
      s.lastname,
      s.email,
      s.gender,
      s.number,
      s.course_id,
      c.course_name
    FROM
      Students s
    INNER JOIN
      Courses c ON s.course_id = c.course_id;
  `;

  // Execute the query
  dbConfig.query(query, callback);
};

export const createStudent = (
  firstname,
  lastname,
  email,
  gender,
  number,
  course_name,
  callback
) => {
  // First, find the course ID using the given course_name
  const findCourseQuery = "SELECT course_id FROM courses WHERE course_name = ?";

  dbConfig.query(findCourseQuery, [course_name], (err, courseResults) => {
    if (err) {
      console.error("Error finding course:", err);
      return callback(err);
    }

    // If no course found, return an error message
    if (courseResults.length === 0) {
      return callback(new Error("Course not found"));
    }

    // Extract the course_id from the results
    const course_id = courseResults[0].course_id;

    // Now, insert the student into the Students table
    const insertStudentQuery = `
      INSERT INTO students (firstname, lastname, email, gender, number, course_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Execute the query with all parameters including the retrieved course_id
    dbConfig.query(
      insertStudentQuery,
      [firstname, lastname, email, gender, number, course_id],
      callback // Directly pass the callback here
    );
  });
};
export const updateStudent = (
  student_id,
  firstname,
  lastname,
  email,
  gender,
  number,
  course_name,
  callback
) => {
  // First, find the course ID using the given course_name
  const findCourseQuery = "SELECT course_id FROM courses WHERE course_name = ?";

  dbConfig.query(findCourseQuery, [course_name], (err, courseResults) => {
    if (err) {
      console.error("Error finding course:", err);
      return callback(err);
    }

    // If no course found, return an error message
    if (courseResults.length === 0) {
      return callback(new Error("Course not found"));
    }

    // Extract the course_id from the results
    const course_id = courseResults[0].course_id;

    // Now, update the student record with the resolved course_id
    const updateStudentQuery = `
      UPDATE students
      SET firstname = ?, lastname = ?, email = ?, gender = ?, number = ?, course_id = ?
      WHERE student_id = ?
    `;

    // Execute the update query
    dbConfig.query(
      updateStudentQuery,
      [firstname, lastname, email, gender, number, course_id, student_id],
      callback // Directly pass the callback here
    );
  });
};
export const deleteStudent = (student_id, callback) => {
  const deleteStudentQuery = "DELETE FROM students WHERE student_id = ?";

  // Execute the query
  dbConfig.query(deleteStudentQuery, [student_id], callback);
};

/*const Student = {
  getAll: (callback) => {
    const queryString = `
      SELECT s.student_id, s.firstname, s.lastname, s.email, s.gender, s.number, c.course_name
      FROM Students s
      JOIN Courses c ON s.course_id = c.course_id
      ORDER BY s.firstname;
    `;
    dbConfig.query(queryString, (error, results) => {
      if (error) {
        console.error(error);
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
  getById: (id, callback) => {
    const queryString = `
      SELECT s.student_id, s.firstname, s.lastname, s.email, s.gender, s.number, c.course_name
      FROM Students s
      JOIN Courses c ON s.course_id = c.course_id
      WHERE s.student_id = ?;
    `;
    dbConfig.query(queryString, [id], (error, results) => {
      if (error) {
        console.error(error);
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback({ message: "Student not found" }, null);
      }
      return callback(null, results[0]);
    });
  },

  // Adjusting create method to include course_id
  create: (firstname, lastname, email, gender, number, course_id, callback) => {
    const queryString =
      "INSERT INTO Students (firstname, lastname, email, gender, number, course_id) VALUES (?, ?, ?, ?, ?, ?)";
    dbConfig.query(
      queryString,
      [firstname, lastname, email, gender, number, course_id],
      (error, results) => {
        if (error) {
          console.error(error);
          return callback(error, null);
        }
        return callback(null, {
          message: "Student created successfully",
          student_id: results.insertId,
        });
      }
    );
  },

  // Updating the updateById method to accommodate changes
  updateById: (
    student_id,
    firstname,
    lastname,
    email,
    gender,
    number,
    course_id,
    callback
  ) => {
    const queryString =
      "UPDATE Students SET firstname = ?, lastname = ?, email = ?, gender = ?, number = ?, course_id = ? WHERE student_id = ?";
    dbConfig.query(
      queryString,
      [firstname, lastname, email, gender, number, course_id, student_id],
      (error, results) => {
        if (error) {
          console.error(error);
          return callback(error, null);
        }
        if (results.affectedRows === 0) {
          return callback({ message: "Student not found" }, null);
        }
        return callback(null, { message: "Student updated successfully" });
      }
    );
  },

  // Keeping the deleteById method
  deleteById: (student_id, callback) => {
    const queryString = "DELETE FROM Students WHERE student_id = ?";
    dbConfig.query(queryString, [student_id], (error, results) => {
      if (error) {
        console.error(error);
        return callback(error, null);
      }
      if (results.affectedRows === 0) {
        return callback({ message: "Student not found" }, null);
      }
      return callback(null, { message: "Student deleted successfully" });
    });
  },
};

export default Student;*/
