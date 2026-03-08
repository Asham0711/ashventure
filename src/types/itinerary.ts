export type Activity = {
  id: string;
  time: "morning" | "afternoon" | "evening" | "night";
  title: string;
  description: string;
  location: {
    name: string;
    lat: number;
    lng: number;
    placeType: string;
    imageQuery: string;
  };
};

export type Day = {
  id: string;
  day: number;
  title: string;
  activities: Activity[];
};
