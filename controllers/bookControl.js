import { Book } from "../models/bookModel.js";

const createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all the required fields: title, author, publish year",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).json({ message: "Book created", data: book });
  } catch (error) {
    console.log("create book err message:", error.message);
    res.status(500).send({ message: error.message });
  }
};

const showAllBooks = async (req, res) => {
  try {
    const allBook = await Book.find({});
    res.status(200).json({ count: allBook.length, data: allBook });
  } catch (error) {
    console.log("show books err message:", error.message);
    res.status(500).send({ message: error.message });
  }
};

const getBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneBook = await Book.findById(id);
    res.status(200).json(oneBook);
  } catch (error) {
    console.log("get book err message:", error.message);
    res.status(404).send({ message: error.message });
  }
};

const updateBookByID = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Please enter all fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    if (!updatedBook) {
      return res
        .status(404)
        .send({ message: "Book not found in data base, error 404" });
    }
    res.status(200).send({ message: "Book updated successfully!" });
  } catch (error) {
    console.log("update err message:", error.message);
    res.status(404).send({ message: error.message });
  }
};

const deleteBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res
        .status(404)
        .send({ message: "Could not find the book you requested!" });
    }
    res.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log("delete err message:", error.message);
    res.status(404).send({ message: error.message });
  }
};

export { createBook, showAllBooks, getBookByID, updateBookByID, deleteBookByID };
