import {
  getAllCourseTeachers,
  addTeacherToCourse,
  deleteTeacherFromCourse,
} from "../models/courseTeacherModel.js";

export const getAllCourseTeachersController = (req, res) => {
  getAllCourseTeachers((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No course-teacher relationships found" });
    }
    return res.json(results);
  });
};

export const addTeacherToCourseController = (req, res) => {
  const { course_id, teacher_id } = req.body; // Assuming these are passed in the body of the POST request.

  if (!course_id || !teacher_id) {
    return res
      .status(400)
      .json({ message: "Both course ID and teacher ID are required" });
  }

  addTeacherToCourse(course_id, teacher_id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Course or teacher not found" });
    }
    return res
      .status(201)
      .json({ message: "Teacher added to course successfully" });
  });
};

export const deleteTeacherFromCourseController = (req, res) => {
  const { course_id, teacher_id } = req.params; // Assuming these are passed as URL parameters.

  if (!course_id || !teacher_id) {
    return res
      .status(400)
      .json({ message: "Both course ID and teacher ID are required" });
  }

  deleteTeacherFromCourse(course_id, teacher_id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No such teacher-course relationship found" });
    }
    return res
      .status(200)
      .json({ message: "Teacher removed from course successfully" });
  });
};
