import { useNavigate } from "react-router-dom"
import Auth from "../components/Auth"
import Quote from "../components/Quote"
import { useEffect } from "react"
import axios from "axios"
import BASE_URL from "../config"


const Signin = () => {
  const navigate = useNavigate()
  useEffect(()=> {
    axios.get(`${BASE_URL}/user/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response)=> {
      if(response.status===200){
        navigate("/allBlogs")
      }
      else{
        alert("Not Authorized")
      }
    })
    .catch((e)=> {
      console.log(e)
    })
  },[])
  return (

    <div className="lg:grid grid-cols-2">
        <Auth type="signin"/>
        <div className="hidden lg:block">
          <Quote/>
        </div>
    </div>
  )
}

export default Signin
