import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../models/studentsModel.js";

// Controller to handle fetching all students
export const getAllStudentsController = (req, res) => {
  getAllStudents((err, results) => {
    if (err) {
      console.error("Error fetching all students:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};

// Controller to handle fetching a student by ID
export const getStudentByIdController = (req, res) => {
  const student_id = req.params.id;
  getStudentById(student_id, (err, result) => {
    if (err) {
      console.error("Error fetching student by ID:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(result[0]);
  });
};
// Controller to handle creating a new student
export const createStudentController = (req, res) => {
  const { firstname, lastname, email, gender, number } = req.body;

  // Check for missing fields
  if (!firstname || !lastname || !email || !gender || !number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Use the model function to create the student
  createStudent(
    firstname,
    lastname,
    email,
    gender,
    number,

    (err, result) => {
      if (err) {
        console.error("Error creating student:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res
        .status(201)
        .json({ message: "Student created successfully", id: result.insertId });
    }
  );
};

// Controller to handle updating an existing student
export const updateStudentController = (req, res) => {
  const student_id = req.params.id;
  const { firstname, lastname, email, gender, number } = req.body;

  // Check for missing fields
  if (!firstname || !lastname || !email || !gender || !number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Use the model function to update the student
  updateStudent(
    student_id,
    firstname,
    lastname,
    email,
    gender,
    number,

    (err, result) => {
      if (err) {
        console.error("Error updating student:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student updated successfully" });
    }
  );
};

// Controller to handle deleting a student
export const deleteStudentController = (req, res) => {
  const student_id = req.params.id;
  deleteStudent(student_id, (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  });
};

/*const getAllStudents = async (req, res) => {
  try {
    Student.getAll((error, students) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(students);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    Student.getById(id, (error, student) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createStudent = async (req, res) => {
  try {
    const { firstname, lastname, email, gender, number, course_id } = req.body;
    Student.create(
      firstname,
      lastname,
      email,
      gender,
      number,
      course_id,
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({
          message: "Student created successfully",
          studentId: result.student_id,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, gender, number, course_id } = req.body;
    Student.updateById(
      id,
      firstname,
      lastname,
      email,
      gender,
      number,
      course_id,
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!result) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student updated successfully", student: result });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    Student.deleteById(id, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!result) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
};*/
