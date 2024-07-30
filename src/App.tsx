import Home from "./landingpage/Home";
import Login from "./UserRegistration/Login";
import Signup from "./UserRegistration/Signup";
import Protecteddashboard from "./Protectedroutes/Protecteddashboard";
import Dashboard from "./Dashboard/Dashboard";
import Feeds from "./Dashboard/Feeds";
import Discover from "./Dashboard/Discover";
import StatisticsandAnalytics from "./Dashboard/StatisticsandAnalytics";
import RecentActivities from "./Dashboard/RecentActivities";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadNewPaper from "./Dashboard/UploadNewPaper";
import Userprofile from "./Dashboard/Userprofile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        <Route element={<Protecteddashboard />}>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="feeds" element={<Feeds />} />
            <Route path="discover" element={<Discover />} />
            <Route path="statistics-analytics" element={<StatisticsandAnalytics />} />
            <Route path="recent-activities" element={<RecentActivities/>}/>
            <Route path="upload-new-paper" element={<UploadNewPaper/>}/>
            <Route path="user-profile/:id" element={<Userprofile/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
