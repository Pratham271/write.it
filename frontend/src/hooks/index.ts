import axios from "axios";
import { useEffect, useState } from "react"
import BASE_URL from "../config"


export const useBlogs = () => {
    const [loading,setLoading] = useState(false)
    const [blogs,setBlogs] = useState([]);

    useEffect(()=> {
        setLoading(true)
        axios.get(`http://localhost:8787/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=> {
            setBlogs(res.data)
        })
        .catch((e)=> {
            console.log(e)
            alert("Something went wrong")
        }).finally(()=>{
            setLoading(false)
        })
    },[])
    return {
        loading,
        blogs
    }

    
}