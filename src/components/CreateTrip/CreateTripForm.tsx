/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as z from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createTripSchema } from '@/schema/createTripSchema';
import DestinationSearch from './DestinationSearch';
import HighlightText from '../common/HighlightText';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthDropdown } from './MonthDropdown';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

type CreateTripValues = z.infer<typeof createTripSchema>;

const CreateTripForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<CreateTripValues>({
        resolver: zodResolver(createTripSchema),
        defaultValues: {
        destination: '',
        lat: 0,
        lng: 0,
        budget: undefined,
        people: 1,
        days: 1,
        tripType: 'Family',
        month: '',
        },
    });

    const people = form.watch('people');

    useEffect(() => {
        if (
        people !== 2 &&
        ['couple', 'honeymoon'].includes(form.getValues('tripType'))
        ) {
        form.setValue('tripType', 'Family');
        }
    }, [people, form]);

    const onSubmit = async (data: CreateTripValues) => {
        try {
            setIsSubmitting(true);

            const response = await axios.post('/api/trips/create-trip', data);

            if (!response.data.success) {
                toast({
                    title: 'Error',
                    description: response.data.message || 'Failed to send email',
                    variant: 'destructive',
                });
                return;
            }

            toast({
                title: response.data.message,
                description: 'Your itinerary is ready!',
            });

            router.push(`/my-trips/${response.data.tripId}`);
        } catch (error: any) {
            toast({
            title: 'Something went wrong',
            description: error.message,
            variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };


  return (
    <div className="bg-transparent backdrop-blur-sm border border-white/20 px-4 py-6 rounded-3xl shadow-lg lg:w-[45%] w-[95%] mb-4 md:mb-0">
        <p className='text-center text-xl md:text-3xl mb-2'><HighlightText text='Tell us your travel preferences'/> 🏕️🌴</p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* DESTINATION */}
                <FormField
                    control={form.control}
                    name="destination"
                    render={() => (
                        <FormItem>
                            <FormLabel>Destination</FormLabel>
                            <DestinationSearch
                                onSelect={(data) => {
                                    form.setValue('destination', data.destination);
                                    form.setValue('lat', data.lat);
                                    form.setValue('lng', data.lng);
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* MONTH */}
                <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Travel Month</FormLabel>
                            <MonthDropdown
                                value={field.value}
                                onChange={field.onChange}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* BUDGET */}
                <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Budget</FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="bg-black/20">
                                    <SelectValue placeholder="Select your budget type" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                {/* PEOPLE & DAYS */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="people"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>People</FormLabel>
                        <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="bg-black/20 border border-white/20"
                        />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Days</FormLabel>
                        <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="bg-black/20 border border-white/20"
                        />
                        </FormItem>
                    )}
                    />
                </div>

                {/* TRIP TYPE */}
                <FormField
                    control={form.control}
                    name="tripType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Trip Type</FormLabel>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {['Family', 'Friends'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => field.onChange(type)}
                                    className={`px-4 py-1 rounded-full border text-sm capitalize transition cursor-pointer
                                    ${
                                        field.value === type
                                        ? 'bg-primary-brand text-black'
                                        : 'border-white/20 text-white/70 hover:bg-white/10'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                            {people === 2 &&
                                ['Couple', 'Honeymoon'].map(type => (
                                    <button
                                    key={type}
                                    type="button"
                                    onClick={() => field.onChange(type)}
                                    className={`px-4 py-1 rounded-full border text-sm capitalize transition cursor-pointer
                                        ${
                                        field.value === type
                                            ? 'bg-primary-brand text-black'
                                            : 'border-white/20 text-white/70 hover:bg-white/10'
                                        }`}
                                    >
                                    {type}
                                    </button>
                                ))
                            }
                        </div>
                    </FormItem>
                    )}
                />

                <Button type="submit" className="w-full text-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating your trip...
                        </>
                    ) : (
                        'Create Trip'
                    )}
                </Button>
            </form>
        </Form>
    </div>
  );
};

export default CreateTripForm;