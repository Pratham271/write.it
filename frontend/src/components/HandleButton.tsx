import { useRecoilState } from 'recoil'
import { buttonState } from '../store/atoms/atom'
import Write from './Write'
import { Link } from 'react-router-dom'

const HandleButton = ({onClick}:{onClick:()=>void}) => {
    const [button,setButton] = useRecoilState(buttonState)

  return (
    <div >
      {button?
      <button onClick={onClick} className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full
        px-2 py-1 text-center text-xs mb-2">Publish</button>: 
        <Link to={'/publish'}>
            <button onClick={()=> setButton(true)}><Write/></button></Link>}
    </div>
  )
}

export default HandleButton
