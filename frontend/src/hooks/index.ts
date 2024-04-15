import axios from "axios";
import { useEffect, useState } from "react"
import BASE_URL from "../config"

export interface Blog{
    "content":string,
    "title": string,
    "id":string,
    "imageLink": string,
    "authorId": string,
    "createdAt": string
    "author": {
      "name": string
    }
  }
  export const useBlogs = (filter: string) => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/blog/bulk?filter=${filter}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const sortedBlogs = response.data.allBlogs.sort((a: Blog, b: Blog) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  });
                console.log(sortedBlogs)
                setBlogs(response.data.allBlogs);
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchBlogs, 500);

        return () => clearTimeout(timer);
    }, [filter]);

    return {
        loading,
        blogs,
        setBlogs,
        setLoading
    };
};
