import { Book } from "../models/bookModel.js";
import express from "express";
import {
  createBook,
  showAllBooks,
  getBookByID,
  updateBookByID,
  deleteBookByID,
} from "../controllers/bookControl.js";

const router = express.Router();

router.route("/").post(createBook).get(showAllBooks);
router.route("/:id").get(getBookByID).put(updateBookByID).delete(deleteBookByID);

export default router;
