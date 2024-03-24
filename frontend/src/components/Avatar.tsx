import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Avatar = ({ authorName, size }:{ authorName:string, size?:string }) => {
    const navigate = useNavigate()
    let initials = authorName.split(" ")[0].slice(0, 1).toUpperCase(); // First initial
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
if (authorName.split(" ").length > 1) { // Check if full name is provided
    initials += authorName.split(" ")[1].slice(0, 1).toUpperCase(); // Add second initial
}
  return (
    <div className={` inline-flex items-center justify-center ${size ? "w-10 h-10" : "w-8 h-8"} overflow-hidden bg-gray-200 rounded-full`}>
            <button onClick={toggleDropdown}>
                <span className="text-sm text-gray-600">{initials}</span>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
                <div className="absolute right-2 mt-24 w-24 bg-white rounded-md shadow-lg z-1">
                    <div className="py-0">
                        <button onClick={()=> {
                          localStorage.removeItem("token")
                          navigate("/")
                        }} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full h-full text-left">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
       



  )
}

export default Avatar
