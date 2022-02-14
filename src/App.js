import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoutes from "./private routes/PrivateRoutes";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route element={<PrivateRoutes/>}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
