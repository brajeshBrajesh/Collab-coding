import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoutes from "./private routes/PrivateRoutes";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import Content from "./pages/Content";
import Custom from "./pages/Custom";
import Purpose from "./pages/Purpose";
import Notifications from "./pages/Notifications";
import Dsa from "./pages/Dsa";
import College from "./pages/College";
import FinalClgContent from "./pages/content/FinalClgContent";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import DsaTopic from "./pages/DsaTopic";
import MyNotes from "./pages/MyNotes";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/content" element={<Content />} />
            <Route path="/dsa" element={<Dsa />} />
            <Route path="/dsa/:topic" element={<DsaTopic />} />
            <Route path="/college" element={<College />} />
            <Route path="/college/:topic" element={<FinalClgContent />} />
            <Route path="/my-notes" element={<MyNotes/>} />
            {/* <Route path="/custom" element={<Custom />} />
          <Route path="/purpose" element={<Purpose />} />
          <Route path="/notifications" element={<Notifications />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
