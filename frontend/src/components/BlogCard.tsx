import Avatar from "./Avatar"

interface BlogCardProps{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}
const BlogCard = ({authorName,title,content,publishedDate}:BlogCardProps) => {
  return (
    <div className="border-b-[1px] border-gray-200 pb-4 p-4 flex justify-between">
        <div>
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar authorName={authorName}/>   
            </div>
            <div className="font-extralight pl-2 flex justify-center flex-col">{authorName}</div> 
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            <div className="pl-2 font-extralight text-gray-400 text-sm flex justify-center flex-col">{publishedDate}</div>
        </div>
      
      
      <div className="text-xl font-semibold pt-2">
        {title}
      </div>
      <div className="text-md font-thin">
        {content.length>100?content.slice(0,100)+ "....":content}
      </div>
      <div className="text-gray-400 text-sm font-thin pt-4">
        {`${Math.ceil(content.length/100)} min read`}
      </div>
        </div>   
        <div className="ml-9">
            <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*TydOjQrBvaozcclo.jpg" height={200} width={200} alt="" />
        </div>   
    </div>
  )
}

function Circle(){
    return (
        <div className="h-1 w-1 rounded-full bg-slate-400">

        </div>
    )
}

export default BlogCard
