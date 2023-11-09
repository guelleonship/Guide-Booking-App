const express = require('express');
const router = express.Router();
const {
    createCourse,
    getAllCourses,
    getCourse,
    deleteCourse,
    updateCourse
} = require("../controllers/courseController");
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.delete('/:id', authMiddleware, deleteCourse);
router.patch('/:id', authMiddleware, updateCourse);

module.exports = router;