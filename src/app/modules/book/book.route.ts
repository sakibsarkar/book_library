import { Router } from "express";
import { validSchema } from "../../middlewares/validator";
import { boockController } from "./book.controller";
import bookValidationSchema from "./book.validation";
const router = Router();

router.post(
  "/",
  validSchema(bookValidationSchema.create),
  boockController.createBook
);
router.get("/", boockController.getBooks);
router.get("/:bookId", boockController.getBookByBookId);
router.put(
  "/:bookId",
  validSchema(bookValidationSchema.update),
  boockController.updateBookById
);
router.delete("/:bookId", boockController.deleteBookById);

const bookRute = router;

export default bookRute;
