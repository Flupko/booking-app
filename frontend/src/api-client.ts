import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error("Error during sign out");
  }

  return body;
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/myhotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return data;
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/myhotels`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return data;
};
