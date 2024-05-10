import dbConfig from "../../db-connect.js";
import {
  getAllClassesWithDetails as modelGetAllClassesWithDetails,
  getClassById as modelGetClassById,
  createClass as modelCreateClass,
  updateClass as modelUpdateClass,
  deleteClass as modelDeleteClass,
  findOrInsertTeacher as modelFindOrInsertTeacher,
} from "../models/classModel.js";

// This function retrieves all classes with additional details
const getAllClassesController = (req, res) => {
  modelGetAllClassesWithDetails((error, results) => {
    if (error) {
      console.error("Error in getAllClassesController:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }

    // Respond with the detailed class information
    res.json(results);
  });
};

// Retrieve a single class by its ID
const getClassByIdController = (req, res) => {
  const id = req.params.id;
  modelGetClassById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (result.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    return res.json(result[0]);
  });
};

// Create a new class
const createClassController = (req, res) => {
  const {
    course_name,
    teacher_firstname,
    teacher_lastname,
    teacher_email,
    teacher_number,
    teacher_title,
    duration,
  } = req.body;

  // Validate mandatory input fields
  if (
    !course_name ||
    !teacher_firstname ||
    !teacher_lastname ||
    !teacher_email ||
    !teacher_number ||
    !teacher_title ||
    !duration
  ) {
    return res.status(400).json({
      message:
        "Missing required fields (course_name, teacher_firstname, teacher_lastname, teacher_email, teacher_number, teacher_title, or duration)",
    });
  }

  // Function to find or insert a course
  const findOrInsertCourse = (courseName, callback) => {
    const findQuery =
      "SELECT course_id FROM courses WHERE LOWER(course_name) = LOWER(?)";
    const insertQuery = "INSERT INTO courses (course_name) VALUES (?)";

    dbConfig.query(findQuery, [courseName], (findErr, findResults) => {
      if (findErr) return callback(findErr);

      if (findResults.length > 0) {
        return callback(null, findResults[0].course_id);
      }

      // Insert a new course if not found
      dbConfig.query(insertQuery, [courseName], (insertErr, insertResults) => {
        if (insertErr) return callback(insertErr);
        callback(null, insertResults.insertId);
      });
    });
  };

  // Find or insert the teacher and class
  modelFindOrInsertTeacher(
    teacher_firstname,
    teacher_lastname,
    teacher_email,
    teacher_number,
    teacher_title,
    (teacherErr, teacher_id) => {
      if (teacherErr) {
        console.error("Error finding or inserting teacher:", teacherErr);
        return res.status(500).json({
          message: "Internal Server Error",
          error: teacherErr.message,
        });
      }

      findOrInsertCourse(course_name, (courseErr, course_id) => {
        if (courseErr) {
          console.error("Error finding or inserting course:", courseErr);
          return res.status(500).json({
            message: "Internal Server Error",
            error: courseErr.message,
          });
        }

        // Insert the class
        const insertClassQuery =
          "INSERT INTO classes (course_id, teacher_id, duration) VALUES (?, ?, ?)";
        dbConfig.query(
          insertClassQuery,
          [course_id, teacher_id, duration],
          (insertErr, insertResults) => {
            if (insertErr) {
              console.error("Error inserting new class:", insertErr);
              return res.status(500).json({
                message: "Internal Server Error",
                error: insertErr.message,
              });
            }

            // Successfully created the class
            res.status(201).json({ id: insertResults.insertId });
          }
        );
      });
    }
  );
};

// Update an existing class
const updateClassController = (req, res) => {
  const { id } = req.params;
  const { duration } = req.body;
  if (!duration) {
    return res.status(400).json({ message: "Duration is required" });
  }
  modelUpdateClass(id, duration, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    return res.json({ message: "Class updated successfully" });
  });
};

// Delete a class
const deleteClassController = (req, res) => {
  const { id } = req.params;
  modelDeleteClass(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    return res.json({ message: "Class deleted successfully" });
  });
};

// Export all the functions
export {
  getAllClassesController,
  getClassByIdController,
  createClassController,
  updateClassController,
  deleteClassController,
};
