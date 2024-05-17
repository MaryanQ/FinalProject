import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../models/teacherModel.js";

// Controller to fetch all teachers
export const getAllTeachersController = (req, res) => {
  getAllTeachers((err, results) => {
    if (err) {
      console.error("Error fetching all teachers:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};

// Controller to fetch a teacher by ID
export const getTeacherByIdController = (req, res) => {
  const teacher_id = req.params.id;
  getTeacherById(teacher_id, (err, result) => {
    if (err) {
      console.error("Error fetching teacher by ID:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(result[0]);
  });
};

// Controller to create a new teacher
export const createTeacherController = (req, res) => {
  const { firstname, lastname, email, number, title } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email) {
    return res
      .status(400)
      .json({ message: "Firstname, lastname, and email are required" });
  }

  createTeacher(firstname, lastname, email, number, title, (err, result) => {
    if (err) {
      console.error("Error creating teacher:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res
      .status(201)
      .json({ message: "Teacher created successfully", id: result.insertId });
  });
};

// Controller to update a teacher
export const updateTeacherController = (req, res) => {
  const teacher_id = req.params.id;
  const { firstname, lastname, email, number, title } = req.body;

  if (!firstname || !lastname || !email) {
    return res
      .status(400)
      .json({ message: "Firstname, lastname, and email are required" });
  }

  updateTeacher(
    teacher_id,
    firstname,
    lastname,
    email,
    number,
    title,
    (err, result) => {
      if (err) {
        console.error("Error updating teacher:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.status(200).json({ message: "Teacher updated successfully" });
    }
  );
};

// Controller to delete a teacher
export const deleteTeacherController = (req, res) => {
  const teacher_id = req.params.id;
  deleteTeacher(teacher_id, (err, result) => {
    if (err) {
      console.error("Error deleting teacher:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  });
};

// Export all controllers

/*import Teacher from "../models/teachersModel.js";

const getAllTeachers = (req, res) => {
  Teacher.getAll((err, teachers) => {
    if (err) {
      console.error("Failed to retrieve all teachers:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(teachers);
  });
};

const getTeacherById = (req, res) => {
  const { id } = req.params;
  Teacher.getById(id, (err, teacher) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: "Teacher not found" });
      } else {
        console.error("Failed to retrieve teacher:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
    res.json(teacher);
  });
};

const createTeacher = (req, res) => {
  const { firstname, lastname, email, number, title } = req.body;

  const newTeacher = { firstname, lastname, email, number, title };

  Teacher.create(newTeacher, (err, teacher) => {
    if (err) {
      console.error("Error creating teacher:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json(teacher);
  });
};

const updateTeacherById = (req, res) => {
  const { id } = req.params;
  const teacherUpdates = req.body;

  Teacher.updateById(id, teacherUpdates, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: "Teacher not found" });
      } else {
        console.error("Error updating teacher:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
    res.json({ message: "Teacher updated successfully" });
  });
};

const deleteTeacherById = (req, res) => {
  const { id } = req.params;
  Teacher.deleteById(id, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ message: "Teacher not found" });
      } else {
        console.error("Error deleting teacher:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
    res.json({ message: "Teacher deleted successfully" });
  });
};

export {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacherById,
  deleteTeacherById,
};*/
