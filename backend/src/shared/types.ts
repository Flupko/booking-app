import mongoose from "mongoose";

export type HotelType = {
  _id: string;
  userId: mongoose.Schema.Types.ObjectId | string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export type HotelSearchResponse = {
  data: any;
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
