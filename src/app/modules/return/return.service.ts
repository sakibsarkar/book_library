import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";

const returnBook = async (borrowId: string) => {
  const isExist = await prisma.borrow.findUnique({
    where: {
      borrowId,
    },
  });
  if (!isExist) {
    throw new AppError(
      404,
      `No borrow record found with borrow id '${borrowId}'`
    );
  }
  const result = await prisma.borrow.update({
    where: {
      borrowId: borrowId,
    },
    data: {
      returnDate: new Date(),
    },
  });
  return result;
};

const returnService = {
  returnBook,
};

export default returnService;
