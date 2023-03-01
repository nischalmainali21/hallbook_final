import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import HallDetails from "./components/Hall/HallDetails";
import BookHall from "./components/Hall/BookHall";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* <Route element={<PrivateRoutes isuserType="faculty"/>}> */}
          <Route element={<PrivateRoutes isuserType="student"/>}>
            <Route path="/" element={<Home />} exact />
            <Route path="/halldetail/:hall" element={<HallDetails />}></Route>
            <Route path="/bookhall/:hall" element={<BookHall />}></Route>
          </Route>
          <Route element={<PrivateRoutes isuserType="faculty" />}>
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}
