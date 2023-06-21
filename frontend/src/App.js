import UserSignup from "./pages/UserSignup";
import HomePage from "./pages/User/HomePage";
import FollowingPosts from "./pages/User/FollowingPosts";

import UserLogin from "./pages/UserLogin";
import OTPLogin from "./pages/OTPLogin";
import Profile from "./pages/User/Profile"
import CurrentProfile from "./pages/User/CurrentUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthorizeUser, ProtectUser } from "./protected/AuthUser";
import { AuthProvider } from "./context/AuthProvider";
import { AuthorizeAdmin, ProtectAdmin } from "./protected/AuthAdmin";
import AdminLogin from "../../frontend/src/pages/Admin/adminLogin/adminLogin";
import AdminHome from "./pages/Admin/adminHome/adminHome";
import AdminUserList from "./pages/Admin/adminUserList/AdminUserList";
import AdminPostHandle from "./pages/Admin/adminPostHandle/adminPostHandle"
import DetailPost from "./pages/Admin/adminPostHandle/DetailPost";
import People from './pages/User/People'
import Settings from './pages/User/Settings'
import SearchResult from './pages/User/SearchResult'
import Chat from './pages/User/Chat'
import PageNotFound from './pages/User/PageNotFound/PageNotFound'
import "./style.scss";

function App() {
  const darkMode = false

  return (
    <div  className={`theme-${darkMode ? "dark" : "light"}`} >
      <Router>
      <AuthProvider>
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

<Route path="userprofile/"
        element={
          <AuthorizeUser>
            <CurrentProfile />
          </AuthorizeUser>
        }
          />


<Route path="settings"
        element={
          <AuthorizeUser>
            <Settings />
          </AuthorizeUser>
        }
          />
          <Route path="searchResults"
        element={
          <AuthorizeUser>
            <SearchResult />
          </AuthorizeUser>
        }
          />

<Route path="chat"
        element={
          <AuthorizeUser>
            <Chat />
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
{/* 
          <Route
            path="/adminn/dashboard"
            element={
              <AuthorizeAdmin>
                <AdminHome />
              </AuthorizeAdmin>
            }
          /> */}

          <Route
            path="/adminn/users"
            element={
              <AuthorizeAdmin>
                <AdminUserList />
              </AuthorizeAdmin>
            }
          />

<Route
            path="/adminn/reportPost"
            element={
              <AuthorizeAdmin>
                <AdminPostHandle />
              </AuthorizeAdmin>
            }
          />

<Route
            path="/adminn/reportPost/detailed/:postId"
            element={
              <AuthorizeAdmin>
                <DetailPost />
              </AuthorizeAdmin>
            }
          />



<Route path='*' element={<PageNotFound/>} />


        </Routes>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;
