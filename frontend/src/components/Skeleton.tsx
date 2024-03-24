

const Skeleton = () => {
  return (
      <div role="status" className="mt-5 animate-pulse">
        <div className="p-4 border-b border-gray-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div>
        <div className="flex">
            
            <div className="h-4 w-4 bg-gray-200 rounded-full  mb-4"></div>
            <div className="font-extralight pl-2 flex justify-center flex-col">
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
              </div> 
           
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

            <div className="flex justify-center flex-col pl-2">
                
            </div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
        </div>
      
      
      <div className="text-xl font-semibold pt-2">
      <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
      </div>
      <div className="text-md font-thin">
      <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
      </div>
      <div className="text-gray-400 text-sm font-thin pt-4">
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      </div>
        </div>   
        <div className="ml-9">
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        </div>   
    </div>
        <span className="sr-only">Loading...</span>
    </div>
     
    


  )
}

export default Skeleton
