import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import { bookService } from "./book.service";

const createBook = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await bookService.createBook(body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Book created successfully",
    data: result,
  });
});
const getBooks = catchAsyncError(async (_req, res) => {
  const result = await bookService.getBooks();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Books retrieved successfully",
    data: result,
  });
});
const getBookByBookId = catchAsyncError(async (req, res) => {
  const bookId = req.params.bookId as string;
  const result = await bookService.getBookByBookId(bookId);
  sendResponse(res, {
    success: Boolean(result),
    statusCode: result ? 200 : 404,
    message: result
      ? "Book retrieved successfully"
      : `Book with id '${bookId}' not found`,
    data: result,
  });
});

const updateBookById = catchAsyncError(async (req, res) => {
  const bookId = req.params.bookId as string;
  const { body } = req;
  const result = await bookService.updateBookById(bookId, body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBookById = catchAsyncError(async (req, res) => {
  const bookId = req.params.bookId as string;
  await bookService.deleteBookById(bookId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book successfully deleted",
    data: undefined,
  });
});

export const boockController = {
  createBook,
  getBooks,
  getBookByBookId,
  updateBookById,
  deleteBookById,
};
