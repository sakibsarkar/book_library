import { Router } from "express";
import authorRute from "../modules/author/author.route";
import bookRute from "../modules/book/book.route";
import memberRoutes from "../modules/member/member.route";

const router = Router();

const moduleRoute = [
  {
    path: "/author",
    route: authorRute,
  },
  {
    path: "/books",
    route: bookRute,
  },
  {
    path: "/members",
    route: memberRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
