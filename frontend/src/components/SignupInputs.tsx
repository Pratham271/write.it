import  { useState } from 'react'
import InputBox from './InputBox'
import { SignupInput } from '@prathamchauhan/write.it';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const SignupInputs = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    async function handleSignup(){
        try {
            setIsLoading(true);
            const res = await axios.post("http://localhost:8787/api/v1/user/signup", {
            name: postInputs.name,
            email: postInputs.email,
            password: postInputs.password
        })
        if(res.status===201){
            console.log(res.data)
            navigate("/signin") 
        }
       
        } catch (error) {
            alert("Error while signing up")
            // console.log(error)
        }finally {
            // Set loading to false after the request is completed (success or failure)
            setIsLoading(false);
        }
    }
  return (
    <div>
        <div>
            <InputBox label="Username" placeholder="John Doe" onChange={(e:any)=> {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
            }}/>
                   
        </div>
        <div>
            <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }}/>
        </div>
        <div>
            <InputBox label="password" placeholder="" type="password" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    password: e.target.value
                }))
            }}/>
        </div>
        <div>
            <Button label={isLoading?<Spinner/>:"Sign up"} onClick={handleSignup}/>
        </div>
    </div>

        
    
  )
}

export default SignupInputs
