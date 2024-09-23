import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: "Hotel saved", type: "SUCCESS" });
      navigate("/my-hotels");
    },
    onError: () => {
      showToast({ message: "Error saving hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      hotel={undefined}
      onSave={handleSave}
      isLoading={isPending}
    />
  );
};

export default AddHotel;
