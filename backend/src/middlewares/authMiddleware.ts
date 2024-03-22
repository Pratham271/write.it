import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";

export async function authMiddleware(c:Context, next:Next){
    const token = c.req.header("authorization") || "";     
    try {
        if(!token || !token.startsWith("Bearer")){
            return c.body("Invalid Token",403)
        }
        const words = token.split(" ")[1]
        const verified = await Jwt.verify(words,c.env.JWT_SECRET)
        if(!verified){
            return c.body("Wrong token",403)
        }
        c.set("userId",verified.id)
        await next()
    } catch (error:any) {
        return c.body(error,500)
    }
}