// Import the database configuration
import dbConfig from "../../db-connect.js";

// Fetch all homework assignments
export const getAllHomework = (callback) => {
  const query = "SELECT * FROM homework";
  dbConfig.query(query, callback);
};

// Fetch a specific homework assignment by ID
export const getHomeworkById = (id, callback) => {
  const query = "SELECT * FROM homework WHERE homework_id = ?";
  dbConfig.query(query, [id], callback);
};

// Create a new homework assignment
export const createHomework = (
  assignment_name,
  description,
  due_date,
  is_completed,
  completion_date,
  grade,
  callback
) => {
  const query = `
    INSERT INTO homework (assignment_name, description, due_date, is_completed, completion_date, grade)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  // Execute query
  dbConfig.query(
    query,
    [
      assignment_name,
      description,
      due_date,
      is_completed,
      completion_date,
      grade,
    ],
    callback
  );
};

// Update an existing homework assignment by ID
export const updateHomework = (
  id,
  assignment_name,
  description,
  due_date,
  is_completed,
  completion_date,
  grade,
  callback
) => {
  const formattedDueDate = new Date(due_date).toISOString().slice(0, 10);
  const formattedCompletionDate = completion_date
    ? new Date(completion_date).toISOString().slice(0, 10)
    : null;

  const query = `
  UPDATE homework
  SET assignment_name = ?, description = ?, due_date = ?, is_completed = ?, completion_date = ?, grade = ?
  WHERE homework_id = ?
`;

  dbConfig.query(
    query,
    [
      assignment_name,
      description,
      formattedDueDate, // Use formatted date here
      is_completed, // Boolean conversion is fine
      formattedCompletionDate, // Use formatted date here
      grade,
      id,
    ],
    callback
  );
};

// Delete a homework assignment by ID
export const deleteHomework = (id, callback) => {
  const query = "DELETE FROM homework WHERE homework_id = ?";
  dbConfig.query(query, [id], callback);
};

// Export all functions as named exports

// Export the functions to be used in the homework routes;

/*import dbConfig from "../../db-connect.js";

const Homework = {
  getAll: (result) => {
    dbConfig.query("SELECT * FROM Homework", (err, res) => {
      if (err) {
        console.error("Error while fetching homework: ", err);
        result(err, null);
        return;
      }
      console.log("Homework: ", res);
      result(null, res);
    });
  },

  getById: (homeworkId, result) => {
    dbConfig.query(
      "SELECT * FROM Homework WHERE id = ?",
      homeworkId,
      (err, res) => {
        if (err) {
          console.error("Error while fetching homework: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Found homework: ", res[0]);
          result(null, res[0]);
          return;
        }

        result({ kind: "not_found" }, null);
      }
    );
  },

  create: (newHomework, result) => {
    dbConfig.query("INSERT INTO Homework SET ?", newHomework, (err, res) => {
      if (err) {
        console.error("Error while creating homework: ", err);
        result(err, null);
        return;
      }
      console.log("Created homework: ", { id: res.insertId, ...newHomework });
      result(null, { id: res.insertId, ...newHomework });
    });
  },

  updateById: (homeworkId, homework, result) => {
    dbConfig.query(
      "UPDATE Homework SET subject = ?, description = ?, dueDate = ? WHERE id = ?",
      [homework.subject, homework.description, homework.dueDate, homeworkId],
      (err, res) => {
        if (err) {
          console.error("Error while updating homework: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated homework with id: ", homeworkId);
        result(null, res);
      }
    );
  },

  deleteById: (homeworkId, result) => {
    dbConfig.query(
      "DELETE FROM Homework WHERE id = ?",
      homeworkId,
      (err, res) => {
        if (err) {
          console.error("Error while deleting homework: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Deleted homework with id: ", homeworkId);
        result(null, res);
      }
    );
  },
};

export default Homework;*/
