import express from "express";
import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  getMyClassRoutine   
} from "../controllers/classController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL CLASSES
router.get("/", protect, authorize("schooladmin", "teacher") , getClasses);

// CREATE CLASS
router.post("/", protect, authorize("schooladmin", "teacher"), createClass);

// UPDATE CLASS
router.put("/:id", protect, authorize("schooladmin", "teacher"), updateClass);

// DELETE CLASS
router.delete("/:id", protect, authorize("schooladmin", "teacher"), deleteClass);


router.get("/my-routine", protect, getMyClassRoutine);

export default router;