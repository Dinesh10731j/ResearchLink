import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";


const Protecteddashboard = () => {
  const token = Cookies.get("tokenn");

  if (!token) {
   
   

      return <Navigate to="/auth/login" />;

   
  }

  return (
    <>
      <section>
        <Outlet />
      </section>

      
    </>
  );
};

export default Protecteddashboard;
