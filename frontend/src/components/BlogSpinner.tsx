

const BlogSpinner = () => {
  return (
    <div role="status" className="animate-pulse">
        <div className="flex justify-center">
    <div className="grid lg:grid-cols-12 px-10 w-full pt-12 max-w-screen-2xl">
        <div className="col-span-8 ">
            <div className="text-3xl font-extrabold">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            </div>
            <div className='lg:hidden block mt-4'>
               <div className='flex justify-center flex-col '>
                <div className='flex justify-start'>
                <div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                </div>
                <div className='ml-4 text-sm font-light'>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                </div>
               </div>
            </div>
            <div className="text-gray-400 pt-2 hidden lg:block">
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            </div>
            <div className="flex justify-center">
               
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            </div>
            <div className="pt-4">
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
            </div>
        </div>
        <div className="col-span-4 hidden lg:block">
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
           <div className='flex mt-4'>
            <div className="mt-8">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            </div>
            <div className="font-bold text-2xl ml-4">
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
           </div>
           </div>
           <div className="ml-10 text-gray-400">
           <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
           </div>
           
        </div>
        
    </div>
    </div>
        <span className="sr-only">Loading...</span>
    </div>


  )
}

export default BlogSpinner
