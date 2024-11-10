import { Router } from "express";
import authorRute from "../modules/author/author.route";
import bookRute from "../modules/book/book.route";

const router = Router();

const moduleRoute = [
  {
    path: "/auth",
    route: authorRute,
  },
  {
    path: "/books",
    route: bookRute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
