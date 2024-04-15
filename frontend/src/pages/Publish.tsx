import { useEffect, useRef, useState } from "react"
import Appbar from "../components/Appbar"
import axios from "axios"
import BASE_URL from "../config"
import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import { useRecoilValue } from "recoil"
import { inputAtom } from "../store/atoms/atom"


const Publish = () => {  
  let aiContent:string="";
  let aiTitle:string="";
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageLink, setImageLink] = useState("")
  const [name,setName] = useState<string>("")
  const [modal, setModal] = useState(false)
  const input = useRecoilValue(inputAtom)
  const modalRef = useRef<HTMLDivElement>(null)
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
  }

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (modalRef.current && !modalRef?.current?.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function getAIBlog(e:any){
    e.preventDefault()
    setModal(false)
    try {
      const response = await axios.post(`${BASE_URL}/blog/create/ai`, {
        input: input
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response.data)
      const splitResponse = response.data.output.split("\n\n")
      // Extracting title and content
      if(splitResponse[0].includes("Sure") || splitResponse[0].includes("here is a blog")){
        aiTitle = splitResponse[1].replace('Title: ', '');
        aiContent = splitResponse.slice(2).join('\n\n');
      }
      else{
        aiTitle = splitResponse[0].replace('Title: ', '');
        aiContent = splitResponse.slice(1).join('\n\n');
      }
      setTitle(aiTitle)
      setContent(aiContent)
      console.log("Title:", aiTitle);
      console.log("Content:", aiContent);

    } catch (error) {
      alert("Invalid Inputs, please provide right context, check the placeholder ")
    }
  }
  return (
    <div>
        <div className={`${modal?"bg-black opacity-20":"opacity-100"}`}>
        <Appbar onClick={PublishBlog} name={name}/>
        
        <div className={`w-full pt-8`}>
            <div className="flex justify-center max-w-screen-lg w-full mx-auto">
            <input value={title} type="text" onChange={(e)=> setTitle(e.target.value)} id="default-input" className={`${modal?"bg-black opacity-50":"bg-white opacity-100"}  text-gray-900  rounded-lg focus:outline-none block w-full  p-2.5 text-3xl`} placeholder="Title"/>
            </div>
            <div className="flex justify-center max-w-screen-lg w-full mx-auto">
            <input type="text" id="default-input" onChange={(e)=> setImageLink(e.target.value)} className={`${modal?"bg-black opacity-50":"opacity-100 bg-white"}  text-gray-900  rounded-lg focus:outline-none block w-full p-2.5 text-md`} placeholder="Blog image link"/>
            </div>
            <div className="flex justify-center max-w-screen-lg w-full mx-auto">
            <button className={`absolute left-80 mt-1.5 ${modal?"bg-black opacity-50":"opacity-100"}`} onClick={()=> setModal(true)}>
              <img src="./AI.png" alt="" width={28} height={28} className={`${modal?"bg-black opacity-50":"opacity-100"}`}/>
            </button>
            <textarea value={content} disabled={modal} id="message" onChange={(e)=> setContent(e.target.value)} rows={15} className={`${modal?"bg-black opacity-50":"bg-white opacity-100"}block p-2.5 w-full text-sm text-gray-900  rounded-lg focus:outline-none h-[780px]`} placeholder="Write your thoughts here..."></textarea>
            </div>
        </div>
        </div>
        {modal && <div className="h-20 w-20" ref={modalRef}><Modal onClick={(e:any)=> getAIBlog(e)}/></div>}
    </div>
  )
}

export default Publish
