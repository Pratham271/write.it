import { Link } from "react-router-dom"


const Header = ({type}:{type:string}) => {
  return (
    <div>
      <div className="text-3xl font-extrabold mt-4 text-center">
                    {type==="signup"?"Create an account": "Login in to your account"}
                </div>
                <div className="text-gray-500 text-center">
                    {type==="signup"?"Already have an account?":"Don't have an account?"}
                    <Link to={type==="signup"?"/signin":"/signup"} className="pl-1 underline">{type==="signup"?"Sign in":"Sign up"}</Link>
                </div>
    </div>
  )
}

export default Header
