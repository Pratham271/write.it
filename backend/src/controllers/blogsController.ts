import { Context } from "hono";
import zod from 'zod';

import { StatusCodes } from "./userController";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { UpdateBlogInput, createBlogSchema, updateBlogSchema, CreateBlogInput } from "@prathamchauhan/write.it";
// import { CreateBlogInput } from '../../../common/dist/index';



export async function createBlog(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body:CreateBlogInput = await c.req.json()
    try {
       const parsedData = createBlogSchema.safeParse(body)
       if(!parsedData.success){
            return c.body("Too short for a blog",StatusCodes.BADREQUEST)
       }
       const newBlog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            published: true,
            imageLink: body.imageLink,
            authorId: c.get("userId")
        },
       })
       return c.json({
        message: "Blog created successfully",
        newBlog 
       },StatusCodes.CREATED)
    } catch (error:any) {
        return c.body(error.message, StatusCodes.SERVERERROR)
    }
}

export async function updateBlog(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body:UpdateBlogInput = await c.req.json()
    try { 
        const parsedData = updateBlogSchema.safeParse(body)
        if(!parsedData.success){
            return c.body("Invalid Inputs",StatusCodes.BADREQUEST)
        }
        const user = await prisma.user.findUnique({
            where: {
                id: c.get("userId")
            }
        })
        if(!user){
            return c.body("Not authorized", StatusCodes.FORBIDDEN)
        }
        const updatedBlog = await prisma.blog.update({
            where: {
                id: c.req.param("id")
            },
            data: {
                title: body.title,
                content: body.content,
                
            }
        })
        return c.json({
            message: "Updated the blog successfully",
            updatedBlog
        },StatusCodes.SUCCESS)
    } catch (error:any) {
        return c.body(error.message,StatusCodes.SERVERERROR)
    }
}

export async function getBlogById(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const id = c.req.param("id")
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                imageLink: true,
                title: true,
                content: true,
                authorId: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if(!blog){
            return c.body("No blogs found",StatusCodes.NOTFOUND)
        }
        return c.json({
            message: "Found the blog",
            blog
        },StatusCodes.SUCCESS)
    } catch (error:any) {
        return c.body(error.message,StatusCodes.SERVERERROR)
    }
}

export async function getAllBlogs(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const filter = c.req.query("filter")
    const cursor = Number(c.req.query("cursor")|| "0")
    const pageSize = Number(c.req.query("pageSize") || "10");

        const allBlogs = await prisma.blog.findMany({
            take: pageSize,
            skip: cursor,
            
            where: {
                title : {
                    contains: filter,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                title: true,
                imageLink: true,
                content: true,
                authorId: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                id: 'asc'
            }
        })
    return c.json({
        allBlogs
    },StatusCodes.SUCCESS)
}

export async function deleteBlogById(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = c.req.param("id")

    const deleteBlog = await prisma.blog.delete({
        where: {
            id: id
        }
    })
    return c.json({
        deleteBlog
    },StatusCodes.SUCCESS)
}

// export async function deleteAllBlogs(c:Context){
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL
//     }).$extends(withAccelerate()) 

//     await prisma.blog.deleteMany({})
//     return c.body("deleted all the blogs")
// }