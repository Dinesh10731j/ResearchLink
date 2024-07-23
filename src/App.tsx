import Home from "./landingpage/Home";
import Login from "./UserRegistration/Login";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from "./UserRegistration/Signup";
import Protecteddashboard from "./Protectedroutes/Protecteddashboard";
import Dashboard from "./Dashboard/Dashboard";
const App = () => {
  return (
    <>

    <Router>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/auth/login" element={<Login/>}/>
<Route path="/auth/signup" element={<Signup/>}/>


<Route element={<Protecteddashboard/>}>
<Route path="/dashboard" element={<Dashboard/>}/>

</Route>

</Routes>
    </Router>
   

    </>
  )
}

export default App