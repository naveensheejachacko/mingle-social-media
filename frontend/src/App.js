
import UserSignup from "./pages/UserSignup";
import HomePage from "./pages/User/HomePage";
import UserLogin from "./pages/UserLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthorizeUser, ProtectUser } from "./protected/AuthUser";
import { AuthorizeAdmin, ProtectAdmin } from "./protected/AuthAdmin";
import AdminLogin from "../../frontend/src/pages/Admin/adminLogin/adminLogin"
import AdminHome from "./pages/Admin/adminHome/adminHome";
import AdminUserList from "./pages/Admin/adminUserList/AdminUserList";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="home"
            element={
              <AuthorizeUser>
                <HomePage />
              </AuthorizeUser>
            }
          />

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
