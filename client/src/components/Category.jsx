import React from "react";
import { TbBeach } from 'react-icons/tb'
import { GiCampingTent, GiIsland } from 'react-icons/gi'
import { BsSnow2 } from 'react-icons/bs'
import { RiHotelLine } from 'react-icons/ri'

const Category = () => {
  return (
    <div
      className="flex justify-center space-x-5 sm:space-x-14  px-4 py-2 border-gray-100
      text-primary-500"
    >
      <p
        className="flex flex-col items-center hover:text-white border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2"
      >
        <TbBeach className="text-4xl" />
        Beach
      </p>
      <p
        className="flex flex-col items-center hover:text-white border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2"
      >
        <GiIsland className="text-4xl" />
        Island
      </p>
      <p
        className="flex flex-col items-center hover:text-white border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2"
      >
        <BsSnow2 className="text-4xl" />
        Arctic
      </p>
      <p
        className="flex flex-col items-center hover:text-white border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2"
      >
        <GiCampingTent className="text-4xl" />
        Camping
      </p>
      <p
        className="flex flex-col items-center hover:text-white border-b-2
       border-transparent hover:border-black hover:cursor-pointer pb-2"
      >
        <RiHotelLine className="text-4xl" />
        Hotel
      </p>
    </div>
  );
};

export default Category;
