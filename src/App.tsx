import Home from "./landingpage/Home";
import Login from "./UserRegistration/Login";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from "./UserRegistration/Signup";
const App = () => {
  return (
    <>

    <Router>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/auth/login" element={<Login/>}/>
<Route path="/auth/signup" element={<Signup/>}/>

</Routes>
    </Router>
   

    </>
  )
}

export default App