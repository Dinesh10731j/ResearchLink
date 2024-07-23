import { Outlet,Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const Protecteddashboard = () => {
const token = Cookies.get("token")
  return (
   <>
   
   <section>

{
    token?<Outlet/>:<Navigate to='/auth/login'/>
}

   </section>
   </>
   
  )
}

export default Protecteddashboard