import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Add from './pages/CreateAppartment';
import Bookings from './pages/rooms/Bookings';
import Room from './pages/rooms/simgleRoom';
import Edit from './pages/rooms/EditApparment';
import About from './pages/about';

function App() {
  return (
    <div className="relative min-h-screen min-w-screen  bg-dark-2">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/room/:roomid" element={<Room />} />
        <Route path="/room/edit/:roomid" element={<Edit />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms/bookings/:roomid" element={<Bookings />} />
      </Routes>
      <Footer />
       <ToastContainer
            position="top-center"
            autoClose={7000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
    </div>
  );
}

export default App;
