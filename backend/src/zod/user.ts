import zod from "zod";

export const signupSchema = zod.object({
    email: zod.string().email(),
    name: zod.string().min(3),
    password: zod.string().min(6)
})
export type signup = zod.infer<typeof signupSchema>

export type signin = Omit<signup,"name">
