import { Outlet,Navigate } from "react-router-dom";
const Protecteddashboard = () => {
const token = true;
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