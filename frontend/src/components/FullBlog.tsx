

import Avatar from './Avatar';

interface blog{
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
const FullBlog = ({blog}:{blog:blog}) => {
    function formatDate(timestamp:string) {
        const date = new Date(timestamp);
        // Example format: "March 23, 2024"
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
  return (
   <>
    {/* <Appbar onClick={()=> {}} name=""/> */}
    <div className="flex justify-center">
    <div className="grid lg:grid-cols-12 px-10 w-full pt-12 max-w-screen-2xl">
        <div className="col-span-8 ">
            <div className="text-3xl font-extrabold">
                {blog.title[0].toUpperCase()+blog.title.slice(1)}
            </div>
            <div className='lg:hidden block mt-4'>
               <div className='flex justify-center flex-col '>
                <div className='flex justify-start'>
                <div>
                <Avatar authorName={blog.author.name} size='6'/>
                </div>
                <div className='ml-4 text-sm font-light'>
                    {blog.author.name}
                    <div className='font-extralight text-gray-400'>
                        {formatDate(blog.createdAt)}
                    </div>
                </div>
                </div>
               </div>
            </div>
            <div className="text-gray-400 pt-2 hidden lg:block">
                Posted on {formatDate(blog.createdAt)}
            </div>
            <div className="flex justify-center">
               
                <img src={blog.imageLink} alt="" height={200} width={200}/>
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4 hidden lg:block">
           Author
           <div className='flex mt-4'>
            <div className="mt-8">
            <Circle/>
            </div>
            <div className="font-bold text-2xl ml-4">
                {blog.author.name}
           </div>
           </div>
           <div className="ml-10 text-gray-400">
            King in the north and the rightful heir to the throne
           </div>
           
        </div>
        
    </div>
    </div>
   </>
  )
}

function Circle(){
    return (
        <div className="h-6 w-6 rounded-full bg-gray-200">

        </div>
    )
}

export default FullBlog
