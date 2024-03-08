import React from 'react'
import { FaAirbnb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ButtonGroup from './ButtonGroup';
import  ConnectBtn  from './ConnectBtn';

const Navbar = () => {
  return (
    <header className=" topbar shadow-xl shadow-gray-800 py-4">
      <Link to={"/"}>
        <p className=" text-primary-500  flex items-center text-heading3-bold">
          <FaAirbnb className=" font-semibold w-8" />
          Dapp-Estate
        </p>
      </Link>

      <ButtonGroup />
      <ConnectBtn />
    </header>
  );
};


export default Navbar
