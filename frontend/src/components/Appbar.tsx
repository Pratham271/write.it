import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import HandleButton from './HandleButton'
import { useEffect, useState } from 'react'
import { useBlogs } from '../hooks/index';
import axios from 'axios'
import BASE_URL from '../config'
import { useLocation } from 'react-router-dom'

const Appbar = ({onClick, name}:{name:string,onClick:()=> void}) => {
  const location = useLocation();
  return (
    <div className="border-b flex justify-between px-2 lg:px-10 py-4">
        <div className="flex">
            <div className="flex justify-center flex-col">
            <Link to={'/allblogs'}>
              <img src={'favicon.ico'} alt="logo" height={40} width={40}/>
            </Link>
            </div>
            {location.pathname!=='/publish'?<div className="ml-2 lg:ml-6 flex justify-center flex-col">
              <Searchbar/>
            </div>:null}
        </div>

        <div className='flex'>
            <div className='flex mr-12 mt-[10px] justify-center text-gray-500 font-light'>
            <HandleButton onClick={onClick}/> 
            </div>
            <Avatar authorName={name} size={'10'}/>
            
        </div>
    </div>
  )
}

function Searchbar(){
  const [filter,setFilter] = useState("")
  const {setBlogs} = useBlogs(filter)
  useEffect(()=> {
    const timer = setTimeout(()=> {
      // setLoading(true)
        axios.get(`${BASE_URL}/blog/bulk?filter=${filter}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=> {
            // console.log(res.data)
            setBlogs(res.data.allBlogs)
            
        })
        .catch((e)=> {
            console.log(e)
            alert("Something went wrong")
        }).finally(()=>{
            // setLoading(false)
        })

    },500)
    return () => {
      clearTimeout(timer)
    }
  },[filter])
  return (
  <form className="max-w-md mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={(e)=> setFilter(e.target.value)} type="text" id="default-search" className="block w-full placeholder:font-light placeholder:text-gray-600 p-2 border-none ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-[#f8f8f7] outline-none" placeholder="Search" required />
       
      </div>
  </form>


  )
}

export default Appbar
