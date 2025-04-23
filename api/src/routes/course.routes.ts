// src/routes/course.routes.ts

import { Router } from 'express';
import * as courseController from '../controllers/course.controller.js';

const courseRoutes = Router();

// Route to create a new course (Admin only)
courseRoutes.post('/admin/courses', courseController.createCourseController);

// Route to update an existing course by ID
courseRoutes.put('/admin/courses/:course_id', courseController.updateCourseController);

// Route to delete a course by ID
courseRoutes.delete('/admin/courses/:course_id', courseController.deleteCourseController);

// Route to publish a course (sets isPublished to true)
courseRoutes.patch('/admin/courses/:course_id/publish', courseController.publishCourseController);

export default courseRoutes;
