import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import { memberService } from "./member.service";

const createMember = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await memberService.createMember(body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Member created successfully",
    data: result,
  });
});

const getMembers = catchAsyncError(async (_req, res) => {
  const result = await memberService.getMembers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getMemberByMemberId = catchAsyncError(async (req, res) => {
  const memberId = req.params.memberId as string;
  const result = await memberService.getMemberByMemberId(memberId);
  sendResponse(res, {
    success: Boolean(result),
    statusCode: result ? 200 : 404,
    message: result
      ? "Member retrieved successfully"
      : `Member with id ${memberId} not found`,
    data: result || undefined,
  });
});

const deleteMember = catchAsyncError(async (req, res) => {
  const memberId = req.params.memberId as string;
  await memberService.deleteMember(memberId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Member deleted successfully",
    data: undefined,
  });
});

const updateMember = catchAsyncError(async (req, res) => {
  const memberId = req.params.memberId as string;
  const { body } = req;
  const result = await memberService.updateMember(memberId, body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Member updated successfully",
    data: result,
  });
});

export const memberController = {
  createMember,
  getMembers,
  getMemberByMemberId,
  deleteMember,
  updateMember,
};
