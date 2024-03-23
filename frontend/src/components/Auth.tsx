
import Header from "./Header";
import SignupInputs from "./SignupInputs";
import SigninInputs from "./SigninInputs";


const Auth = ({type}:{type:"signup"|"signin"}) => {


  return (
<div className="h-screen flex justify-center flex-col ">
      <div className="flex justify-center">
            <div>
                <Header type={type}/>
                {type==="signup"? <SignupInputs />:<SigninInputs />}
                
            </div>
            
      </div>
    </div>
  )
}

export default Auth
