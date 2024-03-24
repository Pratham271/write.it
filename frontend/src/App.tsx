import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
// import CreateBlog from './pages/CreateBlog'
import Blogs from './pages/Blogs'
import { RecoilRoot } from "recoil"
import Publish from './pages/Publish'
function App() {
  return (
    <>
     <RecoilRoot>
     <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signup/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/allblogs" element={<Blogs/>}/>
          {/* <Route path="/createblog" element={<CreateBlog/>}/> */}
          <Route path="/publish" element={<Publish/>}/>
        </Routes>
      </BrowserRouter>
     </RecoilRoot>
    </>
  )
}

export default App
