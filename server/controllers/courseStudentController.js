import {
  getStudentsWithCourses,
  addStudentToCourse,
  deleteStudentFromCourse,
} from "../models/CourseStudentModal.js";

export const getAllStudentsWithCoursesController = (req, res) => {
  getStudentsWithCourses((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No course-student relationships found" });
    }
    return res.json(results);
  });
};

export const addStudentToCourseController = (req, res) => {
  const { course_id, student_id } = req.body; // Assuming these are passed in the body of the POST request.

  if (!course_id || !student_id) {
    return res
      .status(400)
      .json({ message: "Both course ID and student ID are required" });
  }

  addStudentToCourse(course_id, student_id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Course or student not found" });
    }
    return res
      .status(201)
      .json({ message: "Student added to course successfully" });
  });
};

export const deleteStudentFromCourseController = (req, res) => {
  const { course_id, student_id } = req.params; // Assuming these are passed as URL parameters.

  if (!course_id || !student_id) {
    return res
      .status(400)
      .json({ message: "Both course ID and student ID are required" });
  }

  deleteStudentFromCourse(course_id, student_id, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No such student-course relationship found" });
    }
    return res
      .status(200)
      .json({ message: "Student removed from course successfully" });
  });
};
