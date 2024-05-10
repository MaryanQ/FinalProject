import {
  getAllAttendance as modelGetAllAttendance,
  getAttendanceById as modelGetAttendanceById,
  createAttendance as modelCreateAttendance,
  updateAttendance as modelUpdateAttendance,
  deleteAttendance as modelDeleteAttendance,
} from "../models/attendanceModel.js";

import { formatToYYYYMMDD } from "../utils/dateUtils.js";

const getAllAttendanceController = (req, res) => {
  // Fetch all attendance records
  modelGetAllAttendance((error, results) => {
    if (error) {
      console.error("Error in getAllAttendanceController:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }

    // Map over results to format each attendance date
    const formattedResults = results.map((record) => {
      // Convert attendance_date to DD/MM/YYYY format
      const formattedDate = formatToYYYYMMDD(record.attendance_date);
      return {
        ...record,
        attendance_date: formattedDate, // Replace with the formatted date
      };
    });

    // Send back the modified results with formatted dates
    res.json(formattedResults);
  });
};

const getAttendanceByIdController = (req, res) => {
  const { id } = req.params;

  // Fetch a single attendance record by ID
  modelGetAttendanceById(id, (error, result) => {
    if (error) {
      console.error("Error in getAttendanceByIdController:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    } else if (result.length === 0) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // Extract the single record and format the date
    const record = result[0];
    const formattedDate = formatToYYYYMMDD(record.attendance_date);

    // Return the formatted record
    res.json({
      ...record,
      attendance_date: formattedDate, // Replace the original date with the formatted date
    });
  });
};

const createAttendanceController = (req, res) => {
  let { attendance_date, is_present } = req.body;
  // Use the YYYY-MM-DD format required by MySQL
  attendance_date = formatToYYYYMMDD(attendance_date);

  modelCreateAttendance(attendance_date, is_present, (error, result) => {
    if (error) {
      // Log the error for debugging purposes
      console.error("Error in createAttendanceController:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
    res.status(201).json({
      message: "Attendance created successfully",
      attendanceId: result.insertId,
    });
  });
};

const updateAttendanceController = (req, res) => {
  const { id } = req.params;
  let { attendance_date, is_present } = req.body; // Use `let` instead of `const`

  // Ensure the attendance_date is formatted to YYYY-MM-DD (required by MySQL)
  const formattedDate = formatToYYYYMMDD(attendance_date);

  // Update the attendance record
  modelUpdateAttendance(id, formattedDate, is_present, (error, result) => {
    if (error) {
      console.error("Error in updateAttendanceController:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // Return success message after updating
    res.json({ message: "Attendance updated successfully" });
  });
};

const deleteAttendanceController = (req, res) => {
  const { id } = req.params;
  modelDeleteAttendance(id, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.json({ message: "Attendance deleted successfully" });
  });
};

export {
  getAllAttendanceController,
  getAttendanceByIdController,
  createAttendanceController,
  updateAttendanceController,
  deleteAttendanceController,
};

/*import dbConfig from "../../db-connect.js";
import Attendance from "../models/attendanceModel.js";

const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAttendance = async (req, res) => {
  try {
    const { students_id, class_id, attendance_date, is_present } = req.body;
    const newAttendance = new Attendance({
      students_id,
      class_id,
      attendance_date,
      is_present,
    });
    await newAttendance.save();
    res.status(201).json({
      message: "Attendance created successfully",
      attendance: newAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAttendanceById = async (req, res) => {
  try {
    // Extracting necessary data from request
    const { id } = req.params; // This 'id' should map to 'attendance_id' in your DB
    const { student_id, class_id, attendance_date, is_present } = req.body;

    // Constructing the SQL query
    const sql = `
      UPDATE Attendance
      SET student_id = ?, class_id = ?, attendance_date = ?, is_present = ?
      WHERE attendance_id = ?;
    `;

    // Executing the SQL query with the provided values
    const [results] = await dbConfig.execute(sql, [
      student_id || null, // Handling potential null values
      class_id || null,
      attendance_date || null,
      is_present !== undefined ? is_present : null,
      id,
    ]);

    // Checking if the update was successful
    if (results.affectedRows === 0) {
      // If no rows were affected, it means the attendance with the given ID was not found
      return res.status(404).json({ message: "Attendance not found" });
    }

    // Sending the success response
    res.json({
      message: "Attendance updated successfully",
      attendance: {
        attendance_id: id,
        student_id,
        class_id,
        attendance_date,
        is_present,
      },
    });
  } catch (error) {
    // Handling any errors that occur during the update process
    console.error("Failed to update attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.getByIdAndDelete(id);
    if (!deletedAttendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.json({
      message: "Attendance deleted successfully",
      attendance: deletedAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllAttendances,
  getAttendanceById,
  createAttendance,
  updateAttendanceById,
  deleteAttendanceById,
};
*/
