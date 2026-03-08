/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from "@/schema/contactPageSchema";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportTicket = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast()
    const form = useForm({
    resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });
    const onSubmit = async (data: any) => {
        try {
            setIsSubmitting(true);

            const payload = {
                ...data,
                access_key: "70fafe61-ee0f-4433-a16c-1243e80862f6",
            };

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Your ticket is raised successfully',
                });

                form.reset();
            }

        } catch (error) {
            console.error('Error during submit: ', error);
            toast({
                title: 'Error',
                description: 'There is an error while raising issue',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="flex justify-center items-center">
            <div className="border border-white/20 bg-transparent backdrop-blur-sm shadow-lg shadow-black/50 md:w-full w-11/12 mx-auto px-4 py-6 space-y-8 rounded-3xl">
                <h1 className='text-2xl text-center mb-0'>Write your Query here</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="name"
                            control = {form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='md:text-lg'>Name</FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="Enter your name"
                                        className='bg-black/20 border border-white/50'
                                    />
                                    <FormMessage className="text-red-500 text-sm font-bold"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='md:text-lg'>Email</FormLabel>
                                    <Input 
                                        {...field} name="email" 
                                        placeholder="Enter your email" 
                                        className='bg-black/20 border border-white/50'
                                    />
                                    <FormMessage className="text-red-500 text-sm font-bold"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="phone"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='md:text-lg'>Phone Number</FormLabel>
                                    <Input 
                                        {...field} 
                                        name="phone" 
                                        placeholder="Enter your phone number" 
                                        className='bg-black/20 border border-white/50'
                                    />
                                    <FormMessage className="text-red-500 text-sm font-bold"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="message"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='md:text-lg'>Message</FormLabel>
                                    <Textarea 
                                        {...field} 
                                        placeholder="Enter your message" 
                                        className='bg-black/20 border border-white/50'
                                    />
                                    <FormMessage className="text-red-500 text-sm font-bold"/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className='w-full rounded-lg text-lg cursor-pointer' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SupportTicket