export type ActivityTime = "morning" | "afternoon" | "evening";

export interface ActivityLocation {
  name: string;
  lat: number;
  lng: number;
  placeType: string;
  imageQuery: string;
}

export interface Activity {
  id: string;
  time: ActivityTime;
  title: string;
  description: string;
  location: ActivityLocation;
}