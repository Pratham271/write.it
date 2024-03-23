import Avatar from './Avatar'

const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
        <div className="flex">
            <div className="flex justify-center flex-col">
            <img src="logo.png" alt="" height={40} width={40}/>
            </div>
            <div className="ml-6 flex justify-center flex-col">
              <Searchbar/>
            </div>
        </div>

        <div>
            <Avatar authorName="Pratham Chauhan" size={10}/>
        </div>
    </div>
  )
}

function Searchbar(){
  return (
  <form className="max-w-md mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full placeholder:font-light placeholder:text-gray-600 p-2 border-none ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-[#f8f8f7] outline-none" placeholder="Search" required />
       
      </div>
  </form>


  )
}

export default Appbar
