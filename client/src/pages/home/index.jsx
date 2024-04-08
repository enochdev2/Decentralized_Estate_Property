import { useEffect, useState } from 'react';
import { Collection } from '../../components';
import Category from '../../components/Category';
import { getApartments } from '../../../services/blockchain';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../components/Hero';
import { toast } from 'react-toastify';

export default function Home() {
  const { apartments } = useSelector((states) => states.globalStates);
  useEffect(() => {
    async function fetch() {
      await getApartments();
    }
    fetch();
    toast(
      'The smart contract is on the Sepolia testnet. Connect your wallet and use the Sepolia network!'
    );
  }, [getApartments]);

  return (
    <main className="main-container ">
      <section className="container">
        <Hero />
      </section>
      <section>
        <div className="min-h-screen space-y-1 mt-2" id="appartment">
          <Category />
          <Collection appartments={apartments} />
        </div>
      </section>
    </main>
  );
}
