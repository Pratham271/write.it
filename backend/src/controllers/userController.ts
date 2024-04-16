import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import zod from 'zod';
import crypto from 'crypto-js'

import { Jwt } from "hono/utils/jwt";
import { SigninInput, SignupInput, UpdateUserInput } from '@prathamchauhan/write.it';
import { signupSchema } from "@prathamchauhan/write.it";



export const enum StatusCodes{
    CREATED     = 201,
    SUCCESS     = 200,
    NOTFOUND    = 404,
    BADREQUEST  = 400,
    FORBIDDEN   = 403,
    WRONGINPUTS = 422,
    SERVERERROR = 500
}
let otp:string;
export async function signup(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body:SignupInput = await c.req.json()
    try {
        const parsedData = signupSchema.safeParse(body)
        if(!parsedData.success){
            return c.body("Invalid Inputs",StatusCodes.WRONGINPUTS)
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if(existingUser){
            return c.body("User already exists try signing in", StatusCodes.FORBIDDEN)
        }
        const hash = String(crypto.SHA256(body.password.toString()))
        await prisma.user.create({
            data:{
                email: body.email,
                name: body.name,
                password: hash
            }
        })
        return c.body("User created successfully",StatusCodes.CREATED)
    } catch (error:any) {
        return c.body(error.message,StatusCodes.SERVERERROR)
    }
}

export async function signin(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body:SigninInput = await c.req.json()
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
                
            }
        })
        if(!existingUser){
            return c.body("User does not exist try signing up",StatusCodes.WRONGINPUTS)
        }
        const verifyPass = crypto.SHA256(body.password).toString() === existingUser.password
        if(!verifyPass){
            return c.body("Incorrect Credentials",StatusCodes.FORBIDDEN)
        }
        const token = await Jwt.sign({id: existingUser.id},c.env.JWT_SECRET)
        return c.json({
            message: "Signedin Successfully",
            token
        },StatusCodes.SUCCESS)
    } catch (error:any) {
        return c.body(error.message,StatusCodes.SERVERERROR)
    }
}

// export async function verifyOTP(c:Context){
//     otp = Math.random().toString(36).substring(2, 8).toUpperCase();  
//     const secret = c.req.header("secret")
    
//     try {
//         if(secret!==c.env.Secret){
//             return c.json({
//                 message: "Invalid Request"
//             },StatusCodes.FORBIDDEN)
//         }
//         const body:{email:string} = await c.req.json()
//         const resend = new Resend(c.env.RESEND_API_KEY);
//         const { data, error } = await resend.emails.send({
//             from: 'Acme <onboarding@resend.dev>',
//             to: ['pratham19csu221@ncuindia.edu'],
//             subject: 'Hello World',
//             html: `<html>
//             <head>
//             <style>
//             /* Define your CSS styles here */
//             body {
//                 font-family: Arial, sans-serif;
//                 text-align: center;
//                 align-items: center;
                
//             }
//             h1 {
//                 color: #0066cc;
//             }
//             .otp {
//                 background-color: lightgray;
//                 padding: 3px;
//                 color: black;
//                 height: 80px;
//                 width: 80px;
//                 display: flex;
//                 flex-direction:column;
//                 justify-content: center;
//                 justify-self: center;
//                 justify-items: center;
//                 align-items: center;
//                 padding-left:40px;
//                 padding-top:50px;
//             }
//             p {
//                 font-size: 16px;
//             }
//             /* Add more styles as needed */
//         </style>
//             </head>
//             <body>
//             <center><h1>Write.it</h1>
//             <strong>Pleased to meet you</strong>
//             <br><br>
//             <p>Thanks for using Write.it, your personal AI blog writer! To help us ensure it's really you, here's the verification code you'll need to sign up:</p>
//             <br><br>
//             <div class="otp"><strong>${otp}</strong></div></center>
//             </body>
//         </html>`,
//           });
        
//           if (error) {
//             return console.error({ error });
//           }
        
//           console.log({ data });
//           return c.json({
//             message: "Email sent successfully"
//           })
//     } catch (error) {
//         return c.json({
//             errorMessage: error
//         })
//     }
// }
export async function getAllUsers(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const filter = c.req.param("filter")
    const allUsers = await prisma.user.findMany({
        where:{
            name: {
                startsWith: filter,
                mode: 'insensitive'
            }
        },
        include: {
            blogs: true
        }
    })

    return c.json({
        allUsers: allUsers.map(user=> ({
            id: user.id,
            email: user.email,
            name: user.name,
            blogs: user.blogs.map(blog=> ({
                id: blog.id,
                title: blog.title,
                content: blog.content,
            }))
        }))
    },StatusCodes.SUCCESS)
}

export async function updateUser(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body:UpdateUserInput = await c.req.json()
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: c.get("userId")
            }
        })
        if(!user){
            return c.body("User does not exist", StatusCodes.NOTFOUND)
        }
        let hash
        if(body.password){
             hash = crypto.SHA256(body.password).toString()
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: c.get("userId")
            },
            data: {
                email: body.email,
                name: body.name,
                password: hash
            }
        })
        return c.json({
            message: "User updated successfully",
            updatedUser
        },StatusCodes.SUCCESS)
    } catch (error:any) {
        return c.body(error.message, StatusCodes.SERVERERROR)
    }

}

export async function deleteUser(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const deletedUser = await prisma.user.delete({
        where: {
            id: c.get("userId")
        }
    })
    return c.body("user deleted successfully",StatusCodes.SUCCESS)
}

export async function getMe(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: c.get("userId")
            }
        })
        return c.json({
            message: "Your token is valid",
            name: user?.name
        },StatusCodes.SUCCESS) 
    } catch (error:any) {
        return c.body(error.message, StatusCodes.SERVERERROR)
    }
}