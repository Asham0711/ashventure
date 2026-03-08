type CreateTripPromptInput = {
  destination: string;
  lat: number;
  lng: number;
  days: number;
  people: number;
  budget: "low" | "medium" | "high";
  tripType: "family" | "friends" | "couple" | "honeymoon";
  month: string;
};

export function createTripPrompt(data: CreateTripPromptInput) {
  return `
You are a professional travel planner.

Create a COMPLETE travel itinerary in STRICT JSON format.
Return ONLY valid JSON. No markdown, no explanations.

Trip Details:
- Destination: ${data.destination}
- Month: ${data.month}
- Days: ${data.days}
- People: ${data.people}
- Budget: ${data.budget}
- Trip Type: ${data.tripType}

Format:
{
  "overview": {
    "destination": "${data.destination}",
    "bestTimeToVisit": "",
    "weatherSummary": "",
    "budgetLevel": "${data.budget}",
    "tripType": "${data.tripType}"
  },
  "days": [
    {
      "day": 1,
      "title": "Day 1 Overview",
      "activities": [
        {
          "time": "morning",
          "title": "Visit Famous Place",
          "description": "Brief description",
          "location": {
            "name": "Qutub Minar",
            "lat": 28.5245,
            "lng": 77.1855,
            "placeType": "historical monument"
          }
        }
      ]
    }
  ],
  "mapSummary": {
    "center": {
      "lat": ${data.lat},
      "lng": ${data.lng}
    },
    "markers": [
      {
        "name": "Qutub Minar",
        "lat": 28.5245,
        "lng": 77.1855,
        "day": 1,
      }
    ]
  }
}

Rules:
- Locations must be famous tourist places
- imageQuery must be suitable for image search
- Keep lat/lng approximately accurate
- Budget influences activities & hotels
- Romantic for couples, relaxed for family, adventurous for friends
- ONLY return JSON
`;
}
