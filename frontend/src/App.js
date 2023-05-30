import UserSignup from "./pages/UserSignup";
import HomePage from "./pages/User/HomePage";
import FollowingPosts from "./pages/User/FollowingPosts";

import UserLogin from "./pages/UserLogin";
import OTPLogin from "./pages/OTPLogin";
import Profile from "./pages/User/Profile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthorizeUser, ProtectUser } from "./protected/AuthUser";
import { AuthorizeAdmin, ProtectAdmin } from "./protected/AuthAdmin";
import AdminLogin from "../../frontend/src/pages/Admin/adminLogin/adminLogin";
import AdminHome from "./pages/Admin/adminHome/adminHome";
import AdminUserList from "./pages/Admin/adminUserList/AdminUserList";
import People from './pages/User/People'
import "./style.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>



          <Route
            path="signup"
            element={
              <ProtectUser>
                <UserSignup />
              </ProtectUser>
            }
          />
          <Route
            path="/"
            element={
              <ProtectUser>
                <UserLogin />
              </ProtectUser>
            }
          />

<Route
            path="otpLogin"
            element={
              <ProtectUser>
                <OTPLogin />
              </ProtectUser>
            }
          />


          <Route
            path="explore"
            element={
              <AuthorizeUser>
                <HomePage />
              </AuthorizeUser>
            }
          />

          
<Route
            path="home"
            element={
              <AuthorizeUser>
                <FollowingPosts />
              </AuthorizeUser>
            }
          />

<Route
            path="people"
            element={
              <AuthorizeUser>
                <People />
              </AuthorizeUser>
            }
          />




        <Route path="profile/:userId"
        element={
          <AuthorizeUser>
            <Profile />
          </AuthorizeUser>
        }
          />






          {/* ------------------adminn----- */}

          <Route
            path="adminn"
            element={
              <ProtectAdmin>
                <AdminLogin />
              </ProtectAdmin>
            }
          />

          <Route
            path="/adminn/dashboard"
            element={
              <AuthorizeAdmin>
                <AdminHome />
              </AuthorizeAdmin>
            }
          />

          <Route
            path="/adminn/users"
            element={
              <AuthorizeAdmin>
                <AdminUserList />
              </AuthorizeAdmin>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
