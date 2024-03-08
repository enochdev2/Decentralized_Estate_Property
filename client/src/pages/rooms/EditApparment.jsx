import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAddressfun,
  getApartment,
  getApartments,
  updateApartment,
} from "../../../services/blockchain";
import { truncate } from "../../../utils/helper";

export default function Edit() {
  const params = useParams();
  useEffect(() => {
    async function fetch() {
      await getApartment(params.roomid);
       
    }
    fetch();
  }, [params]);
  const { apartment } = useSelector((states) => states.globalStates);

  const [name, setName] = useState(apartment.name);
  const [description, setDescription] = useState(apartment.description);
  const [location, setLocation] = useState(apartment.location);
  const [rooms, setRooms] = useState(apartment.rooms);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(apartment.price);
  const [links, setLinks] = useState(apartment.images);
  const [address, setaddress] = useState('');


   useEffect(() => {
     async function fetch() {
       const addres = await getAddressfun();
       setaddress(addres);
     }
     fetch();
   }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("reaach");
    // if (
    //   !name ||
    //   !location ||
    //   !description ||
    //   !rooms ||
    //   links.length != 5 ||
    //   !price
    // )
    //   return;


    const param = {
      ...apartment,
      name,
      description,
      location,
      rooms,
      images: links.slice(0, 5).join(","),
      price,
    };

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await updateApartment(param)
          .then(async () => {
            navigate.push("/room/" + apartment.id);
            resolve();
          })
          .catch(() => reject());
      }),
      {
        pending: "Approve transaction...",
        success: "Apartment updated successfully 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  const addImage = (e) => {
    e.preventDefault();
    if (links.length != 5) {
      setLinks((prevState) => [...prevState, images]);
    }
    setImages("");
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    const filteredArray = links.filter((item, i) => i !== index);
    // links.splice(index, 1);
    setLinks(() => filteredArray);
  };

  return (
    <div className="h-screen mt-12 w-full flex justify-center mb-12 mx-auto border-red-700">
      <div className="w-full md:w-full   md:px-16  ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-auto max-w-4xl  lg:px-20 px-4 md:py-8 py-4 rounded-lg"
        >
          <div className="flex justify-center items-center">
            <p className="font-semibold text-primary-500">Edit Room</p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="name"
              placeholder="Room Name "
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (ETH)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 p-2 rounded-xl mt-5">
            <input
              className="block flex-1 text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="url"
              name="images"
              placeholder="Images"
              onChange={(e) => setImages(e.target.value)}
              value={images}
            />

            {links?.length != 5 && (
              <button
                onClick={(e) => addImage(e)}
                type="button"
                className="p-2 bg-[#ff385c] text-white rounded-full text-sm"
              >
                Add image link
              </button>
            )}
          </div>

          <div
            className="flex flex-row justify-start items-center
          rounded-xl mt-5 space-x-1 flex-wrap"
          >
            {links &&
              links?.map((link, i) => (
                <div
                  key={i}
                  className="p-2 rounded-full text-gray-500 bg-gray-200 font-semibold
                flex items-center w-max cursor-pointer active:bg-gray-300
                transition duration-300 ease space-x-2 text-xs"
                >
                  <span>{truncate(link, 4, 4, 11)}</span>
                  <button
                    onClick={(e) => removeImage(e, i)}
                    type="button"
                    className="bg-transparent hover focus:outline-none"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="location"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            />
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="rooms"
              placeholder="Number of room"
              onChange={(e) => setRooms(e.target.value)}
              value={rooms}
              required
            />
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 p-2 rounded-xl mt-5"
          >
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Room Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={` comment-form_btn text-body-bold flex flex-row justify-center items-center
            w-full text-white bg-[#ff385c]
            py-2 px-5 rounded-full drop-shadow-xl hover:bg-white
            border-transparent border
            hover:hover:text-[#ff385c] cursor-pointer
             mt-5 transition-all duration-500 ease-in-out
            ${!address ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!address}
          >
            Update Apartment
          </button>
        </form>
      </div>
    </div>
  );
}
