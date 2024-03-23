import Auth from "../components/Auth"
import Quote from "../components/Quote"


const Signin = () => {
  return (

    <div className="lg:grid grid-cols-2">
        <Auth type="signin"/>
        <Quote/>
    </div>
  )
}

export default Signin
