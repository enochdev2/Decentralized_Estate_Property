import { useEffect, useState } from 'react';
import { Collection } from '../../components';
import Category from '../../components/Category';
import { getApartments } from '../../../services/blockchain';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../components/Hero';

export default function Home() {
  const { apartments } = useSelector((states) => states.globalStates);
  useEffect(() => {
    async function fetch() {
      await getApartments();
    }
    fetch();
  }, [getApartments]);

  return (
    <main className="main-container">
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
