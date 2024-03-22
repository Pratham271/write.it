import { PrismaClient } from "@prisma/client/edge";
import { Context, Hono } from "hono";
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const blogsRouter = new Hono()

blogsRouter.post("/blog", authMiddleware,createBlog)

blogsRouter.put("/blog/update/:id", authMiddleware, updateBlog)

blogsRouter.get("/blog/bulk", getAllBlogs)
blogsRouter.get("/blog/:id", getBlogById)


blogsRouter.delete("/blog/delete/:id", deleteBlogById)
export default blogsRouter