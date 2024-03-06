import { useEffect, useState } from "react";
import { Collection } from "../../components";
import Category from "../../components/Category";
import { getApartments } from "../../../services/blockchain";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { apartments } = useSelector((states) => states.globalStates);

  useEffect(() => {
    async function fetch() {
      await getApartments();
    }
    fetch();
  }, [getApartments]);

  return (
    <div className="min-h-screen space-y-1 mt-24">
      <Category />
      <Collection appartments={apartments} />
    </div>
  );
}
