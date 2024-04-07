import React from 'react';
import { ImageSlider } from './';
import { FaStar, FaEthereum } from 'react-icons/fa';
import { formatDate } from '../../utils/helper';
import { Link } from 'react-router-dom';

const Card = ({ appartment }) => {
  return (
    <div className="shadow-md bg-primary-500 py-2 px-2 border-primary-500 w-[26rem] text-xl pb-5 gap-4 rounded-b-2xl mb-20">
      <Link to={'/room/' + appartment.id}>
        <ImageSlider images={appartment.images} />
      </Link>
      <div className="px-4 bg-dark-2 py-2  rounde-lg">
        <div className="flex justify-between items-start mt-2">
          <p className="font-semibold capitalize text-[15px]">
            {appartment.name}
          </p>
          <p className="flex justify-start items-center space-x-2 text-sm">
            <FaStar />
            <span>New</span>
          </p>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-700">{formatDate(appartment.timestamp)}</p>
          <b className="flex justify-start items-center space-x-1 font-semibold">
            <FaEthereum />
            <span>{appartment.price} Night</span>
          </b>
        </div>
      </div>
    </div>
  );
};

export default Card;
