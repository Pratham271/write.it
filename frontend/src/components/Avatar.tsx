

const Avatar = ({ authorName, size=8 }:{ authorName:string, size?:number }) => {
    let initials = authorName.split(" ")[0].slice(0, 1); // First initial

if (authorName.split(" ").length > 1) { // Check if full name is provided
    initials += authorName.split(" ")[1].slice(0, 1); // Add second initial
}
  return (
    <div className={`relative inline-flex items-center justify-center w-${size} h-${+size} overflow-hidden bg-gray-200 rounded-full`}>
        <span className="text-sm text-gray-600 ">{initials}</span>
    </div>


  )
}

export default Avatar
