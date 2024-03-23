

const Button = ({label,onClick}:{label:any, onClick:()=>void}) => {
  return (
    <div>
      <button onClick={onClick} type="button" className="text-white mt-4 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
    </div>
  )
}

export default Button
