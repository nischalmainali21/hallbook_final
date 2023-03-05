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
import Unauthorized from "./pages/Unauthorized";
import AdminPage from "./pages/AdminPage";
import CreateHall from "./components/Admin/CreateHall";
import EditHall from "./components/Admin/EditHall";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>

          {/* <Route element={<PrivateRoutes isuserType="faculty"/>}> */}
          {/* home is made accessible to all logged in user and the redirect is handled within Home Page */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} exact />
          </Route>

          <Route element={<PrivateRoutes isuserType="student" />}>
            <Route path="/halldetail/:hall" element={<HallDetails />}></Route>
            <Route path="/bookhall/:hall" element={<BookHall />}></Route>
          </Route>
          <Route element={<PrivateRoutes isuserType="faculty" />}>
            <Route path="/facultypage" element={<About />} />
          </Route>
          <Route element={<PrivateRoutes isuserType="admin" />}>
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/adminpage/createhall" element={<CreateHall />} />
            <Route path="/adminpage/edithall" element={<EditHall />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}
