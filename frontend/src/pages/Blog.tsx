import { useRecoilValueLoadable } from "recoil"
import { blogAtomFamily } from "../store/atoms/atom"
import { useNavigate, useParams } from "react-router-dom"
import FullBlog from "../components/FullBlog";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import Appbar from "../components/Appbar";
import Skeleton from "../components/Skeleton";
import BlogSpinner from "../components/BlogSpinner";

interface Blog{
  "id":string,
    "title": string,
    "content": string,
    "authorId": string,
    "imageLink": string,
    "createdAt": string,
    "author": {
        "name": string
    }
}
const Blog = () => {
  const { id } = useParams(); 
  const blogLoadable = useRecoilValueLoadable(blogAtomFamily({
    id : id || ""
  }))
  const navigate = useNavigate()
  const [name,setName] = useState<string>("")

  useEffect(()=> {
    axios.get(`${BASE_URL}/user/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response)=> {
      if(response.status!==200){
        navigate("/")
      }
      else{
        setName(response.data.name)
      }
    })
    .catch((e)=> {
      console.log(e)
    })
  },[])

  useEffect(()=> {
    // axios.get(`http://localhost:8787/api/v1/user/me`, {
    //   headers: {
    //     authorization: `Bearer ${localStorage.getItem("token")}`
    //   }
    // })
    // .then((response)=> {
    //   console.log(response)
    //   if(response.status!==200){
    //     navigate("/")
    //   }
    //   else{
    //     setName(response.data.name)
    //   }
    // })
    // .catch((e)=> {
    //   console.log(e)
    // })
    const token= localStorage.getItem("token")
    if(!token){
      navigate("/")
    }
  },[])

 
let blog;

if (blogLoadable.state === 'hasValue') {
  blog = blogLoadable.contents;
  // console.log(blog)
}



  if(blogLoadable.state==='loading'){
    return (
      <div>
        <Appbar name={""} onClick={function (): void {
          
        } }/>
        <div className="flex justify-center">
          <div>
            <BlogSpinner/>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div>
    <Appbar onClick={()=> {}} name={name}/>
      
      <FullBlog blog={blog}/>
    </div>
  )
}

export default Blog
