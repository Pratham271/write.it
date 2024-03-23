import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"


const Blogs = () => {
  const {loading, blogs} = useBlogs();
  if(loading){
    return (
      <div>loading...</div>
    )
  }
  return (
    <div>
      <Appbar/>
      <div className="flex justify-center mt-4">
      <div className="w-[1400px]">
        <BlogCard 
        authorName={"Pratham Chauhan" }
        title={"How an ugly single-page website makes $5000 a month without affiliate marketing" }
        content={"How an ugly single-page website makes $5000 a month without affiliate marketingHow an ugly single-page website makes $5000 a month without affiliate marketingHow an ugly single-page website makes $5000 a month without affiliate marketing" }
        publishedDate={"2nd Feb 2024"}/>
        
    </div>
    </div>
    </div>
  )
}

export default Blogs
