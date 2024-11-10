import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import { IBook } from "./book.interface";

const createBook = async (payload: IBook) => {
  const result = await prisma.book.create({
    data: payload,
  });

  return result;
};

const getBooks = async () => {
  const result = await prisma.book.findMany();
  return result;
};

const getBookByBookId = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });
  return result;
};

const updateBookById = async (id: string, payload: Partial<IBook>) => {
  const isExist = await prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });

  if (!isExist) {
    throw new AppError(404, `Book with id '${id}' not found`);
  }
  const result = await prisma.book.update({
    where: {
      bookId: id,
    },
    data: payload,
  });
  return result;
};

const deleteBookById = async (id: string) => {
  const isExist = await prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });
  if (!isExist) {
    throw new AppError(404, `Book with id '${id}' not found`);
  }
  const result = await prisma.book.delete({
    where: {
      bookId: id,
    },
  });
  return result;
};

export const bookService = {
  createBook,
  getBooks,
  getBookByBookId,
  updateBookById,
  deleteBookById,
};
