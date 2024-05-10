import {
  getAllStudents as modelGetAllStudents,
  getStudentById as modelGetStudentById,
  getAllStudentsWithCourses as modelGetAllStudentsWithCourses,
  createStudent as modelCreateStudent,
  updateStudent as modelUpdateStudent,
  deleteStudent as modelDeleteStudent,
} from "../models/studentsModel.js";

// Controller to handle fetching all students
const getAllStudentsController = (req, res) => {
  modelGetAllStudents((err, results) => {
    if (err) {
      console.error("Error fetching all students:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};

// Controller to handle fetching all students with their courses
const getAllStudentsWithCoursesController = (req, res) => {
  modelGetAllStudentsWithCourses((err, results) => {
    if (err) {
      console.error("Error fetching students with courses:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};

// Controller to handle fetching a student by ID
const getStudentByIdController = (req, res) => {
  const student_id = req.params.id;
  modelGetStudentById(student_id, (err, result) => {
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
const createStudentController = (req, res) => {
  const { firstname, lastname, email, gender, number, course_name } = req.body;

  // Check for missing fields
  if (!firstname || !lastname || !email || !gender || !number || !course_name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Use the model function to create the student
  modelCreateStudent(
    firstname,
    lastname,
    email,
    gender,
    number,
    course_name,
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
const updateStudentController = (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, email, gender, number, course_name } = req.body;

  // Check for missing fields
  if (!firstname || !lastname || !email || !gender || !number || !course_name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Use the model function to update the student
  modelUpdateStudent(
    id,
    firstname,
    lastname,
    email,
    gender,
    number,
    course_name,
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
const deleteStudentController = (req, res) => {
  const id = req.params.id;
  modelDeleteStudent(id, (err, result) => {
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

export {
  getAllStudentsController,
  getAllStudentsWithCoursesController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
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
