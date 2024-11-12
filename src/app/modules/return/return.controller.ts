import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import AppError from "../../errors/AppError";
import returnService from "./return.service";

const returnBook = catchAsyncError(async (req, res) => {
  const borrowId = req.body.borrowId as string;
  if (!borrowId) {
    throw new AppError(400, "Borrow id is required");
  }
  await returnService.returnBook(borrowId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book returned successfully",
    data: undefined,
  });
});

export const returnController = { returnBook };
