import { Router } from "express";
import { validSchema } from "../../middlewares/validator";
import { returnController } from "./return.controller";
import { returnValidationSchema } from "./return.validation";

const router = Router();
router.post(
  "/",
  validSchema(returnValidationSchema),
  returnController.returnBook
);
const returnRoute = router;
export default returnRoute;
