import zod from 'zod';

const blogSchema = zod.object({
    title: zod.string().min(4),
    content: zod.string().min(20)
})

export default blogSchema;