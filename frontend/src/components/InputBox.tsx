import  { ChangeEvent, useState } from 'react'
import EyeClose from './EyeClose'
import EyeOpen from './EyeOpen'

interface inputType {
    label:string,
    placeholder:string,
    type?: string
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
const InputBox = ({label,placeholder,type,onChange}: inputType) => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <div className="mt-6">
    <label htmlFor={label}  className="block mb-2 text-sm  text-gray-900 font-semibold">{label}</label>
    <div className="relative">
    <input onChange={onChange} type={show?"text":type} id="default-input" placeholder={placeholder} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[500px] p-2.5"/>
      {type==="password"?<button onClick={()=> {setShow(!show)}}>{show?<EyeClose/>:<EyeOpen/>}</button>:<></>}
    </div>
    </div>
  )
}

export default InputBox
