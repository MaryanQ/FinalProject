import express from "express";
//framework for node.js. designed to build web applications and APIs.
//most popular node framework
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import authRouter from "./server/routes/auth/index.js";
import studentRouter from "./server/routes/studentRouter.js";
import teacherRouter from "./server/routes/teacherRouter.js";
import homeworkRouter from "./server/routes/homeworkRouter.js";

import attendanceRouter from "./server/routes/attendanceRouter.js";
//import homeworkRouter from "./server/routes/homework.js";
import courseRouter from "./server/routes/courseRouter.js";
import classRouter from "./server/routes/classRouter.js";

/*import { loginUser, logoutUser } from "./server/controllers/authController.js";

import {
  getAllAttendances,
  getAttendanceById,
  createAttendance,
  updateAttendanceById,
  deleteAttendanceById,
} from "./server/controllers/attendanceController.js";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} from "./server/controllers/coursesController.js";

import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
} from "./server/controllers/studentsController.js";

import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacherById,
  deleteTeacherById,
} from "./server/controllers/teachersController.js";
*/
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

//({
//origin: "https://proud-stone-0ef859703.5.azurestaticapps.net",
//methods: ["GET", "POST", "PUT", "DELETE"],
//credentials: true,
//})
//);
//);
app.use("/auth", authRouter);
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);
app.use("/attendance", attendanceRouter);
app.use("/homework", homeworkRouter);
app.use("/courses", courseRouter);
app.use("/classes", classRouter);

/*
authRouter.post("/logout", logoutUser);
authRouter.post("/login", loginUser);

studentsRouter.get("/", getAllStudents);
studentsRouter.get("/:id", getStudentById);
studentsRouter.post("/", createStudent);
studentsRouter.put("/:id", updateStudentById);
studentsRouter.delete("/:id", deleteStudentById);

// Define teacher routes
teachersRouter.get("/", getAllTeachers);
teachersRouter.get("/:id", getTeacherById);
teachersRouter.post("/", createTeacher);
teachersRouter.put("/:id", updateTeacherById);
teachersRouter.delete("/:id", deleteTeacherById);

coursesRouter.get("/", getAllCourses);
coursesRouter.get("/:id", getCourseById);
coursesRouter.post("/", createCourse);
coursesRouter.put("/:id", updateCourseById);
coursesRouter.delete("/:id", deleteCourseById);

// Define attendance routes
attendanceRouter.get("/", getAllAttendances);
attendanceRouter.get("/:id", getAttendanceById);
attendanceRouter.get("/:id", getAttendanceById);
attendanceRouter.post("/", createAttendance);
attendanceRouter.put("/:id", updateAttendanceById);
attendanceRouter.delete("/:id", deleteAttendanceById);
*/

const port = 4000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/", (req, res) => {
  res.send("Hello, this is the backend.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
