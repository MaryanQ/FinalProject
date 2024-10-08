// Import functions from your courseModel.js file
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../models/courseModel.js";

// Controller function to get all courses
export const getAllCoursesController = (req, res) => {
  getAllCourses((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (results.length === 0) {
      return res.status(404).json({ message: "Courses not found" });
    }
    return res.json(results);
  });
};

// Controller function to get a course by ID
export const getCourseByIdController = (req, res) => {
  const id = req.params.id;
  getCourseById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (result.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json(result[0]);
  });
};

// Controller function to create a new course
export const createCourseController = (req, res) => {
  const { course_name, duration } = req.body;
  if (!course_name || !duration) {
    return res.status(400).json({ message: "Course name is required" });
  }
  createCourse(course_name, duration, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ id: result.insertId });
  });
};

// Controller function to update a course
export const updateCourseController = (req, res) => {
  const { id } = req.params;
  const { course_name, duration } = req.body;
  if (!course_name || !duration) {
    return res.status(400).json({ message: "Course name is required" });
  }
  updateCourse(id, course_name, duration, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json({ message: "Course updated successfully" });
  });
};

// Controller function to delete a course
export const deleteCourseController = (req, res) => {
  const { id } = req.params;
  deleteCourse(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json({ message: "Course deleted successfully" });
  });
};

// Export all controller functions

/*import Course from "../models/coursesModel.js";

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCourseById = (req, res) => {
  const { id } = req.params;

  Course.getById(id)
    .then((course) => {
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    })
    .catch((error) => {
      console.error("Error fetching course:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const createCourse = async (req, res) => {
  try {
    const { name, description, credits } = req.body;
    const newCourse = new Course({ name, description, credits });
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { name, description, credits } = req.body;
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, description, credits },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully", course: deletedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
};
*/
