import "./App.css";
import Register from "./register/register";
import Login from "./login/login";
import Home from "./home/home";
import Profile from "./profile/profile";
import RouterGuard from "./reactRouterGuard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={<RouterGuard dpath="/profile" dcomponent={Profile} />}
        />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
      </Routes>
    </Router>
  );
}

export default App;
