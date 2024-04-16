import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"

import {  useBlogs } from "../hooks"
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import Skeleton from "../components/Skeleton";



const Blogs = () => {
  const {loading, blogs} = useBlogs("");
  
  const navigate = useNavigate()
  const [name,setName] = useState<string>("")
  useEffect(()=> {
    axios.get(`${BASE_URL}/user/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response)=> {
      if(response.status===200){
        setName(response.data.name)
        
      }
      else{
        navigate("/")
      }
    })
    .catch((e)=> {
      navigate("/")
      console.log(e)
    })
  },[])

  function formatDate(timestamp:string) {
    const date = new Date(timestamp);
    // Example format: "March 23, 2024"
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  if(loading){
    return (
      <div>
        <Appbar name={""} onClick={function (): void {
          
        } }/>
        <div className="flex justify-center">
          <div>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </div>
        </div>
      </div>

    )
  }
  return (
    <div>
      <Appbar onClick={()=> {}} name={name}/>
      <div className="flex justify-center mt-4">
      <div className="w-[1400px]">
        {blogs.map(blog => (
          <BlogCard key={blog.id}
          imageLink = {blog.imageLink}
          id={blog.id}
          authorName={blog.author.name}
          title={blog.title}
          content={blog.content}
          publishedDate={formatDate(blog.createdAt)}/>
        ))}
        
        
    </div>
    </div>
    </div>
  )
}

export default Blogs
