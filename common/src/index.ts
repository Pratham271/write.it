import zod from "zod";

export const signupSchema = zod.object({
    email: zod.string().email(),
    name: zod.string().min(3),
    password: zod.string().min(6)
})


export const updateUserSchema = zod.object({
    email: zod.string().email(),
    name : zod.string().min(4).optional(),
    password: zod.string().min(6).optional()
})


export const createBlogSchema = zod.object({
    title: zod.string().min(4),
    content: zod.string().min(20)
})


export const updateBlogSchema = zod.object({
    title: zod.string().min(4).optional(),
    content: zod.string().min(20).optional(),
    
})

export type SignupInput = zod.infer<typeof signupSchema>
export type SigninInput = Omit<SignupInput,"name">
export type UpdateUserInput = zod.infer<typeof updateUserSchema>
export type CreateBlogInput = zod.infer<typeof createBlogSchema>
export type UpdateBlogInput = zod.infer<typeof updateBlogSchema>