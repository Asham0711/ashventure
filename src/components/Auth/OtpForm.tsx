'use client'
import { useToast } from '@/hooks/use-toast';
import { verifySchema } from '@/schema/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const OtpForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    })

    const handleResendOtp = async () => {
        try {
            const email = localStorage.getItem('email');
            const response = await axios.post('/api/auth/send-otp', JSON.stringify({ email: email }));
            if (!response.data.success) {
                toast({
                    title: 'Error',
                    description: response.data.message || 'Failed to send OTP',
                    variant: 'destructive',
                });
                return;
            }

            toast({
                title: 'Success',
                description: response.data.message || 'OTP sent successfully',
                variant: 'default',
            });
        } catch (error) {
            console.log("Error while sending OTP -->", error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            });
        }
    }

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true);
        try {
            const firstName =  localStorage.getItem('firstName')
            const email = localStorage.getItem('email')
            const lastName = localStorage.getItem('lastName')
            const password = localStorage.getItem('password')
            const confirmPassword = localStorage.getItem('confirmPassword')
            const response = await axios.post('/api/auth/sign-up', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                otp: data.otp
            })
            if (!response.data.success) {
                toast({
                    title: 'Error',
                    description: response.data.message || 'Failed to sign up',
                    variant: 'destructive',
                });
                return;
            }

            toast({
                title: 'Success',
                description: response.data.message || 'User created successfully',
                variant: 'default',
            });

            localStorage.removeItem('firstName')
            localStorage.removeItem('email')
            localStorage.removeItem('lastName')
            localStorage.removeItem('password')
            localStorage.removeItem('confirmPassword')

            router.push('/sign-in');
        } catch (error) {
            console.log("Error while sending OTP -->", error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-transparent backdrop-blur-sm border-white/20 border p-6 rounded-3xl shadow-lg shadow-black/50 lg:w-[30%] md:w-[50%] w-[95%]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center flex-col items-center gap-4">
                    <FormField
                        name="otp"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='md:text-lg'>Verification Code</FormLabel>
                                <InputOTP
                                    maxLength={6}
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                >
                                    <InputOTPGroup className="md:w-96 w-80">
                                        <InputOTPSlot index={0} className='w-1/6'/>
                                        <InputOTPSlot index={1} className='w-1/6'/>
                                        <InputOTPSlot index={2} className='w-1/6'/>
                                        <InputOTPSlot index={3} className='w-1/6'/>
                                        <InputOTPSlot index={4} className='w-1/6'/>
                                        <InputOTPSlot index={5} className='w-1/6'/>
                                    </InputOTPGroup>
                                </InputOTP>
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
                            'Verify'
                        )}
                    </Button>
                </form>
            </Form>
            <div className="flex justify-end">
                <button 
                    className="text-primary-brand hover:text-primary-brand-hover cursor-pointer"
                    onClick={handleResendOtp}
                >
                    Resend OTP
                </button>
            </div>
            <div className="text-center mt-4">
                <p>
                    Go back to {' '} 
                    <Link href={'/sign-up'} className="text-primary-brand hover:text-primary-brand-hover">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default OtpForm