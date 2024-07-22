import Home from "./landingpage/Home";
import Login from "./UserRegistration/Login";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
const App = () => {
  return (
    <>

    <Router>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/auth/login" element={<Login/>}/>

</Routes>
    </Router>
   

    </>
  )
}

export default App