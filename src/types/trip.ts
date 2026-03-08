import { Activity } from "./activity";

export interface DayItinerary {
  id: string;
  day: number;
  title: string;
  activities: Activity[];
}

export interface TripOverview {
  destination: string;
  bestTimeToVisit: string;
  weatherSummary: string;
  budgetLevel: "low" | "medium" | "high";
  tripType: "family" | "friends" | "couple" | "honeymoon";
}

export interface MapSummary {
  center: {
    lat: number;
    lng: number;
  };
  markers: {
    name: string;
    lat: number;
    lng: number;
    day: number;
  }[];
}

export interface TripItinerary {
  overview: TripOverview;
  days: DayItinerary[];
  mapSummary: MapSummary;
}

export interface Trip {
  _id: string;
  userId: string;
  destination: string;
  lat: number;
  lng: number;
  budget: "low" | "medium" | "high";
  people: number;
  days: number;
  tripType: "family" | "friends" | "couple" | "honeymoon";
  month: string;
  itinerary: TripItinerary;
  createdAt: string;
  updatedAt: string;
}