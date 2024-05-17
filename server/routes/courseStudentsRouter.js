import { Router } from "express";

import {
  getAllStudentsWithCoursesController,
  addStudentToCourseController,
  deleteStudentFromCourseController,
} from "../controllers/courseStudentController.js";

const courseStudentsRouter = Router();

courseStudentsRouter.get("/", getAllStudentsWithCoursesController);
courseStudentsRouter.post("/", addStudentToCourseController);
courseStudentsRouter.delete("/course_id", deleteStudentFromCourseController);

export default courseStudentsRouter;
