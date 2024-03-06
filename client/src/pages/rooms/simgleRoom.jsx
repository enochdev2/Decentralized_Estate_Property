import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAddressfun,
  getApartment,
  getBookedDates,
  getQualifiedReviewers,
  getReviews,
  getSecurityFee,
} from "../../../services/blockchain";
import { globalActions } from "../../../store/globalSlices";
import {
  Actions,
  AddReview,
  Calendar,
  Description,
  ImageGrid,
  Review,
  Title,
} from "../../components";

export default function Room() {
  const params = useParams();
  const [address, setaddress] = useState("");
  const [getQualifiedReviewer, setGetQualifiedReviewer] = useState([]);

  const dispatch = useDispatch();

  const { setTimestamps, setReviewModal } = globalActions;
  const { apartment, bookings } = useSelector((states) => states.globalStates);
  const { timestamps, reviews } = useSelector((states) => states.globalStates);

  // console.log("🚀 ~ app ~ apartment:", apartment);
  // console.log("🚀 ~ reviews:", reviews);
  // console.log("🚀 ~ timestamps:", timestamps);
  useEffect(
    () => {
      async function fetch() {
        const addres = await getAddressfun();
        setaddress(addres);
        await getApartment(params.roomid);
        await getBookedDates(params.roomid);
        await getReviews(params.roomid);
        await getSecurityFee();
        const getQualifiedreviewer = await getQualifiedReviewers(params.roomid);
        setGetQualifiedReviewer(getQualifiedreviewer);
      }
      fetch();
      //     dispatch(setTimestamps(timestampsData));
    },
    [
      //     setTimestamps,
    ]
  );

  const handleReviewOpen = () => {
    dispatch(setReviewModal("scale-100"));
  };

  return (
    <>
      <div className="py-8 px-10 sm:px-20 md:px-32 space-y-8 text-white text-base-medium">
        <Title apartment={apartment} />

        <ImageGrid
          first={apartment?.images[0]}
          second={apartment?.images[1]}
          third={apartment?.images[2]}
          forth={apartment?.images[3]}
          fifth={apartment?.images[4]}
        />

        <Description apartment={apartment} />
        <Calendar apartment={apartment} timestamps={timestamps} />
        <Actions apartment={apartment} address={address} />

        <div className="flex flex-col justify-between flex-wrap space-y-2">
          <div className="flex justify-start items-center space-x-2">
            <h1 className="text-xl font-semibold">Reviews</h1>
            {getQualifiedReviewer?.map((qualifyReviewer, i) => {
              let item;
              return (item = qualifyReviewer.toLowerCase() ===
                address?.toLowerCase() && (
                <button
                  key={i}
                  className="cursor-pointer text-pink-500 hover:text-pink-700"
                  onClick={handleReviewOpen}
                >
                  Drop your review
                </button>
              ));
            })}
          </div>
          <div>
            {reviews.map((review, i) => (
              <Review key={i} review={review} />
            ))}
            {reviews.length < 1 && "No reviews yet!"}
          </div>
        </div>
      </div>
      <AddReview roomId={params.roomid} />
    </>
  );
}
