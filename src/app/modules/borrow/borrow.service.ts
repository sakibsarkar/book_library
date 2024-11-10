import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import { IBorrow } from "./borrow.interface";

const createBorrow = async (payload: IBorrow) => {
  const isBookExist = await prisma.book.findUnique({
    where: {
      bookId: payload.bookId,
    },
  });

  if (!isBookExist) {
    throw new AppError(404, `Book with id '${payload.bookId}' not found`);
  }

  const isMemberExist = await prisma.member.findUnique({
    where: {
      memberId: payload.memberId,
    },
  });

  if (!isMemberExist) {
    throw new AppError(404, `Member with id '${payload.memberId}' not found`);
  }

  const isAlreadyBorrowed = await prisma.borrow.findFirst({
    where: {
      bookId: payload.bookId,
      memberId: payload.memberId,
      returnDate: null,
    },
  });

  if (isAlreadyBorrowed) {
    throw new AppError(
      400,
      `Book with id '${payload.bookId}' is already borrowed by member with id '${payload.memberId}' and not returned yet`
    );
  }

  const result = await prisma.borrow.create({
    data: {
      borrowDate: new Date(),
      bookId: payload.bookId,
      memberId: payload.memberId,
    },
  });
  return result;
};

const borrowOverDueList = async () => {
  const today = new Date();
  const overdueBorrowDate = today.setDate(today.getDate() - 14);
  const overdueBorrows = await prisma.borrow.findMany({
    where: {
      AND: [
        { returnDate: null },
        {
          borrowDate: {
            lt: new Date(overdueBorrowDate),
          },
        },
      ],
    },
    include: {
      book: {
        select: { title: true },
      },
      member: {
        select: { name: true },
      },
    },
  });

  if (overdueBorrows.length === 0) {
    return null;
  }

  const result = overdueBorrows.map((borrow) => {
    const dueDate = new Date(borrow.borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    const today = new Date();
    const overdueDays = Math.floor(
      (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      borrowId: borrow.borrowId,
      bookTitle: borrow.book.title,
      borrowerName: borrow.member.name,
      overdueDays,
    };
  });

  return result;
};

export const borrowService = { createBorrow, borrowOverDueList };
