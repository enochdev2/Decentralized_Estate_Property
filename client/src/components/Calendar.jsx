import moment from 'moment';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { FaEthereum } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { bookApartment } from '../../services/blockchain';

const Calendar = ({ apartment, timestamps }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const { securityFee } = useSelector((states) => states.globalStates);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) return;
    const start = moment(checkInDate);
    const end = moment(checkOutDate);
    console.log('🚀 ~ handleSubmit ~  start:', start);
    const timestampArray = [];

    while (start <= end) {
      timestampArray.push(start.valueOf());
      start.add(1, 'days');
    }

    const params = {
      aid: apartment?.id,
      timestamps: timestampArray,
      amount:
        apartment?.price * timestampArray.length +
        (apartment?.price * timestampArray.length * securityFee) / 100,
    };
    console.log('🚀 ~ handleSubmit ~ params:', params);

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await bookApartment(params)
          .then(async () => {
            resetForm();
            resolve();
          })
          .catch(() => reject());
      }),
      {
        pending: 'Approve transaction...',
        success: 'Apartment booked successfully 👌',
        error: 'Encountered error 🤯',
      }
    );
  };

  const resetForm = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-[25rem] border-[0.1px] p-6
      border-gray-400 rounded-lg shadow-lg flex flex-col
      space-y-4"
    >
      <div className="flex justify-between">
        <div className="flex justify-center items-center">
          <FaEthereum className="text-lg text-gray-500" />
          <span className="text-lg text-gray-500">
            {apartment?.price} <small>per night</small>
          </span>
        </div>
      </div>

      <DatePicker
        id="checkInDate"
        selected={checkInDate}
        onChange={setCheckInDate}
        placeholderText="YYYY-MM-DD (Check In)"
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        excludeDates={timestamps}
        required
        className="rounded-lg w-full border border-gray-400 p-2 text-black"
      />
      <DatePicker
        id="checkOutDate"
        selected={checkOutDate}
        onChange={setCheckOutDate}
        placeholderText="YYYY-MM-DD (Check out)"
        dateFormat="yyyy-MM-dd"
        minDate={checkInDate}
        excludeDates={timestamps}
        required
        className="rounded-lg w-full border text-black border-gray-400 p-2"
      />

      <button className="community-card_btn py-2">Book</button>

      <Link
        to={`/rooms/bookings/${apartment?.id}`}
        className="user-card_btn text-body-medium px-2 py-2 text-center"
      >
        Check your bookings
      </Link>
    </form>
  );
};

export default Calendar;
