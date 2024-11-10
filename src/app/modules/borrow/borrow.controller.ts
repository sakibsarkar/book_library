import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import { borrowService } from "./borrow.service";

const createBorrow = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await borrowService.createBorrow(body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Book borrowed successfully",
    data: {
      ...result,
      returnDate: undefined,
    },
  });
});

const borrowOverDueList = catchAsyncError(async (_req, res) => {
  const result = await borrowService.borrowOverDueList();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: result ? "Overdue borrow list fetched" : "No overdue books",
    data: result || [],
  });
});

export const borrowController = { createBorrow, borrowOverDueList };
