import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Add from "./pages/CreateAppartment";
import Bookings from "./pages/rooms/Bookings";
import Room from "./pages/rooms/simgleRoom";
import Edit from "./pages/rooms/EditApparment";


function App() {

  return (
    <div className="relative min-h-screen min-w-screen main-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/room/:roomid" element={<Room />} />
        <Route path="/room/edit/:roomid" element={<Edit />} />
        <Route path="/rooms/bookings/:roomid" element={<Bookings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

//  <Routes>
//         <Route element={<Layout />}>
//           <Route path='/' element={<Home />} />
//           <Route path='/profile/:id?' element={<Profile />} />
//         </Route>

//         <Route path='/register' element={<Register />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/reset-password' element={<ResetPassword />} />
//       </Routes>
