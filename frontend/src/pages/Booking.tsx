import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const search = useSearchContext();
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();

  const numberOfNights = Math.ceil(
    (search.checkOut.getTime() - search.checkIn.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent"],
    queryFn: () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    enabled: !!hotelId &&  numberOfNights > 0,
  });

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  const { data: curUser } = useQuery({
    queryKey: ["fetchCurUser"],
    queryFn: apiClient.fetchCurUser,
  });

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      {hotel && (
        <BookingDetailSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
        />
      )}
      {curUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm curUser={curUser} paymentIntent={paymentIntentData}/>
        </Elements>
      )}
    </div>
  );
};

export default Booking;
