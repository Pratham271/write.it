import axios from "axios"
import { atom, atomFamily, selectorFamily } from "recoil"
import BASE_URL from "../../config"

export const blogAtomFamily = atomFamily({
    key: "blogAtomFamily",
    default: selectorFamily({
        key: "blogSelectorFamily",
        get: ({id}:{id:string}) => async({get})=> {
            
            const res = await axios.get(`${BASE_URL}/blog/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            // console.log(res.data.blog)
            return res.data.blog
        }
    })
})

// export const blogsAtomFamily = atomFamily({
//     key: "blogsAtomFamily",
//     default: selectorFamily({
//         key: "blogsSelectorFamily",
//         get: () => async({get})=>{
//             const res = await axios.get(`${BASE_URL}/blogs/bulk`, {
//                 headers: {
//                     authorization : `Bearer ${localStorage.getItem("token")}`
//                 }
//             })
//             return res.data.allBlogs;

//         }
//     })
// })

// export const fetchAllBlogsSelector = selector({
//     key: 'fetchAllBlogsSelector',
//     get: async () => {
//         const res = await axios.get(`${BASE_URL}/blogs/bulk`, {
//             headers: {
//                 authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//         return res.data.allBlogs;
//     }
// });

export const inputAtom = atom({
    key: "inputAtom",
    default: ""
})