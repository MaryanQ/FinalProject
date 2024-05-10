// Import necessary functions
import {
  getAllHomework as modelGetAllHomework,
  getHomeworkById as modelGetHomeworkById,
  createHomework as modelCreateHomework,
  updateHomework as modelUpdateHomework,
  deleteHomework as modelDeleteHomework,
} from "../models/homeworkModel.js";
import { formatToYYYYMMDD } from "../utils/dateUtils.js";

// Utility function to format homework records
const formatHomeworkRecord = (record) => {
  const formattedRecord = { ...record };

  // Convert dates to DD/MM/YYYY using the imported date utility
  if (formattedRecord.due_date) {
    formattedRecord.due_date = formatToYYYYMMDD(formattedRecord.due_date);
  }

  if (formattedRecord.completion_date) {
    formattedRecord.completion_date = formatToYYYYMMDD(
      formattedRecord.completion_date
    );
  }

  // Convert `is_completed` to a boolean
  formattedRecord.is_completed = Boolean(formattedRecord.is_completed);

  return formattedRecord;
};

// Controller to handle fetching all homework assignments
const getAllHomework = (req, res) => {
  modelGetAllHomework((err, results) => {
    if (err) {
      console.error("Error fetching all homework assignments:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Apply the formatting function to each record
    const formattedResults = results.map(formatHomeworkRecord);

    // Return the formatted results
    res.status(200).json(formattedResults);
  });
};

// Controller to handle fetching a homework assignment by ID
// Controller to handle fetching a homework assignment by ID
const getHomeworkById = (req, res) => {
  const homework_id = req.params.id;

  modelGetHomeworkById(homework_id, (err, result) => {
    if (err) {
      console.error("Error fetching homework assignment by ID:", err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Homework assignment not found" });
    }

    // Apply the formatting function before sending the response
    const formattedRecord = formatHomeworkRecord(result[0]);

    res.status(200).json(formattedRecord);
  });
};

// Controller to handle creating a homework assignment
// Controller to handle creating a homework assignment
const createHomework = (req, res) => {
  const { assignment_name, description, due_date, completion_date, grade } =
    req.body;

  const is_completed =
    req.body.is_completed === "true" ||
    req.body.is_completed === "1" ||
    req.body.is_completed === true;

  // Validate input data
  if (
    typeof assignment_name !== "string" ||
    typeof description !== "string" ||
    !due_date ||
    typeof is_completed !== "boolean" ||
    (completion_date && isNaN(Date.parse(completion_date))) ||
    typeof grade !== "string"
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  // Call the model to create a new homework assignment
  modelCreateHomework(
    assignment_name,
    description,
    due_date,
    is_completed,
    completion_date ? new Date(completion_date) : null,
    grade,
    (err, result) => {
      if (err) {
        console.error("Error creating homework assignment:", err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }

      // After creation, fetch the new homework to format it
      const newHomeworkId = result.insertId;
      modelGetHomeworkById(newHomeworkId, (fetchErr, fetchResult) => {
        if (fetchErr) {
          console.error("Error fetching newly created homework:", fetchErr);
          return res.status(500).json({
            message: "Internal Server Error",
            error: fetchErr.message,
          });
        }

        if (fetchResult.length === 0) {
          return res
            .status(404)
            .json({ message: "Newly created homework not found" });
        }

        // Format the fetched record before returning
        const formattedRecord = formatHomeworkRecord(fetchResult[0]);

        res.status(201).json({
          message: "Homework assignment created successfully",
          homework: formattedRecord,
        });
      });
    }
  );
};

// Controller to handle updating a homework assignment
const updateHomework = (req, res) => {
  const homework_id = parseInt(req.params.id, 10);
  const {
    assignment_name,
    description,
    due_date,
    is_completed,
    completion_date,
    grade,
  } = req.body;

  // Validate required fields
  if (
    !assignment_name ||
    !description ||
    !due_date ||
    typeof is_completed === "undefined" ||
    !grade
  ) {
    return res
      .status(400)
      .json({ message: "All required fields are not provided" });
  }

  // Call the model to update the homework assignment
  modelUpdateHomework(
    homework_id,
    assignment_name,
    description,
    due_date,
    is_completed,
    completion_date,
    grade,
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err });
      } else if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Homework assignment not found" });
      }

      // Fetch and format the updated homework assignment
      modelGetHomeworkById(homework_id, (fetchErr, fetchResult) => {
        if (fetchErr) {
          console.error("Error fetching updated homework:", fetchErr);
          return res.status(500).json({
            message: "Internal Server Error",
            error: fetchErr.message,
          });
        }

        if (fetchResult.length === 0) {
          return res
            .status(404)
            .json({ message: "Updated homework not found" });
        }

        // Format the fetched record before returning
        const formattedRecord = formatHomeworkRecord(fetchResult[0]);

        res.status(200).json({
          message: "Homework assignment updated successfully",
          homework: formattedRecord,
        });
      });
    }
  );
};

// Controller to handle deleting a homework assignment
const deleteHomework = (req, res) => {
  const homework_id = req.params.id;

  modelDeleteHomework(homework_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Homework assignment not found" });
    } else {
      return res
        .status(200)
        .json({ message: "Homework assignment deleted successfully" });
    }
  });
};

export {
  getAllHomework,
  getHomeworkById,
  createHomework,
  updateHomework,
  deleteHomework,
};
