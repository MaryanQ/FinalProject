import dbConfig from "../../db-connect.js";

/*export const getAllClasses = (callback) => {
  const query = "SELECT * FROM classes";
  dbConfig.query(query, callback);
};*/

export const getAllClassesWithDetails = (callback) => {
  const query = `
    SELECT
      classes.class_id,
      courses.course_name,
      teachers.firstname AS teacher_name,
      classes.duration
    FROM
      classes
    LEFT JOIN
      courses ON classes.course_id = courses.course_id
    LEFT JOIN
      teachers ON classes.teacher_id = teachers.teacher_id
  `;

  // Execute the query and return results through the callback
  dbConfig.query(query, (error, results) => {
    callback(error, results);
  });
};

export const findOrInsertTeacher = (
  firstname,
  lastname,
  email,
  number,
  title,
  callback
) => {
  const findQuery = `
    SELECT teacher_id FROM teachers
    WHERE LOWER(firstname) = LOWER(?) AND LOWER(lastname) = LOWER(?) AND
    LOWER(email) = LOWER(?) AND number = ? AND title = ?
  `;
  const insertQuery = `
    INSERT INTO teachers (firstname, lastname, email, number, title)
    VALUES (?, ?, ?, ?, ?)
  `;

  dbConfig.query(
    findQuery,
    [firstname, lastname, email, number, title],
    (findErr, findResults) => {
      if (findErr) return callback(findErr);

      if (findResults.length > 0) {
        return callback(null, findResults[0].teacher_id);
      }

      // Insert a new teacher if not found
      dbConfig.query(
        insertQuery,
        [firstname, lastname, email, number, title],
        (insertErr, insertResults) => {
          if (insertErr) return callback(insertErr);
          callback(null, insertResults.insertId);
        }
      );
    }
  );
};

export const getClassById = (id, callback) => {
  const query = "SELECT * FROM classes WHERE class_id = ?";
  dbConfig.query(query, [id], callback);
};

export const createClass = (duration, callback) => {
  const query = "INSERT INTO classes (duration) VALUES (?)";
  dbConfig.query(query, [duration], callback);
};

export const updateClass = (id, duration, callback) => {
  const query = "UPDATE classes SET duration = ? WHERE class_id = ?";
  dbConfig.query(query, [duration, id], callback);
};

export const deleteClass = (id, callback) => {
  const query = "DELETE FROM classes WHERE class_id = ?";
  dbConfig.query(query, [id], callback);
};
