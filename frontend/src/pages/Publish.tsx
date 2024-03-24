import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import axios from "axios"
import BASE_URL from "../config"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { buttonState } from "../store/atoms/atom"



const Publish = () => {
  const [title, setTitle] = useState("")
  const setButton = useSetRecoilState(buttonState)
  const [content, setContent] = useState("")
  const [imageLink, setImageLink] = useState("")
  const [name,setName] = useState<string>("")
  const navigate = useNavigate()
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
      navigate("/")
      console.log(e)
    })
  },[])
  async function PublishBlog(){
    const response = await axios.post(`${BASE_URL}/blog`, {
      title:title,
      content:content,
      imageLink:imageLink
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response.data)
    navigate(`/allblogs`)
    setButton(false)

  }
  return (
    <>
        <Appbar onClick={PublishBlog} name={name}/>
        <div className="w-full pt-8">
            <div className="flex justify-center max-w-screen-lg w-full mx-auto">
            <input type="text" onChange={(e)=> setTitle(e.target.value)} id="default-input" className="bg-white text-gray-900  rounded-lg focus:outline-none block w-full  p-2.5 text-3xl" placeholder="Title"/>
            </div>
            <div className="flex justify-center max-w-screen-lg w-full mx-auto">
            <input type="text" id="default-input" onChange={(e)=> setImageLink(e.target.value)} className="bg-white text-gray-900  rounded-lg focus:outline-none block w-full p-2.5 text-md" placeholder="Blog image link"/>
            </div>
            <div className="flex justify-center max-w-screen-lg w-full mx-auto">
            <textarea id="message" onChange={(e)=> setContent(e.target.value)} rows={15} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg focus:outline-none h-[780px]" placeholder="Write your thoughts here..."></textarea>
            </div>
        </div>
        
    </>
  )
}

export default Publish
