import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getAddressfun,
  getApartment,
  getBookings,
} from '../../../services/blockchain';
import Booking from '../../components/Booking';

const Bookings = () => {
  const params = useParams();
  const [address, setaddress] = useState('');

  const { apartment, bookings } = useSelector((states) => states.globalStates);

  useEffect(() => {
    async function fetch() {
      const addres = await getAddressfun();
      setaddress(addres);
      await getApartment(params.roomid);
      await getBookings(params.roomid);
    }
    fetch();
  }, []);

  return (
    <div className="w-full min-h-screen sm:w-4/5 md:w-2/3 mx-auto mt-20">
      <h1 className="text-center text-3xl text-black font-bold">Bookings</h1>
      {bookings.length < 1 && <div>No bookings for this apartment yet</div>}

      {bookings.map((booking, i) => (
        <Booking
          key={i}
          id={params.roomid}
          booking={booking}
          address={address}
          apartment={apartment}
        />
      ))}
    </div>
  );
};

export default Bookings;
