import { useRecoilState } from "recoil"
import { inputAtom } from "../store/atoms/atom"


const Modal = ({onClick}:{onClick:(e:any)=>void}) => {
    const [input,setInput] = useRecoilState(inputAtom)
    const handleKeyDown = (e:React.KeyboardEvent) => {
        if(e.key==='Enter' && !e.shiftKey && input.length>0){
            onClick(e)
        }
    }
  return (
    <div tabIndex={-1} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden absolute top-96 left-[38rem] z-50 justify-center items-center w-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">       
            <div className="p-4 md:p-5">
                <form className="space-y-4" action="#" >
                    <div>
                        <input onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKeyDown} type="text" name="text" id="text" className="bg-white border border-gray-800 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 e" placeholder="Write a blog on Docker with suitable title" required />
                    </div>
                    <div>
                        <button disabled={!input} onClick={onClick} className="bg-gray-700 p-1.5 rounded-md text-white w-full hover:bg-gray-800">Generate Blog</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 
  )
}

export default Modal
