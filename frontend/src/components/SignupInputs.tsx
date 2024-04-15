import  { useState } from 'react'
import InputBox from './InputBox'
import { SignupInput } from '@prathamchauhan/write.it';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import EmailOtp from './EmailOtp';
import { render } from '@react-email/render';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || '',
  });
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

   function sendOtp(){
        const otp = Math.random().toString(36).substring(2, 8).toUpperCase();  
        const emailHtml = render(<span>OTP: <strong></strong>{otp}</span>);
        const sentFrom = new Sender("Write.it@trial-pxkjn41x3mqgz781.mlsender.net", "Admin");
        const recipients = [
            new Recipient("chauhanpratham22@gmail.com", "Your Client")
        ];
        const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("OTP")
        .setHtml(emailHtml)

        mailerSend.email.send(emailParams);
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
        <div className='relative'>
            {/* <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }}/> */}
            <EmailOtp onClick={sendOtp}/>
        </div>
        <div>
            <InputBox label="password" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;" type="password" onChange={(e:any)=> {
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
