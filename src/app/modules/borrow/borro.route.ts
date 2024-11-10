import { Router } from "express";
import { validSchema } from "../../middlewares/validator";
import { borrowController } from "./borrow.controller";
import { borrowBookValidation } from "./borrow.validation";

const router = Router();
router.get("/overdue", borrowController.borrowOverDueList);
router.post(
  "/",
  validSchema(borrowBookValidation),
  borrowController.createBorrow
);

const borrowRoute = router;

export default borrowRoute;
