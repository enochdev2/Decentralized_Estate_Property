import { ethers } from "ethers";
import { store } from "../store";
import { globalActions } from "../store/globalSlices";
import { abi, address } from "../utils/constants";

const toWei = (num) => ethers.utils.parseUnits(num.toString(), 18);
const fromWei = (num) => ethers.utils.formatUnits(num, 18);

let ethereum = window.ethereum;
let tx;

if (typeof window !== "undefined") ethereum = window.ethereum;
const {
  setBookings,
  setAddress,
  setApartments,
  setApartment,
  setTimestamps,
  setReviews,
} = globalActions;

export const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask.");

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
    // window.location.reload();
  } catch (error) {
    console.log(error);
    throw new Error("No ethereum object");
  }
};

export const getAddressfun = async () => {
  const accounts = await ethereum?.request?.({ method: "eth_accounts" });
  return accounts[0];
};

const getEthereumContracts = async () => {
  const accounts = await ethereum?.request?.({ method: "eth_accounts" });
  store.dispatch(setAddress(accounts[0]));

  //   try {
  //     if (!ethereum) return alert("Please install MetaMask.");
  if (accounts?.length > 0) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contracts = new ethers.Contract(address, abi, signer);
    return contracts;
  } else {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${import.meta.env.VITE_PUBLIC_RPC_URL}`
    );
    console.log("🚀 ~ getEthereumContracts ~  provider:", provider);
    const signer = provider.signer();
    const contracts = new ethers.Contract(address, abi, signer);

    return contracts;
  }
};

// const checkIfWalletIsConnect = async () => {
//   try {
//     if (!ethereum) return alert("Please install MetaMask.");

//     const accounts = await ethereum.request({ method: "eth_accounts" });

//     if (accounts.length) {
//       setCurrentAccount(accounts[0]);

//       // getAllTransaction();
//     } else {
//       console.log("No accounts found");
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   window.ethereum.on(
//     "accountsChanged",
//     async function (currentAccount: string) {
//       setCurrentAccount(currentAccount[0]);
//       await checkIfWalletIsConnect();
//     }
//   );
// };

const createApartment = async (apartment) => {
  if (!ethereum) {
    reportError("Please install a browser provider");
    return Promise.reject(new Error("Browser provider not installed"));
  }

  try {
    const contract = await getEthereumContracts();
    tx = await contract.createAppartment(
      apartment.name,
      apartment.description,
      apartment.location,
      apartment.images,
      apartment.rooms,
      toWei(apartment.price)
    );
    await tx.wait();
    console.log("🚀 ~ createApartment ~ tx:", tx);

    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const updateApartment = async (apartment) => {
  if (!ethereum) {
    reportError("Please install a browser provider");
    return Promise.reject(new Error("Browser provider not installed"));
  }

  try {
    const contract = await getEthereumContracts();
    tx = await contract.updateAppartment(
      apartment.id,
      apartment.name,
      apartment.description,
      apartment.location,
      apartment.images,
      apartment.rooms,
      toWei(apartment.price)
    );
    await tx.wait();

    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const deleteApartment = async (aid) => {
  if (!ethereum) {
    reportError("Please install a browser provider");
    return Promise.reject(new Error("Browser provider not installed"));
  }

  try {
    const contract = await getEthereumContracts();
    tx = await contract.deleteAppartment(aid);
    await tx.wait();

    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const getApartments = async () => {
  if (!ethereum)
    return alert("Please install MetaMask or connect your wallet address.");

  const provider = ethereum
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(
        `https://sepolia.infura.io/v3/${import.meta.env.VITE_PUBLIC_RPC_URL}`
      );
  const contract = new ethers.Contract(address, abi, provider);
  const apartments = await contract.getApartments();
  const app = structureAppartments(apartments);
  store.dispatch(setApartments(app));
  return app;
};

const getApartment = async (id) => {
  const provider = ethereum
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(
        `https://sepolia.infura.io/v3/${import.meta.env.VITE_PUBLIC_RPC_URL}`
      );
  const contract = new ethers.Contract(address, abi, provider);
  const apartment = await contract.getApartment(id);
  const app = structureAppartments([apartment])[0];
  store.dispatch(setApartment(app));
  return app;
};

const getBookings = async (id) => {
  const contract = await getEthereumContracts();
  const bookings = await contract.getBookings(id);
  const app = structuredBookings(bookings);
  store.dispatch(setBookings(app));
  return app;
};

const getQualifiedReviewers = async (id) => {
  const contract = await getEthereumContracts();
  const bookings = await contract.getQualifiedReviewers(id);
  return bookings;
};

const getReviews = async (id) => {
  const contract = await getEthereumContracts();
  const reviewers = await contract.getReviews(id);
  const app = structuredReviews(reviewers);
  store.dispatch(setReviews(app));
  return app;
};

const getBookedDates = async (id) => {
  const contract = await getEthereumContracts();
  const bookings = await contract.getUnavailableDates(id);
  const timestamps = bookings.map((timestamp) => Number(timestamp));
  return timestamps;
};

const getSecurityFee = async () => {
  const contract = await getEthereumContracts();
  const fee = await contract.securityFee();
  return Number(fee);
};

// For Testing
// const securityFee = 2;
// const dates1 = [1700140191726, 1700226628922];
// let price = 0.2;
// const amounts =
//   price * dates1.length + (price * dates1.length * securityFee) / 100;

const bookApartment = async ({ aid, timestamps, amount }) => {
  console.log("🚀 ~ bookApartment ~  amount:", amount);
  if (!ethereum) {
    reportError("Please install a browser provider");
    return Promise.reject(new Error("Browser provider not installed"));
  }
  console.log("reach");
  try {
    const gasLimit = 900000;
    const gasPriceWei = ethers.utils.parseUnits("50000000000", "wei"); // Gas price in wei (50 Gwei)
    const contract = await getEthereumContracts();
    tx = await contract.bookApartment(
      aid,
      // dates1,
      timestamps,
      {
        value: toWei(amount),
        gasLimit: gasLimit,
        gasPrice: gasPriceWei,
      }
    );

    await tx.wait();
    const bookedDates = await getBookedDates(aid);
    console.log("🚀 ~ bookApartment ~  tx:", tx);

    store.dispatch(setTimestamps(bookedDates));
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const checkInApartment = async (aid, timestamps) => {
  if (!ethereum) {
    reportError("Please install a browser provider");
    return Promise.reject(new Error("Browser provider not installed"));
  }

  try {
    const contract = await getEthereumContracts();
    tx = await contract.checkInApartment(aid, timestamps);

    await tx.wait();
    const bookings = await getBookings(aid);

    store.dispatch(setBookings(bookings));
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const refundBooking = async (aid, bookingId) => {
  if (!ethereum) {
    reportError("Please install a browser provider");
    return Promise.reject(new Error("Browser provider not installed"));
  }

  try {
    const contract = await getEthereumContracts();
    tx = await contract.refundBooking(aid, bookingId);

    await tx.wait();
    const bookings = await getBookings(aid);

    store.dispatch(setBookings(bookings));
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const addReview = async (aid, comment) => {
  if (!ethereum) {
    reportError("Please install a browser provider");
    return Promise.reject(new Error("Browser provider not installed"));
  }

  try {
    const contract = await getEthereumContracts();
    console.log("🚀 ~ addReview ~ contract :", contract);
    tx = await contract.addReview(aid, comment);

    await tx.wait();
    const reviews = await getReviews(aid);

    store.dispatch(setReviews(reviews));
    return Promise.resolve(tx);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const structureAppartments = (appartments) =>
  appartments.map((appartment) => ({
    id: Number(appartment.id),
    name: appartment.name,
    owner: appartment.owner,
    description: appartment.description,
    location: appartment.location,
    price: fromWei(appartment.price),
    deleted: appartment.deleted,
    images: appartment.images.split(","),
    rooms: Number(appartment.rooms),
    timestamp: Number(appartment.timestamp),
    booked: appartment.booked,
  }));

const structuredBookings = (bookings) =>
  bookings.map((booking) => ({
    id: Number(booking.id),
    aid: Number(booking.aid),
    tenant: booking.tenant,
    date: Number(booking.date),
    price: fromWei(booking.price),
    checked: booking.checked,
    cancelled: booking.cancelled,
  }));

const structuredReviews = (reviews) =>
  reviews.map((review) => ({
    id: Number(review.id),
    aid: Number(review.aid),
    text: review.reviewText,
    owner: review.owner,
    timestamp: Number(review.timestamp),
  }));

export {
  getApartments,
  getApartment,
  getBookings,
  getBookedDates,
  createApartment,
  updateApartment,
  deleteApartment,
  bookApartment,
  checkInApartment,
  refundBooking,
  addReview,
  getReviews,
  getQualifiedReviewers,
  getSecurityFee,
};
