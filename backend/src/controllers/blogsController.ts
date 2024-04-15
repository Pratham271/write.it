import { Context } from "hono";
import zod from 'zod';
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { StatusCodes } from "./userController";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { UpdateBlogInput, createBlogSchema, updateBlogSchema, CreateBlogInput } from "@prathamchauhan/write.it";
// import { CreateBlogInput } from '../../../common/dist/index';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CohereEmbeddings } from "@langchain/cohere";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Document } from "@langchain/core/documents";

const loader = new CheerioWebBaseLoader("https://medium.com");
const splitter = new RecursiveCharacterTextSplitter();


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

export async function createBlogWithAI(c:Context){
    const model = new ChatGroq({
        apiKey: c.env.GROQ_API_KEY,
      });
    const embeddings = new CohereEmbeddings({
        apiKey: c.env.COHERE_API_KEY,
    });
    // const prompt = ChatPromptTemplate.fromMessages([
    //     ["system", "You are a brilliant blog writer and you only right in paragraphs with p tag"],
    //     ["human", "{input}"],
    // ]);
    const prompt =
  ChatPromptTemplate.fromTemplate(`You are a brilliant blog writer and you are not friendly just here to do your job now write a blog based only on the provided context:
    <context>
    {context}
    </context>
    Question: {input}`
    );
    const body = await c.req.json()
    const userInput = body.input;
    if(!userInput.includes("blog") || !userInput.includes("title")){
        return c.json({
            errorMessage: "Please provide complete context"
        },StatusCodes.WRONGINPUTS)
    }
    const docs = await loader.load();
    const splitDocs = await splitter.splitDocuments(docs);
    const vectorstore = await MemoryVectorStore.fromDocuments(
        splitDocs,
        embeddings
    );
    const documentChain = await createStuffDocumentsChain({
        llm: model,
        prompt,
      });
    await documentChain.invoke({
        input: userInput,
        context: [
          new Document({
            pageContent:
              "Write blogs with title and content",
          }),
        ],
    });
    const retriever = vectorstore.asRetriever();
    const retrievalChain = await createRetrievalChain({
        combineDocsChain: documentChain,
        retriever,
      });
    const result = await retrievalChain.invoke({
        input: userInput,
    });
    return c.json({
        output: result.answer
    },StatusCodes.SUCCESS)
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