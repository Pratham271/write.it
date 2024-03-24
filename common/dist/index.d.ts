import zod from "zod";
export declare const signupSchema: zod.ZodObject<{
    email: zod.ZodString;
    name: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export declare const updateUserSchema: zod.ZodObject<{
    email: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
    password: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    email: string;
    name?: string | undefined;
    password?: string | undefined;
}, {
    email: string;
    name?: string | undefined;
    password?: string | undefined;
}>;
export declare const createBlogSchema: zod.ZodObject<{
    title: zod.ZodString;
    imageLink: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    imageLink: string;
    content: string;
}, {
    title: string;
    imageLink: string;
    content: string;
}>;
export declare const updateBlogSchema: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    imageLink: zod.ZodString;
    content: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    imageLink: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    imageLink: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export type SignupInput = zod.infer<typeof signupSchema>;
export type SigninInput = Omit<SignupInput, "name">;
export type UpdateUserInput = zod.infer<typeof updateUserSchema>;
export type CreateBlogInput = zod.infer<typeof createBlogSchema>;
export type UpdateBlogInput = zod.infer<typeof updateBlogSchema>;
