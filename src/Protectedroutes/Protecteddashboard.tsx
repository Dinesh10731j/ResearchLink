import { Outlet,Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const Protecteddashboard = () => {
const token  = Cookies.get("token");

console.log("The coookie  is ",token);
console.log(`The cookie is ${token} here is the cookie `)
  return (
   <>
   
   <section>

{
    token?<Outlet/>:<Navigate to='/login'/>
}

   </section>
   </>
   
  )
}

export default Protecteddashboard