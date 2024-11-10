import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import returnService from "./return.service";

const returnBook = catchAsyncError(async (req, res) => {
  const borrowId = req.params.borrowId as string;
  await returnService.returnBook(borrowId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book returned successfully",
    data: undefined,
  });
});

export const returnController = { returnBook };
