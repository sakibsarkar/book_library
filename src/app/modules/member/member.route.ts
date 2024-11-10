import { Router } from "express";
import { validSchema } from "../../middlewares/validator";
import { memberController } from "./member.controller";
import memberValidationSchema from "./member.validation";
const router = Router();
router.post(
  "/",
  validSchema(memberValidationSchema.create),
  memberController.createMember
);
router.get("/", memberController.getMembers);
router.get("/:memberId", memberController.getMemberByMemberId);
router.put(
  "/:memberId",
  validSchema(memberValidationSchema.update),
  memberController.getMemberByMemberId
);
router.delete("/:memberId", memberController.deleteMember);

const memberRoutes = router;

export default memberRoutes;
