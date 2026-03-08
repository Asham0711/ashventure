import * as z from 'zod';

export const createTripSchema = z.object({
  destination: z.string().min(2, 'Destination is required'),
  lat: z.number(),
  lng: z.number(),

  budget: z.enum(['Low', 'Medium', 'High']),

  people: z.number().min(1, 'Minimum 1 person'),
  days: z.number().min(1, 'Minimum 1 day'),

  tripType: z.enum([
    'Family',
    'Friends',
    'Couple',
    'Honeymoon',
  ]),

  month: z.string().min(1, 'Select travel month'),
});
