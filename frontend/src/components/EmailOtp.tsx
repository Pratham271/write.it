

const EmailOtp = ({onClick}:{onClick:()=>void}) => {
  return (
    <>
    <div className="mt-6"><label htmlFor="phone-input" className="text-sm font-medium  text-gray-900 ">Phone number:</label></div>
    <div className="flex items-center mt-1">
        <div className="relative w-full flex">
            <input type="text"  className="rounded-md block p-2.5 w-full z-20 text-sm text-gray-900 bg-white border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="johndoe@gmail.com" required />
            <button onClick={onClick} className="rounded-md flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-gray-700 rounded-e-lg hover:bg-gray-800 text-white focus:ring-4 focus:outline-none focus:ring-gray-100">
        Send SMS
        </button>
        </div>
    </div>

    </>
  )
}

export default EmailOtp
