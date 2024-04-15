import Write from './Write'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const HandleButton = ({onClick}:{onClick:()=>void}) => {
    const location = useLocation();
    

  return (
    <div >
      {location.pathname==='/publish'?
      <button onClick={onClick} className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full
        px-2 py-1 text-center text-xs mb-2">Publish</button>: 
        <Link to={'/publish'}>
            <button><Write/></button></Link>}
    </div>
  )
}

export default HandleButton
