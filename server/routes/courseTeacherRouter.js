import { Router } from "express";

import {
  getAllCourseTeachersController,
  addTeacherToCourseController,
  deleteTeacherFromCourseController,
} from "../controllers/CourseTeacherController.js";

const courseTeacherRouter = Router();

courseTeacherRouter.get("/", getAllCourseTeachersController),
  courseTeacherRouter.post("/", addTeacherToCourseController);
courseTeacherRouter.delete("/", deleteTeacherFromCourseController);

export default courseTeacherRouter;
