import { Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './pages/Signin';
import SignUp from './pages/signup';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Navbar from './components/navbar';
import ProfileSection from './pages/Profile';
import Event from './pages/Event';
import CodingSheetPage from './pages/CodingSheetPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CodeEditorPage from './pages/CodeEditorPage';
import SharePage from './pages/SharePage';
import Settings from './pages/SettingPage';
import SmoothScroll from "../src/components/smoothscroll/SmoothScroll";
import SheetHome from './components/sheet/SheetHome';
import EditProfile from './components/editprofile/EditProfile';
import Footer from './components/footer';
function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/dashboard', '/settings'];

  return (
    // <SmoothScroll>
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/events" element={<Event />} />
        <Route path="/sheets" element={<SheetHome />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/code-editor" element={<CodeEditorPage />} />
        <Route path="/share/:id" element={<SharePage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer/>
      </>
    // </SmoothScroll>
  );
}

export default App;
